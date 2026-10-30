import { render, screen } from '@testing-library/react';

import PageBuilder, { PageBuilderProps } from './PageBuilder';
import { WrapError, WrapSuccess } from '~/types/types/result';

import { isProductionMode } from '~/lib/utils/isProductionMode';
import { redirectToDisablePreview } from '~/lib/utils/redirectToDisablePreview';
import { PAGES_DATA_ERROR_CODES } from '~/services/pages-data/pagesDataErrorCodes';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn().mockResolvedValue(() => undefined)
}));

jest.mock('../under-development/UnderDevelopment', () => ({
  __esModule: true,
  default: () => <div data-testid="under-development">Under Development</div>
}));

jest.mock('~/[lang]/[...unknown-route]/page-not-found/PageNotFound', () => ({
  PageNotFound: () => <div data-testid="not-found-page">Page Not Found</div>
}));

jest.mock('~/lib/utils/errorPageFactory', () => ({
  ErrorPageFactory: jest.fn(() => <div data-testid="error-page">Error: No page found</div>)
}));

jest.mock('~/lib/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('~/services/pages-data/resolvePageData', () => ({
  resolvePageData: jest.fn()
}));

jest.mock('~/shared/layouts/main-layout/MainLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="main-layout">{children}</div>
}));

jest.mock('~/lib/utils/redirectToDisablePreview', () => ({
  redirectToDisablePreview: jest.fn(() => {
    throw new Error('REDIRECT_TO_DISABLE_PREVIEW');
  })
}));

const defaultProps: PageBuilderProps<any> = {
  lang: 'en',
  slug: 'about-us',
  pathname: '/en/about-us',
  renderBlock: jest.fn(() => null)
};

const renderComponent = async (props: Partial<PageBuilderProps<any>> = {}) => {
  const mergedProps = {
    ...defaultProps,
    ...props
  };

  const ui = await PageBuilder(mergedProps);
  return render(ui);
};

describe('PageBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (isProductionMode as jest.Mock).mockReturnValue(false);
  });

  const { resolvePageData } = jest.requireMock('~/services/pages-data/resolvePageData');

  it('should render UnderDevelopment in production mode', async () => {
    (isProductionMode as jest.Mock).mockReturnValue(true);

    await renderComponent({ lang: 'en' });

    expect(screen.getByTestId('under-development')).toBeInTheDocument();
    expect(screen.queryByText(/Intro section/i)).not.toBeInTheDocument();
  });

  it('should render PageNotFound when UnwrapResult is null', async () => {
    resolvePageData.mockResolvedValueOnce(WrapSuccess(null));

    await renderComponent({ lang: 'en' });

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('should render layout when page exists and calls resolvePageData', async () => {
    const mockedBlocks = {
      IntroSection: { trustAndSecurity: {}, agreement: {} },
      DataWeCollect: { title: 'Data We Collect' }
    };
    const mockedPageData = {
      title: 'Privacy Policy',
      blocks: mockedBlocks,
      blocksOrder: ['IntroSection', 'DataWeCollect']
    };
    resolvePageData.mockResolvedValueOnce(WrapSuccess(mockedPageData));

    const lang = 'en';
    const slug = 'about-us';
    const renderBlock = jest.fn();

    await renderComponent({ lang, slug, renderBlock });
    expect(resolvePageData).toHaveBeenCalledWith(slug, lang, undefined);
    expect(renderBlock).toHaveBeenCalledWith({
      blockId: 'IntroSection',
      blocks: mockedBlocks,
      title: mockedPageData.title,
      uniqueRenderKey: 'IntroSection-0'
    });
    expect(renderBlock).toHaveBeenCalledTimes(2);
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
  });

  it('should return ErrorPage from factory when page is missing', async () => {
    resolvePageData.mockResolvedValueOnce(WrapError('No page found'));

    await renderComponent({ lang: 'uk' });

    expect(resolvePageData).toHaveBeenCalledWith('about-us', 'uk', undefined);

    expect(screen.getByText(/Error: No page found/i)).toBeInTheDocument();
  });

  it('should early return if slug is not valid', async () => {
    await renderComponent({ lang: 'uk', slug: 'non-existed-slug' });

    expect(resolvePageData).not.toHaveBeenCalled();
    expect(screen.queryByTestId('main-layout')).not.toBeInTheDocument();
  });

  it('should redirect to disable preview when draft is not found', async () => {
    const searchParams = { draftId: 'invalid-draft-id', category: 'events' };
    resolvePageData.mockResolvedValueOnce(
      WrapError('No page found with slug: about-us', PAGES_DATA_ERROR_CODES.DRAFT_NOT_FOUND)
    );

    await expect(
      renderComponent({ lang: 'uk', pathname: '/uk/about-us', searchParams: Promise.resolve(searchParams) })
    ).rejects.toThrow('REDIRECT_TO_DISABLE_PREVIEW');
    expect(resolvePageData).toHaveBeenCalledWith('about-us', 'uk', 'invalid-draft-id');
    expect(redirectToDisablePreview).toHaveBeenCalledWith('/uk/about-us', searchParams);
    expect(screen.queryByTestId('error-page')).not.toBeInTheDocument();
  });
});

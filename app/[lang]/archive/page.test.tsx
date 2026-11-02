import { render, screen } from '@testing-library/react';
import { setRequestLocale } from 'next-intl/server';

import Archive, { generateMetadata } from './page';
import { isError, isErrorCode, UnwrapResult } from '~/types/types/result';

import { getDraftId } from '~/lib/utils/getDraftId';
import { getPageMetadata } from '~/lib/utils/getPageMetadata';
import { redirectToDisablePreview } from '~/lib/utils/redirectToDisablePreview';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import { ROUTES } from '~/shared/components/constants/routes';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

jest.mock('~/lib/utils/errorPageFactory', () => ({
  ErrorPageFactory: jest.fn(() => <div>Error page</div>)
}));

jest.mock('~/lib/utils/getDraftId', () => ({
  getDraftId: jest.fn()
}));

jest.mock('~/lib/utils/getPageMetadata', () => ({
  getPageMetadata: jest.fn()
}));

jest.mock('~/lib/utils/redirectToDisablePreview', () => ({
  redirectToDisablePreview: jest.fn(() => {
    throw new Error('REDIRECT_TO_DISABLE_PREVIEW');
  })
}));

jest.mock('~/services/pages-data/resolvePageData', () => ({
  resolvePageData: jest.fn()
}));

jest.mock('~/types/types/result', () => ({
  isError: jest.fn(),
  isErrorCode: jest.fn(),
  UnwrapResult: jest.fn()
}));

jest.mock('../[...unknown-route]/page-not-found/PageNotFound', () => ({
  PageNotFound: () => <div>Page not found</div>
}));

jest.mock('./ArchivePage/ArchivePage', () => ({
  __esModule: true,
  default: ({ description }: { description: string | null }) => <div>{description}</div>
}));

describe('Archive page', () => {
  const mockParams = { lang: 'uk' as const };
  const mockPromiseParams = Promise.resolve(mockParams);

  const mockPage = {
    blocks: {
      PageCaption: {
        description: 'Archive description'
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (getDraftId as jest.Mock).mockReturnValue(undefined);
    (resolvePageData as jest.Mock).mockResolvedValue({});
    jest.mocked(isError).mockReturnValue(false);
    jest.mocked(isErrorCode).mockReturnValue(false);
    (UnwrapResult as jest.Mock).mockReturnValue(mockPage);

    (getPageMetadata as jest.Mock).mockResolvedValue({
      title: 'Archive title',
      description: 'Archive meta description'
    });
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({ params: mockPromiseParams, searchParams: Promise.resolve({}) });

    expect(getPageMetadata).toHaveBeenCalledWith(
      mockPromiseParams,
      expect.objectContaining({
        pageTranslationKey: 'meta.pages.archive',
        pageRoute: ROUTES.ARCHIVE,
        fetchPageMetaData: expect.any(Function)
      })
    );
    expect(metadata).toEqual({
      title: 'Archive title',
      description: 'Archive meta description'
    });
  });

  it('should pass the draft ID to resolvePageData when generating metadat', async () => {
    const draftId = 'draft-123';
    const searchParams = { draftId };

    (getDraftId as jest.Mock).mockReturnValue(draftId);
    (getPageMetadata as jest.Mock).mockImplementation(
      async (_params: unknown, options: { fetchPageMetaData: () => Promise<unknown> }) => {
        await options.fetchPageMetaData();
        return {};
      }
    );

    await generateMetadata({ params: mockPromiseParams, searchParams: Promise.resolve(searchParams) });

    expect(getDraftId).toHaveBeenCalledWith(searchParams);
    expect(resolvePageData).toHaveBeenCalledWith('archive', 'uk', draftId);
  });

  it('should set request locale and render archive content', async () => {
    const ArchiveComponent = await Archive({ params: mockPromiseParams, searchParams: Promise.resolve({}) });
    render(ArchiveComponent);

    expect(setRequestLocale).toHaveBeenCalledWith('uk');
    expect(resolvePageData).toHaveBeenCalledWith('archive', 'uk', undefined);
    expect(screen.getByText('Archive description')).toBeInTheDocument();
  });

  it('should render error page when page data fetching fails', async () => {
    jest.mocked(isError).mockReturnValue(true);
    const ArchiveComponent = await Archive({ params: mockPromiseParams, searchParams: Promise.resolve({}) });
    render(ArchiveComponent);

    expect(screen.getByText('Error page')).toBeInTheDocument();
  });

  it('should render PageNotFound when archive page does not exist', async () => {
    (UnwrapResult as jest.Mock).mockReturnValue(null);
    const ArchiveComponent = await Archive({ params: mockPromiseParams, searchParams: Promise.resolve({}) });
    render(ArchiveComponent);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('should pass the draft ID to resolvePageData when fetching page content', async () => {
    const draftId = 'draft-123';
    const searchParams = { draftId };
    (getDraftId as jest.Mock).mockReturnValue(draftId);

    const ArchiveComponent = await Archive({ params: mockPromiseParams, searchParams: Promise.resolve(searchParams) });
    render(ArchiveComponent);

    expect(getDraftId).toHaveBeenCalledWith(searchParams);
    expect(resolvePageData).toHaveBeenCalledWith('archive', 'uk', draftId);
  });

  it('should redirect when draft is not found', async () => {
    const searchParams = { draftId: 'draft-123' };
    jest.mocked(isErrorCode).mockReturnValue(true);

    await expect(
      Archive({
        params: mockPromiseParams,
        searchParams: Promise.resolve(searchParams)
      })
    ).rejects.toThrow('REDIRECT_TO_DISABLE_PREVIEW');
    expect(redirectToDisablePreview).toHaveBeenCalledWith(`/${mockParams.lang}/${ROUTES.ARCHIVE}`, searchParams);
  });
});

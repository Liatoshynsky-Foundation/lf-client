import { render, screen } from '@testing-library/react';

import Biography, { generateMetadata } from './page';
import { WrapError, WrapSuccess } from '~/types/types/result';
import * as envUtils from '~/utils/isProductionMode';

jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('~/services/pages-data/resolvePageData');

jest.mock('~/lib/utils/errorPageFactory', () => ({
  ErrorPageFactory: jest.fn((err) => <div data-testid="error-page">Error: {err}</div>)
}));

jest.mock('../[...unknown-route]/page-not-found/pageNotFound', () => ({
  PageNotFound: () => <div data-testid="not-found-page">Page not found</div>
}));

jest.mock('~/shared/components/blocks/HeroSection/HeroSection', () => ({
  HeroSection: () => <div>Hero section</div>
}));

jest.mock('./BiographyContent/BiographyContent', () => ({
  BiographyContent: () => <div>Biography content</div>
}));

jest.mock('~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice', () => ({
  __esModule: true,
  default: () => <div>Liatoshynsky office</div>
}));

jest.mock('~/components/under-development/UnderDevelopment', () => ({
  __esModule: true,
  default: () => <div data-testid="under-dev">Under Development</div>
}));

jest.mock('~/layouts/main-layout/MainLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('Biography page', () => {
  const { setRequestLocale, getTranslations } = jest.requireMock('next-intl/server') as {
    setRequestLocale: jest.Mock;
    getTranslations: jest.Mock;
  };
  const { resolvePageData } = jest.requireMock('~/services/pages-data/resolvePageData') as {
    resolvePageData: jest.Mock;
  };

  const mockParams = Promise.resolve({ lang: 'en' as const });

  beforeEach(() => {
    jest.clearAllMocks();
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(false);
    getTranslations.mockResolvedValue((key: string) => key);
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({ params: mockParams });
    expect(metadata).toBeDefined();
    expect(setRequestLocale).toHaveBeenCalledWith('en');
  });

  it('should render UnderDevelopment in production mode', async () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(true);
    const ui = await Biography({ params: mockParams });
    render(ui);

    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
  });

  it('should render biography blocks when page exists', async () => {
    resolvePageData.mockResolvedValueOnce(
      WrapSuccess({
        blocks: {
          heroSection: {},
          biographyContent: [{ yearTitle: '1910' }],
          LiatoshynskyOffice: {}
        }
      })
    );

    const ui = await Biography({ params: mockParams });
    render(ui);

    expect(screen.getByText(/Hero section/i)).toBeInTheDocument();
    expect(screen.getByText(/Biography content/i)).toBeInTheDocument();
    expect(screen.getByText(/Liatoshynsky office/i)).toBeInTheDocument();
  });

  it('should return PageNotFound when page is null', async () => {
    resolvePageData.mockResolvedValueOnce(WrapSuccess(null));
    const ui = await Biography({ params: mockParams });
    render(ui);
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('should return ErrorPage when result is error', async () => {
    resolvePageData.mockResolvedValueOnce(WrapError('Database error'));
    const ui = await Biography({ params: mockParams });
    render(ui);
    expect(screen.getByTestId('error-page')).toHaveTextContent('Database error');
  });
});

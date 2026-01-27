import { render, screen } from '@testing-library/react';

import Biography from './page';
import { WrapError, WrapSuccess } from '~/types/types/result';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: jest.fn()
}));

jest.mock('~/services/pages-data/resolvePageData', () => ({
  resolvePageData: jest.fn()
}));

jest.mock('~/lib/utils/errorPageFactory', () => ({
  ErrorPageFactory: (msg: string) => <div>Error: {msg}</div>
}));

jest.mock('../[...unknown-route]/page-not-found/PageNotFound', () => ({
  __esModule: true,
  PageNotFound: () => <div>Page not found</div>
}));

jest.mock('~/shared/components/blocks/HeroSection/HeroSection', () => ({
  __esModule: true,
  HeroSection: () => <div>Hero section</div>
}));

jest.mock('./BiographyContent/BiographyContent', () => ({
  __esModule: true,
  BiographyContent: () => <div>Biography content</div>
}));

jest.mock('~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice', () => ({
  __esModule: true,
  default: () => <div>Liatoshynsky office</div>
}));

describe('Biography page', () => {
  const { setRequestLocale, getTranslations } = jest.requireMock('next-intl/server') as {
    setRequestLocale: jest.Mock;
    getTranslations: jest.Mock;
  };

  const { resolvePageData } = jest.requireMock('~/services/pages-data/resolvePageData') as {
    resolvePageData: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getTranslations.mockResolvedValue((key: string) => key);
  });

  it('should render biography blocks when page exists', async () => {
    resolvePageData.mockResolvedValueOnce(
      WrapSuccess({
        blocks: {
          heroSection: {},
          biographyContent: [{ yearTitle: '1910' }, { yearTitle: null }, { yearTitle: '1930' }],
          LiatoshynskyOffice: {}
        }
      })
    );

    const ui = await Biography({ params: Promise.resolve({ lang: 'en' }) });
    render(ui);

    expect(setRequestLocale).toHaveBeenCalledWith('en');
    expect(resolvePageData).toHaveBeenCalledWith('biography', 'en');

    expect(screen.getByText(/Hero section/i)).toBeInTheDocument();
    expect(screen.getByText(/Biography content/i)).toBeInTheDocument();
    expect(screen.getByText(/Liatoshynsky office/i)).toBeInTheDocument();
    expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  it('should return PageNotFound when page is missing', async () => {
    resolvePageData.mockResolvedValueOnce(WrapError('No page found'));

    const ui = await Biography({ params: Promise.resolve({ lang: 'uk' }) });
    render(ui);

    expect(resolvePageData).toHaveBeenCalledWith('biography', 'uk');
    expect(getTranslations).toHaveBeenCalled();
    expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Error: No page found/i)).toBeInTheDocument();
  });
});

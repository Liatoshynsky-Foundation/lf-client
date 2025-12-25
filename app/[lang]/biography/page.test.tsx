import { render, screen } from '@testing-library/react';

import Biography from './page';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

jest.mock('~/services/pages-data/resolvePageData', () => ({
  resolvePageData: jest.fn()
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

describe('Biography page', () => {
  const { setRequestLocale } = jest.requireMock('next-intl/server') as {
    setRequestLocale: jest.Mock;
  };

  const { resolvePageData } = jest.requireMock('~/services/pages-data/resolvePageData') as {
    resolvePageData: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render biography blocks when page exists', async () => {
    resolvePageData.mockResolvedValueOnce({
      blocks: {
        heroSection: {},
        biographyContent: [{ yearTitle: '1910' }, { yearTitle: null }, { yearTitle: '1930' }]
      }
    });

    const ui = await Biography({ params: Promise.resolve({ lang: 'en' }) });
    render(ui);

    expect(setRequestLocale).toHaveBeenCalledWith('en');
    expect(resolvePageData).toHaveBeenCalledWith('biography', 'en');

    expect(screen.getByText(/Hero section/i)).toBeInTheDocument();
    expect(screen.getByText(/Biography content/i)).toBeInTheDocument();
    expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  it('should return PageNotFound when page is missing', async () => {
    resolvePageData.mockResolvedValueOnce(null);

    const ui = await Biography({ params: Promise.resolve({ lang: 'uk' }) });
    render(ui);

    expect(resolvePageData).toHaveBeenCalledWith('biography', 'uk');
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});

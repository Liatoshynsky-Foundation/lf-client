import { render, screen } from '@testing-library/react';

import Home, { generateMetadata } from './page';
import { WrapError, WrapSuccess } from '~/types/types/result';

jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

import { isProductionMode } from '~/utils/isProductionMode';

jest.mock('~/components/blocks/FoundationFounders/FoundationFounders', () => ({
  __esModule: true,
  default: () => <div>Foundation founders</div>
}));

jest.mock('~/components/blocks/FoundationInfo/FoundationInfo', () => ({
  __esModule: true,
  default: () => <div>Foundation info</div>
}));

jest.mock('~/components/blocks/IntroSection/IntroSection', () => ({
  __esModule: true,
  IntroSection: () => <div>Intro section</div>
}));

jest.mock('~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice', () => ({
  __esModule: true,
  default: () => <div>Liatoshynsky office</div>
}));

jest.mock('~/components/blocks/our-goals/OurGoals', () => ({
  __esModule: true,
  default: () => <div>Our goals</div>
}));

jest.mock('~/components/blocks/our-mission/OurMission', () => ({
  __esModule: true,
  default: () => <div>Our mission</div>
}));

jest.mock('~/components/blocks/what-we-do/WhatWeDo', () => ({
  __esModule: true,
  default: () => <div>What we do</div>
}));

jest.mock('~/components/under-development/UnderDevelopment', () => ({
  __esModule: true,
  default: () => <div data-testid="under-development">Under Development</div>
}));

jest.mock('~/services/pages-data/resolvePageData');
jest.mock('~/lib/utils/errorPageFactory', () => ({
  ErrorPageFactory: jest.fn(() => <div data-testid="error-page">Error: No page found</div>)
}));
jest.mock('../[...unknown-route]/page-not-found/PageNotFound');

describe('Home page', () => {
  const { resolvePageData } = jest.requireMock('~/services/pages-data/resolvePageData') as {
    resolvePageData: jest.Mock;
  };
  const { setRequestLocale, getTranslations } = jest.requireMock('next-intl/server') as {
    setRequestLocale: jest.Mock;
    getTranslations: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (isProductionMode as jest.Mock).mockReturnValue(false);
  });

  it('should generate correct metadata (lines 25-36)', async () => {
    const mockParams = Promise.resolve({ lang: 'uk' as any });
    const metadata = await generateMetadata({ params: mockParams });

    expect(metadata).toBeDefined();
    expect(metadata.title).toBeDefined();
  });

  it('should render UnderDevelopment in production mode (lines 43-44)', async () => {
    (isProductionMode as jest.Mock).mockReturnValue(true);

    const ui = await Home({ params: Promise.resolve({ lang: 'en' }) });
    render(ui);

    expect(screen.getByTestId('under-development')).toBeInTheDocument();
    expect(screen.queryByText(/Intro section/i)).not.toBeInTheDocument();
  });

  it('should render PageNotFound when UnwrapResult is null (lines 58-59)', async () => {
    resolvePageData.mockResolvedValueOnce(WrapSuccess(null));

    const ui = await Home({ params: Promise.resolve({ lang: 'en' }) });
    render(ui);

    expect(screen.queryByText(/Intro section/i)).not.toBeInTheDocument();
  });

  it('renders blocks when page exists and calls resolvePageData', async () => {
    resolvePageData.mockResolvedValueOnce(
      WrapSuccess({
        blocks: {
          IntroSection: {},
          FoundationInfo: {},
          OurMission: {},
          OurGoals: {},
          LiatoshynskyOffice: {},
          WhatWeDo: {},
          FoundationFounders: {}
        }
      })
    );
    getTranslations.mockResolvedValue((key: string) => key);

    const ui = await Home({ params: Promise.resolve({ lang: 'en' }) });
    render(ui);

    expect(setRequestLocale).toHaveBeenCalledWith('en');
    expect(resolvePageData).toHaveBeenCalledWith('about-us', 'en');
    expect(screen.getByText(/Our mission/i)).toBeInTheDocument();
  });

  it('returns ErrorPage from factory when page is missing', async () => {
    resolvePageData.mockResolvedValueOnce(WrapError('No page found'));

    const ui = await Home({ params: Promise.resolve({ lang: 'uk' }) });
    render(ui);

    expect(resolvePageData).toHaveBeenCalledWith('about-us', 'uk');

    expect(screen.getByText(/Error: No page found/i)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

import Home from './page';
import { WrapError, WrapSuccess } from '~/types/types/result';

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

jest.mock('~/services/pages-data/resolvePageData');
jest.mock('~/lib/utils/errorPageFactory');
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

    const ui = await Home({ params: Promise.resolve({ lang: 'en' }) });
    render(ui);

    expect(setRequestLocale).toHaveBeenCalledWith('en');
    expect(resolvePageData).toHaveBeenCalledWith('about-us', 'en');
    expect(getTranslations).toHaveBeenCalledWith('home.liatoshynskyOffice');

    expect(screen.getByText(/Our mission/i)).toBeInTheDocument();
    expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  it('returns PageNotFound when page is missing', async () => {
    resolvePageData.mockResolvedValueOnce(WrapError('No page found'));

    const ui = await Home({ params: Promise.resolve({ lang: 'uk' }) });
    render(ui);

    expect(resolvePageData).toHaveBeenCalledWith('about-us', 'uk');
    expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Error: No page found/i)).toBeInTheDocument();
  });
});

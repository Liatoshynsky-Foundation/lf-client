import { render, screen } from '@testing-library/react';

import Home from './page';

jest.mock('next/headers', () => ({
  draftMode: jest.fn().mockResolvedValue({ isEnabled: false })
}));

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

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: jest.fn().mockResolvedValue((k: string) => k)
}));

jest.mock('~/di/container', () => {
  const liveGetPageData = jest.fn().mockResolvedValue({
    blocks: {
      IntroSection: {},
      FoundationInfo: {},
      OurMission: {},
      OurGoals: {},
      LiatoshynskyOffice: {},
      WhatWeDo: {},
      FoundationFounders: {}
    }
  });
  const draftGetPageData = jest.fn().mockResolvedValue({
    blocks: {
      IntroSection: {},
      FoundationInfo: {},
      OurMission: {},
      OurGoals: {},
      LiatoshynskyOffice: {},
      WhatWeDo: {},
      FoundationFounders: {}
    }
  });

  const pagesDataService = { getPageData: liveGetPageData };
  const draftPagesDataService = { getPageData: draftGetPageData };

  return {
    __esModule: true,
    __pagesDataService: pagesDataService,
    __draftPagesDataService: draftPagesDataService,
    createRequestContainer: () => ({
      resolve: (token: string) => {
        if (token === 'draftPagesDataService') return draftPagesDataService;
        if (token === 'pagesDataService') return pagesDataService;
        return {};
      }
    })
  };
});

describe('Home page', () => {
  const { draftMode } = jest.requireMock('next/headers');
  const { __pagesDataService, __draftPagesDataService } = jest.requireMock('~/di/container') as {
    __pagesDataService: { getPageData: jest.Mock };
    __draftPagesDataService: { getPageData: jest.Mock };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uses pagesDataService when draftMode is disabled', async () => {
    (draftMode as jest.Mock).mockResolvedValueOnce({ isEnabled: false });

    const ui = await Home({ params: Promise.resolve({ lang: 'en' }) });
    render(ui);

    expect(screen.getByText(/Our mission/i)).toBeInTheDocument();
    expect(__pagesDataService.getPageData).toHaveBeenCalledTimes(1);
    expect(__pagesDataService.getPageData).toHaveBeenCalledWith('about-us', 'en');
    expect(__draftPagesDataService.getPageData).not.toHaveBeenCalled();
  });

  it('uses draftPagesDataService when draftMode is enabled', async () => {
    (draftMode as jest.Mock).mockResolvedValueOnce({ isEnabled: true });

    const ui = await Home({ params: Promise.resolve({ lang: 'uk' }) });
    render(ui);

    expect(screen.getByText(/Our mission/i)).toBeInTheDocument();
    expect(__draftPagesDataService.getPageData).toHaveBeenCalledTimes(1);
    expect(__draftPagesDataService.getPageData).toHaveBeenCalledWith('about-us', 'uk');
    expect(__pagesDataService.getPageData).not.toHaveBeenCalled();
  });
});

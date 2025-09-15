import { render, screen } from '@testing-library/react';

import Home from './page';

jest.mock('next/headers', () => ({
  draftMode: jest.fn().mockResolvedValue({ isEnabled: false })
}));

jest.mock('~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice', () => {
  const Mock = () => <div>Liatoshynsky office</div>;
  Mock.displayName = 'MockLiatoshynskyOffice';
  return Mock;
});
jest.mock('~/components/blocks/FoundationFounders/FoundationFounders', () => {
  const Mock = () => <div>Foundation founders</div>;
  Mock.displayName = 'MockFoundationFounders';
  return Mock;
});
jest.mock('~/components/blocks/our-mission/OurMission', () => {
  const Mock = () => <div>Our mission</div>;
  Mock.displayName = 'MockOurMission';
  return Mock;
});
jest.mock('~/components/blocks/IntroSection/IntroSection', () => {
  const Mock = () => <div>Intro section</div>;
  Mock.displayName = 'MockIntroSection';
  return Mock;
});
jest.mock('~/components/blocks/FoundationInfo/FoundationInfo', () => {
  const Mock = () => <div>Foundation info</div>;
  Mock.displayName = 'MockFoundationInfo';
  return Mock;
});
jest.mock('~/components/blocks/our-goals/OurGoals', () => {
  const Mock = () => <div>Our goals</div>;
  Mock.displayName = 'MockOurGoals';
  return Mock;
});
jest.mock('~/components/blocks/what-we-do/WhatWeDo', () => {
  const Mock = () => <div>What we do</div>;
  Mock.displayName = 'MockWhatWeDo';
  return Mock;
});

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

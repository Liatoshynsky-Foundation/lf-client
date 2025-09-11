import { render, screen } from '@testing-library/react';

import Home from './page';

jest.mock('next/headers', () => ({
  draftMode: jest.fn(() => ({ isEnabled: false }))
}));

jest.mock('~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice', () => {
  const MockLiatoshynskyOffice = () => <div>Liatoshynsky office</div>;
  MockLiatoshynskyOffice.displayName = 'MockLiatoshynskyOffice';
  return MockLiatoshynskyOffice;
});

jest.mock('~/components/blocks/FoundationFounders/FoundationFounders', () => {
  const MockFoundationFounders = () => <div>Foundation founders</div>;
  MockFoundationFounders.displayName = 'MockFoundationFounders';
  return MockFoundationFounders;
});

jest.mock('~/components/blocks/our-mission/OurMission', () => {
  const MockOurMission = () => <div>Our mission</div>;
  MockOurMission.displayName = 'MockOurMission';
  return MockOurMission;
});

jest.mock('~/components/blocks/IntroSection/IntroSection', () => {
  const MockIntroSection = () => <div>Intro section</div>;
  MockIntroSection.displayName = 'MockIntroSection';
  return MockIntroSection;
});

jest.mock('~/components/blocks/FoundationInfo/FoundationInfo', () => {
  const MockFoundationInfo = () => <div>Foundation info</div>;
  MockFoundationInfo.displayName = 'MockFoundationInfo';
  return MockFoundationInfo;
});

jest.mock('~/components/blocks/our-goals/OurGoals', () => {
  const MockOurGoals = () => <div>Our goals</div>;
  MockOurGoals.displayName = 'MockOurGoals';
  return MockOurGoals;
});

jest.mock('~/components/blocks/what-we-do/WhatWeDo', () => {
  const MockWhatWeDo = () => <div>What we do</div>;
  MockWhatWeDo.displayName = 'MockWhatWeDo';
  return MockWhatWeDo;
});

jest.mock('~/di/container', () => ({
  createRequestContainer: () => ({
    resolve: () => ({
      getPublishedPageData: jest.fn().mockResolvedValue({
        blocks: {
          IntroSection: {},
          FoundationInfo: {},
          OurMission: {},
          OurGoals: {},
          LiatoshynskyOffice: {},
          WhatWeDo: {},
          FoundationFounders: {}
        }
      }),
      getDraftPageData: jest.fn().mockResolvedValue({
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
    })
  })
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: jest.fn().mockResolvedValue((key: string) => key)
}));

describe('Home component', () => {
  it('should render Home component correctly', async () => {
    render(await Home({ params: Promise.resolve({ lang: 'en' }) } as any));

    expect(screen.getByText(/Our mission/i)).toBeInTheDocument();
    expect(screen.getByText(/Liatoshynsky office/i)).toBeInTheDocument();
    expect(screen.getByText(/Foundation founders/i)).toBeInTheDocument();
    expect(screen.getByText(/Intro section/i)).toBeInTheDocument();
    expect(screen.getByText(/Foundation info/i)).toBeInTheDocument();
    expect(screen.getByText(/Our goals/i)).toBeInTheDocument();
    expect(screen.getByText(/What we do/i)).toBeInTheDocument();
  });
});

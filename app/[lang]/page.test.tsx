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

jest.mock('~/di/container', () => ({
  createRequestContainer: () => ({
    resolve: () => ({
      getPageData: jest.fn().mockResolvedValue({
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
    const ui = await Home({ params: Promise.resolve({ lang: 'en' }) });
    render(ui);

    expect(screen.getByText(/Our mission/i)).toBeInTheDocument();
    expect(screen.getByText(/Liatoshynsky office/i)).toBeInTheDocument();
    expect(screen.getByText(/Foundation founders/i)).toBeInTheDocument();
    expect(screen.getByText(/Intro section/i)).toBeInTheDocument();
    expect(screen.getByText(/Foundation info/i)).toBeInTheDocument();
    expect(screen.getByText(/Our goals/i)).toBeInTheDocument();
    expect(screen.getByText(/What we do/i)).toBeInTheDocument();
  });
});

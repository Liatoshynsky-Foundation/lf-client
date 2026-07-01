import { runCommonPageTests } from '../__mocks__/runCommonPageTests';
import Home from './page';

jest.mock('~/components/blocks/FoundationFounders/FoundationFounders', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>FoundationFounders section: {data.listTitle}</div>
}));

jest.mock('~/components/blocks/FoundationInfo/FoundationInfo', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>FoundationInfo section: {data.ourName}</div>
}));

jest.mock('~/components/blocks/IntroSection/IntroSection', () => ({
  __esModule: true,
  IntroSection: ({ data }: any) => <div>IntroSection section: {data.title}</div>
}));

jest.mock('~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice', () => ({
  __esModule: true,
  default: ({ data, t }: any) => (
    <div>
      LiatoshynskyOffice section: {data.quote.text} (t: {t('test-key')})
    </div>
  )
}));

jest.mock('~/components/blocks/our-goals/OurGoals', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>OurGoals section: {data.title}</div>
}));

jest.mock('~/components/blocks/our-mission/OurMission', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>OurMission section: {data.title}</div>
}));

jest.mock('~/components/blocks/what-we-do/WhatWeDo', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>WhatWeDo section: {data.title}</div>
}));

describe('AbousUs page', () => {
  runCommonPageTests(Home, 'about-us');
});

import { runCommonPageTests } from '../__mocks__/runCommonPageTests';
import Home from './page';

jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

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

jest.mock('~/components/under-development/UnderDevelopment', () => ({
  __esModule: true,
  default: () => <div data-testid="under-development">Under Development</div>
}));

jest.mock('~/services/pages-data/resolvePageData');
jest.mock('~/lib/utils/errorPageFactory', () => ({
  ErrorPageFactory: jest.fn(() => <div data-testid="error-page">Error: No page found</div>)
}));
jest.mock('../[...unknown-route]/page-not-found/PageNotFound', () => ({
  PageNotFound: () => <div data-testid="not-found-page">Page Not Found</div>
}));
jest.mock('~/shared/components/page-builder/PageBuilder');

describe('AbousUs page', () => {
  runCommonPageTests(Home, 'about-us');
});

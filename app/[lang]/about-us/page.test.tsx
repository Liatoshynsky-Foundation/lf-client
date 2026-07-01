import {
  testGeneratePageMetadata,
  testPassLangSlugToPageBuilder,
  testReturnBlockRenderer
} from '../__mocks__/runCommonPageTests';
import Home, { BLOCK_NAMES_MAP, generateMetadata } from './page';

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly pass lang, slug to the PageBuilder', async () => {
    await testPassLangSlugToPageBuilder(Home, 'about-us');
  });

  it('should correctly generate page metadata', async () => {
    await testGeneratePageMetadata(generateMetadata, 'meta.pages.aboutUs', '/');
  });

  it('should return BlockRenderer with correct page data, blocks & BLOCKS_RENDERER with BLOCK_NAMES_MAP', async () => {
    await testReturnBlockRenderer({
      PageComponent: Home,
      rendererKeys: [
        'IntroSection',
        'FoundationInfo',
        'OurMission',
        'OurGoals',
        'LiatoshynskyOffice',
        'WhatWeDo',
        'FoundationFounders'
      ],
      namesMap: BLOCK_NAMES_MAP
    });
  });
});

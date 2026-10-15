import { getTranslations } from 'next-intl/server';

import {
  testGeneratePageMetadata,
  testPassLangSlugToPageBuilder,
  testReturnBlockRenderer
} from '../__mocks__/runCommonPageTests';
import Home, { generateMetadata } from './page';

import { resolvePageData } from '~/services/pages-data/resolvePageData';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => `translated_${key}`),
  setRequestLocale: jest.fn()
}));

jest.mock('~/services/pages-data/resolvePageData', () => ({
  resolvePageData: jest.fn()
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

describe('AbousUs page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly pass lang, slug to the PageBuilder', async () => {
    await testPassLangSlugToPageBuilder(Home, 'about-us');
  });

  it('should correctly generate page metadata', async () => {
    (resolvePageData as jest.Mock).mockResolvedValue({
      isError: false,
      value: null
    });

    await testGeneratePageMetadata(generateMetadata, 'meta.pages.aboutUs', '/');
  });

  it('should fallback to default metadata when resolvePageData returns an error', async () => {
    (getTranslations as jest.Mock).mockResolvedValue((key: string) => `translated_${key}`);

    (resolvePageData as jest.Mock).mockResolvedValueOnce({
      isError: true,
      error: new Error('Failed to load page')
    });

    const mockParamsUk = Promise.resolve({ lang: 'uk' as const });
    const metadata = await generateMetadata({ params: mockParamsUk });

    expect(metadata.title).toBe('translated_title');
    expect(metadata.description).toBe('translated_description');
  });

  it('should generate metadata using CMS values when available', async () => {
    (getTranslations as jest.Mock).mockResolvedValue((key: string) => `translated_${key}`);

    const mockCmsData = {
      title: { uk: 'Про нас CMS', en: 'About CMS' },
      description: { uk: 'Опис CMS', en: 'Description CMS' },
      canonicalUrl: { uk: '/custom-about', en: '/en/custom-about' },
      allowIndexation: { uk: true, en: true }
    };

    (resolvePageData as jest.Mock).mockResolvedValueOnce({
      isError: false,
      ok: true,
      data: mockCmsData,
      value: mockCmsData
    });

    const mockParamsUk = Promise.resolve({ lang: 'uk' as const });
    const metadata = await generateMetadata({ params: mockParamsUk });

    expect(metadata.title).toBe('Про нас CMS');
    expect(metadata.description).toBe('Опис CMS');
    expect(metadata.robots).toBe('index, follow');
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
      namesMap: {
        intro: 'IntroSection',
        foundation: 'FoundationInfo',
        mission: 'OurMission',
        goals: 'OurGoals',
        office: 'LiatoshynskyOffice',
        'what-we-do': 'WhatWeDo',
        founders: 'FoundationFounders'
      }
    });
  });
});

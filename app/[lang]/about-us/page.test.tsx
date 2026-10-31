import { getTranslations } from 'next-intl/server';

import {
  testGeneratePageMetadata,
  testPassDraftIdToResolvePageData,
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

jest.mock('~/lib/utils/getDraftId', () => ({
  getDraftId: jest.fn()
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
    (getTranslations as jest.Mock).mockResolvedValue((token: string) => `static_${token}`);
    (resolvePageData as jest.Mock).mockResolvedValueOnce({
      isError: true,
      error: 'Cannot fetch about-us data'
    });

    const fallbackResponse = await generateMetadata({
      params: Promise.resolve({ lang: 'uk' as const }),
      searchParams: Promise.resolve({})
    });

    expect(fallbackResponse.title).toBe('static_title');
    expect(fallbackResponse.description).toBe('static_description');
  });

  it('should generate metadata using CMS values when available', async () => {
    (getTranslations as jest.Mock).mockResolvedValue((token: string) => `static_${token}`);

    const aboutPayload = {
      title: { uk: 'Про Фундацію Офіційно', en: 'About Foundation Official' },
      description: { uk: 'Головна інформація про організацію', en: 'Main foundation info' },
      canonicalUrl: { uk: '/foundation-page', en: '/en/foundation-page' },
      allowIndexation: { uk: true, en: true }
    };

    (resolvePageData as jest.Mock).mockResolvedValueOnce({
      isError: false,
      ok: true,
      data: aboutPayload,
      value: aboutPayload
    });

    const targetParams = Promise.resolve({ lang: 'uk' as const });
    const output = await generateMetadata({ params: targetParams, searchParams: Promise.resolve({}) });

    expect(output.title).toBe('Про Фундацію Офіційно');
    expect(output.description).toBe('Головна інформація про організацію');
    expect(output.robots).toBe('index, follow');
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

  it('should pass the draft ID to resolvePageData', async () => {
    await testPassDraftIdToResolvePageData(generateMetadata, 'about-us', 'draft-123');
  });
});

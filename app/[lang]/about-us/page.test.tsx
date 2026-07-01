import { getTranslations, setRequestLocale } from 'next-intl/server';

import { runCommonPageTests } from '../__mocks__/runCommonPageTests';
import Home, { generateMetadata } from './page';
import { createSeoMeta } from '~/utils/createSeoMeta';

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

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: jest.fn()
}));

jest.mock('~/utils/createSeoMeta', () => ({
  createSeoMeta: jest.fn((meta) => meta)
}));

jest.mock('~/shared/components/constants/routes', () => ({
  ROUTES: {
    HOME: '/'
  }
}));

describe('AbousUs page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  runCommonPageTests(Home, 'about-us');

  it('should correctly generate page metadata', async () => {
    const mockT = jest.fn((key) => `translated_${key}`);

    (getTranslations as jest.Mock).mockResolvedValueOnce(mockT);
    const meta = await generateMetadata({ params: Promise.resolve({ lang: 'en' }) });
    expect(setRequestLocale).toHaveBeenCalledWith('en');

    expect(getTranslations).toHaveBeenCalledWith('meta.pages.aboutUs');

    expect(mockT).toHaveBeenCalledWith('title');
    expect(mockT).toHaveBeenCalledWith('description');

    expect(createSeoMeta).toHaveBeenCalledWith({
      title: 'translated_title',
      description: 'translated_description',
      url: '/',
      locale: 'en'
    });

    expect(meta).toEqual({
      title: 'translated_title',
      description: 'translated_description',
      url: '/',
      locale: 'en'
    });
  });
});

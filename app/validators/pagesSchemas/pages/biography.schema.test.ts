import { BiographyPageSchema } from './biography.schema';

import { NoIDSchema, NoPageType, NoTime } from '~/validators/constants';
import { LocalizeSchema } from '~/validators/localization';

const localized = <T>(uk: T, en: T) => ({ uk, en });
const tipTapDoc = (text: string) => ({
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text }] }]
});

const createHeroSection = (overrides: Record<string, unknown> = {}) => ({
  image: {
    src: '/hero.jpg',
    alt: localized('Фото', 'Photo'),
    caption: { mainText: localized('Підпис', 'Caption'), yearText: localized('1960', '1960') }
  },
  quote: { text: localized('Цитата', 'Quote'), source: localized('Джерело', 'Source') },
  biographyText: localized(tipTapDoc('Текст'), tipTapDoc('Text')),
  noteText: localized('Примітка', 'Note'),
  ...overrides
});

const createBiographyContent = (withIds: boolean) => [
  {
    ...(withIds && { id: 'year-1' }),
    yearTitle: '1900-1910',
    items: [
      {
        ...(withIds && { id: 'section-1' }),
        type: 'chronologyList',
        listItems: [{ description: localized(tipTapDoc('Подія'), tipTapDoc('Event')) }]
      },
      {
        ...(withIds && { id: 'section-2' }),
        type: 'excerptBlockItem',
        quote: { text: localized('Акцент', 'Accent'), source: localized('Джерело', 'Source') }
      }
    ]
  }
];

const createPage = (heroSection: Record<string, unknown>, withIds: boolean) => ({
  _id: '507f1f77bcf86cd799439011',
  pageType: 'BiographyPage',
  slug: 'biography',
  title: localized('Життєпис', 'Biography'),
  status: 'published',
  blocks: {
    heroSection,
    biographyContent: createBiographyContent(withIds),
    LiatoshynskyOffice: { quote: { text: localized('Текст', 'Text'), source: localized('Автор', 'Author') } }
  }
});

const parseForLocale = (page: unknown, locale: 'uk' | 'en') =>
  LocalizeSchema(NoTime(NoIDSchema(NoPageType(BiographyPageSchema))), locale).parse(page);

describe('BiographyPageSchema', () => {
  it('reads the hero title and year and section IDs from the page data', () => {
    const page = createPage(createHeroSection({ title: localized('Життєпис', 'Biography') }), true);

    const ukPage = parseForLocale(page, 'uk');
    const enPage = parseForLocale(page, 'en');

    expect(ukPage.blocks.heroSection.title).toBe('Життєпис');
    expect(enPage.blocks.heroSection.title).toBe('Biography');
    expect(ukPage.blocks.biographyContent[0].id).toBe('year-1');
    expect(ukPage.blocks.biographyContent[0].items.map((item) => item.id)).toEqual(['section-1', 'section-2']);
  });

  it('accepts data that was saved before the hero title and IDs were added', () => {
    const page = createPage(createHeroSection(), false);

    const ukPage = parseForLocale(page, 'uk');

    expect(ukPage.blocks.heroSection.title).toBeUndefined();
    expect(ukPage.blocks.biographyContent[0].id).toBeUndefined();
    expect(ukPage.blocks.biographyContent[0].items).toHaveLength(2);
  });
});

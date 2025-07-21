import { Locale } from 'next-intl';

import {
  transformFoundationFounders,
  transformFoundationInfo,
  transformIntroSection,
  transformLiatoshynskyOffice,
  transformOurGoals,
  transformOurMission,
  transformWhatWeDo
} from './transformer';

import { AnyBlock } from '~/validators/page/blocks/anyBlock.schema';

const locale: Locale = 'uk';
const otherLocale: Locale = 'en';

const createMockContentBlock = (elements: any[]): AnyBlock => ({
  _id: 'mock-id-123',
  blockType: 'ContentConstructorBlock',
  componentName: 'AnyComponent',
  content: {
    elements
  }
});

const createMockTeamBlock = (content: any): AnyBlock => ({
  _id: 'mock-team-id-456',
  blockType: 'TeamBlock',
  componentName: 'FoundationFounders',
  content
});

describe('HomePage Transformers', () => {
  describe('transformIntroSection', () => {
    it('should transform a block with all elements correctly', () => {
      const block = createMockContentBlock([
        { elementType: 'Heading', text: { [locale]: 'Головний заголовок', [otherLocale]: 'Main Title' } },
        { elementType: 'Image', imageName: 'intro.jpg', caption: { [locale]: 'Підпис до фото' } },
        { elementType: 'Quote', text: { [locale]: 'Текст цитати' }, author: { [locale]: 'Автор' } }
      ]);
      const result = transformIntroSection(block, locale);
      expect(result).toEqual({
        title: 'Головний заголовок',
        image: {
          src: '/api/blob-url?folderName=photos&blobName=intro.jpg',
          alt: 'Підпис до фото',
          caption: 'Підпис до фото'
        },
        quote: {
          mainText: 'Текст цитати',
          sourceTitle: 'Автор'
        }
      });
    });
  });

  describe('transformFoundationInfo', () => {
    it('should transform paragraphs and image correctly', () => {
      const block = createMockContentBlock([
        { elementType: 'Paragraph', text: { [locale]: 'Жирний текст' } },
        { elementType: 'Paragraph', text: { [locale]: 'Основний текст організації' } },
        { elementType: 'Paragraph', text: { [locale]: 'Основний текст' } },
        { elementType: 'Paragraph', text: { [locale]: 'Текст-зображення' } },
        { elementType: 'Image', imageName: 'foundation.png', caption: { [locale]: 'Лого' } }
      ]);
      const result = transformFoundationInfo(block, locale);
      expect(result).toEqual({
        organisationBoldText: 'Жирний текст',
        organisationMainText: 'Основний текст організації',
        mainText: 'Основний текст',
        textImage: 'Текст-зображення',
        foundationImage: {
          src: '/api/blob-url?folderName=photos&blobName=foundation.png',
          alt: 'Лого'
        }
      });
    });
  });

  describe('transformOurMission', () => {
    it('should transform a full block correctly', () => {
      const block = createMockContentBlock([
        { elementType: 'Heading', text: { [locale]: 'Наша місія' } },
        { elementType: 'BulletedList', items: [{ [locale]: 'Пункт 1' }, { [locale]: 'Пункт 2' }] },
        { elementType: 'Image', imageName: 'small.jpg', caption: { [locale]: 'Мале фото' } },
        { elementType: 'Image', imageName: 'big.jpg', caption: { [locale]: 'Велике фото' } }
      ]);
      const result = transformOurMission(block, locale);
      expect(result.title).toBe('Наша місія');
      expect(result.listItems).toEqual(['Пункт 1', 'Пункт 2']);
      expect(result.smallImage?.alt).toBe('Мале фото');
      expect(result.bigImage?.alt).toBe('Велике фото');
    });
  });

  describe('transformOurGoals', () => {
    it('should transform a TitledList correctly', () => {
      const block = createMockContentBlock([
        { elementType: 'Heading', text: { [locale]: 'Наші цілі' } },
        {
          elementType: 'TitledList',
          items: [{ title: { [locale]: 'Ціль 1' }, description: { [locale]: 'Опис 1' } }]
        }
      ]);
      const result = transformOurGoals(block, locale);
      expect(result).toEqual({
        mainTitle: 'Наші цілі',
        goals: [{ id: 'mock-id-123', title: 'Ціль 1', description: 'Опис 1' }]
      });
    });
  });

  describe('transformLiatoshynskyOffice', () => {
    it('should extract the quote correctly', () => {
      const block = createMockContentBlock([
        { elementType: 'Quote', text: { [locale]: 'Цитата про офіс' }, author: { [locale]: 'Автор цитати' } }
      ]);
      const result = transformLiatoshynskyOffice(block, locale);
      expect(result).toEqual({
        quote: { text: 'Цитата про офіс', author: 'Автор цитати' }
      });
    });
  });

  describe('transformFoundationFounders', () => {
    it('should transform a TeamBlock correctly', () => {
      const block = createMockTeamBlock({
        sectionTitle: { [locale]: 'Засновники' },
        introText: { [locale]: 'Опис засновників' },
        members: [
          {
            name: { [locale]: 'Імя 1' },
            description: { [locale]: 'Посада 1' },
            imageName: 'founder1.png'
          }
        ]
      });
      const result = transformFoundationFounders(block, locale);
      expect(result).toEqual({
        title: 'Засновники',
        description: 'Опис засновників',
        members: [
          {
            name: 'Імя 1',
            description: 'Посада 1',
            photo: '/api/blob-url?blobName=founder1.png&folderName=photos'
          }
        ]
      });
    });
  });

  describe('transformWhatWeDo', () => {
    it('should transform a TitledList correctly', () => {
      const block = createMockContentBlock([
        { elementType: 'Heading', text: { [locale]: 'Що ми робимо' } },
        {
          elementType: 'TitledList',
          items: [{ title: { [locale]: 'Дія 1' }, description: { [locale]: 'Опис 1' } }]
        }
      ]);
      const result = transformWhatWeDo(block, locale);
      expect(result).toEqual({
        mainTitle: 'Що ми робимо',
        items: [{ id: 'mock-id-123', title: 'Дія 1', description: 'Опис 1' }]
      });
    });
  });
});

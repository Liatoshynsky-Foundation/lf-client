import { MANAGED_PAGE_SECTION_KIND } from '~/types/page/managed-page-section.types';

import {
  hasLocaleContent,
  isManagedPageSectionBlock,
  prepareManagedPageSections
} from '~/lib/utils/managedPageSections';

const emptyDoc = { type: 'doc', content: [] };
const textDoc = (text: string) => ({
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text }] }]
});

describe('managedPageSections', () => {
  describe('isManagedPageSectionBlock', () => {
    it('returns true for a managed page section block', () => {
      expect(
        isManagedPageSectionBlock({
          kind: MANAGED_PAGE_SECTION_KIND,
          title: { uk: textDoc('Назва'), en: textDoc('Title') },
          items: []
        })
      ).toBe(true);
    });

    it('returns false for static blocks', () => {
      expect(isManagedPageSectionBlock({ title: 'Наші цілі', goals: [] })).toBe(false);
      expect(isManagedPageSectionBlock(null)).toBe(false);
    });
  });

  describe('hasLocaleContent', () => {
    it('detects localized tiptap text', () => {
      expect(hasLocaleContent({ uk: textDoc('Текст'), en: emptyDoc }, 'uk')).toBe(true);
      expect(hasLocaleContent({ uk: textDoc('Текст'), en: emptyDoc }, 'en')).toBe(false);
    });

    it('detects plain strings', () => {
      expect(hasLocaleContent('Hello', 'uk')).toBe(true);
      expect(hasLocaleContent('   ', 'uk')).toBe(false);
    });
  });

  describe('prepareManagedPageSections', () => {
    it('returns the same page when there are no managed sections', () => {
      const page = { blocks: { OurGoals: { title: 'Goals' } }, blocksOrder: ['goals'] };

      expect(prepareManagedPageSections(page, 'uk')).toBe(page);
    });

    it('drops managed sections without locale title and removes them from blocksOrder', () => {
      const page = {
        blocks: {
          OurGoals: { title: 'Goals' },
          'section-1': {
            kind: MANAGED_PAGE_SECTION_KIND,
            title: { uk: emptyDoc, en: textDoc('Improve') },
            items: []
          }
        },
        blocksOrder: ['goals', 'section-1']
      };

      expect(prepareManagedPageSections(page, 'uk')).toEqual({
        blocks: { OurGoals: { title: 'Goals' } },
        blocksOrder: ['goals']
      });
    });

    it('keeps a filled section and filters empty items for the current locale', () => {
      const page = {
        blocks: {
          'section-1': {
            kind: MANAGED_PAGE_SECTION_KIND,
            title: { uk: textDoc('Що хочемо поліпшити'), en: emptyDoc },
            items: [
              { id: '1', type: 'paragraph', value: { uk: textDoc('Абзац'), en: emptyDoc } },
              { id: '2', type: 'bullet', value: { uk: emptyDoc, en: textDoc('Skip') } }
            ]
          }
        },
        blocksOrder: ['section-1']
      };

      const result = prepareManagedPageSections(page, 'uk');

      expect(result.blocks['section-1']).toMatchObject({
        kind: MANAGED_PAGE_SECTION_KIND,
        items: [{ id: '1', type: 'paragraph' }]
      });
      expect(result.blocksOrder).toEqual(['section-1']);
    });
  });
});

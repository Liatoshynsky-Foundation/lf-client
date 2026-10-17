import { z } from 'zod';

import { MANAGED_PAGE_SECTION_KIND } from '~/types/page/managed-page-section.types';

import {
  ManagedPageSectionBlockSchema,
  withManagedPageSections
} from '~/validators/pagesSchemas/pages/managed-page-section.schema';

const textDoc = (text: string) => ({
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text }] }]
});

describe('managed page section schema', () => {
  it('parses a valid managed section', () => {
    const result = ManagedPageSectionBlockSchema.parse({
      kind: MANAGED_PAGE_SECTION_KIND,
      title: { uk: textDoc('Що хочемо поліпшити'), en: textDoc('What we want to improve') },
      items: [
        {
          id: 'item-1',
          type: 'paragraph',
          value: { uk: textDoc('Абзац'), en: textDoc('Paragraph') }
        }
      ]
    });

    expect(result.kind).toBe(MANAGED_PAGE_SECTION_KIND);
    expect(result.items).toHaveLength(1);
  });

  it('keeps extra managed blocks on a static blocks object', () => {
    const schema = withManagedPageSections(z.object({ OurGoals: z.object({ title: z.string() }) }));
    const parsed = schema.parse({
      OurGoals: { title: 'Наші цілі' },
      'section-1': {
        kind: MANAGED_PAGE_SECTION_KIND,
        title: { uk: textDoc('Нова секція'), en: textDoc('New section') },
        items: []
      }
    });

    expect(parsed.OurGoals.title).toBe('Наші цілі');
    expect(parsed['section-1']).toMatchObject({ kind: MANAGED_PAGE_SECTION_KIND });
  });
});

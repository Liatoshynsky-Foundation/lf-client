import { Locale } from 'next-intl';
import z from 'zod';

import { LocalizeSchema } from './localization';
import { LocalizationErrors } from '~/constants/errors';

describe('LocalizeSchema', () => {
  const unknownSchema = z.unknown();

  it('should return primitive values untouched', async () => {
    const transformer = LocalizeSchema(unknownSchema, 'en' as Locale);
    const data = { title: 'test', views: 42 };
    const result = await transformer.parseAsync(data);
    expect(result).toEqual(data);
  });

  it('should extract correct language from translated fields', async () => {
    const schema = z.object({
      name: z.unknown()
    });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = { name: { en: 'Hello', uk: 'Привіт' } };
    const result = await transformer.parseAsync(data);
    expect(result).toEqual({ name: 'Hello' });
  });

  it('should process deeply nested arrays recursively', async () => {
    const schema = z.object({
      tags: z.array(z.unknown())
    });
    const transformer = LocalizeSchema(schema, 'uk' as Locale);
    const data = { tags: [{ uk: 'Новини', en: 'News' }] };
    const result = await transformer.parseAsync(data);
    expect(result).toEqual({ tags: ['Новини'] });
  });

  it('should process schema wrapper directly if target input is array root element', async () => {
    const transformer = LocalizeSchema(unknownSchema, 'en' as Locale);
    const data = [{ title: 'item', views: 1 }];
    const result = await transformer.parseAsync(data);
    expect(result).toEqual(data);
  });

  it('should treat empty values inside optional paths like alt or caption as valid', async () => {
    const schema = z.object({
      alt: z.unknown(),
      caption: z.unknown()
    });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = {
      alt: { en: '', uk: '' },
      caption: { en: '', uk: '' }
    };
    const result = await transformer.parseAsync(data);
    expect(result).toEqual({ alt: '', caption: '' });
  });

  it('should throw validation error when non-optional fields hold empty string records', async () => {
    const schema = z.object({ title: z.unknown() });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = { title: { en: '', uk: '' } };

    await expect(transformer.parseAsync(data)).rejects.toThrow(
      `${LocalizationErrors.MISSING_EN_ERROR} at path: root.title`
    );
  });

  it('should accept rich text tiptap field translations when nodes contain content', async () => {
    const schema = z.object({ body: z.record(z.unknown()) });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = {
      body: {
        en: {
          type: 'doc',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: 'valid text' }] }]
        },
        uk: {
          type: 'doc',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: 'валідний текст' }] }]
        }
      }
    };
    const result = await transformer.parseAsync(data);
    expect(result).toEqual({
      body: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: 'valid text' }] }]
      }
    });
  });

  it('should invalidate tiptap node blocks if arrays contain empty text children keys', async () => {
    const schema = z.object({ body: z.record(z.unknown()) });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = {
      body: {
        en: {
          type: 'doc',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }]
        },
        uk: {
          type: 'doc',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }]
        }
      }
    };
    await expect(transformer.parseAsync(data)).rejects.toThrow(
      `${LocalizationErrors.MISSING_EN_ERROR} at path: root.body`
    );
  });

  it('should fail validation workflows if internal localized mapping returns unsupported boolean type', async () => {
    const schema = z.object({ status: z.unknown() });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = { status: { en: true } };
    await expect(transformer.parseAsync(data)).rejects.toThrow(
      `${LocalizationErrors.MISSING_EN_ERROR} at path: root.status`
    );
  });

  it('should fail validation workflows if internal localized mapping returns unsupported number type', async () => {
    const schema = z.object({ count: z.unknown() });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = { count: { en: 42, uk: 42 } };
    await expect(transformer.parseAsync(data)).rejects.toThrow(
      `${LocalizationErrors.MISSING_EN_ERROR} at path: root.count`
    );
  });

  it('should pass conditions when isTranslatedField matches target parameters perfectly', async () => {
    const schema = z.object({ value: z.unknown() });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = { value: { en: 'passed', uk: 'пройдено' } };
    const result = await transformer.parseAsync(data);
    expect(result).toEqual({ value: 'passed' });
  });

  it('should pass validation cleanly when tiptap root structure completely lacks content field wrapper to trigger static true branches', async () => {
    const schema = z.object({ body: z.record(z.unknown()) });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = {
      body: {
        en: {
          type: 'doc'
        }
      }
    };
    const result = await transformer.parseAsync(data);
    expect(result).toEqual({ body: { type: 'doc' } });
  });

  it('should skip tiptap nodes without content and validate the next node that has content', async () => {
    const schema = z.object({ body: z.record(z.unknown()) });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = {
      body: {
        en: {
          content: [{ type: 'heading' }, { type: 'paragraph', content: [{ type: 'text', text: 'valid text' }] }]
        },
        uk: {
          content: [{ type: 'heading' }, { type: 'paragraph', content: [{ type: 'text', text: 'валідний текст' }] }]
        }
      }
    };
    const result = await transformer.parseAsync(data);
    expect(result).toEqual({ body: data.body.en });
  });

  it('should invalidate tiptap doc when all nodes lack a content field', async () => {
    const schema = z.object({ body: z.record(z.unknown()) });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = {
      body: {
        en: { content: [{ type: 'heading' }] },
        uk: { content: [{ type: 'heading' }] }
      }
    };
    await expect(transformer.parseAsync(data)).rejects.toThrow(
      `${LocalizationErrors.MISSING_EN_ERROR} at path: root.body`
    );
  });

  it('should fallback to en locale when uk field is empty', async () => {
    const schema = z.object({ title: z.unknown() });
    const transformer = LocalizeSchema(schema, 'uk' as Locale, { fallbackFields: ['title'] });
    const data = { title: { en: 'Hello', uk: '' } };

    const result = await transformer.parseAsync(data);
    expect(result).toEqual({ title: 'Hello' });
  });

  it('should continue loop when tiptap node content is missing', async () => {
    const schema = z.object({ body: z.record(z.unknown()) });
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const data = {
      body: {
        en: {
          content: [{ type: 'paragraph' }, { type: 'paragraph', content: [{ type: 'text', text: 'text' }] }]
        }
      }
    };
    const result = await transformer.parseAsync(data);
    expect(result).toEqual({ body: data.body.en });
  });

  it('should throw error if non optional field path evaluates to empty string inside root array mapping', async () => {
    const schema = z.array(z.unknown());
    const transformer = LocalizeSchema(schema, 'en' as Locale);
    const invalidData = [{ description: { en: '' } }];

    await expect(transformer.parseAsync(invalidData)).rejects.toThrow(
      `${LocalizationErrors.MISSING_EN_ERROR} at path: root[0].description`
    );
  });

  it('should process objects created with null prototype or non plain objects cleanly', async () => {
    const schema = z.unknown();
    const transformer = LocalizeSchema(schema, 'en' as Locale);

    const customObj = Object.create(null) as Record<string, string>;
    customObj.key = 'value';

    const result = await transformer.parseAsync(customObj);
    expect(result).toEqual(customObj);
  });
});

import { PageSeoSchema } from './seo.schema';

describe('PageSeoSchema', () => {
  const validSeoPayload = {
    description: { uk: 'Опис сторінки', en: 'Page description' },
    keywords: { uk: 'слово1, слово2', en: 'word1, word2' },
    canonicalUrl: { uk: 'https://site.ua/uk', en: 'https://site.ua/en' },
    allowIndexation: { uk: true, en: true }
  };

  it('should validate full valid SEO payload', () => {
    const result = PageSeoSchema.safeParse(validSeoPayload);
    expect(result.success).toBe(true);
  });

  it('should validate when all optional SEO fields are omitted', () => {
    const result = PageSeoSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('should validate migrated empty string values ({ uk: "", en: "" })', () => {
    const migratedPayload = {
      description: { uk: '', en: '' },
      keywords: { uk: '', en: '' },
      canonicalUrl: { uk: '', en: '' },
      allowIndexation: { uk: true, en: true }
    };

    const result = PageSeoSchema.safeParse(migratedPayload);
    expect(result.success).toBe(true);
  });

  it('should set default true for allowIndexation if flags are undefined', () => {
    const result = PageSeoSchema.safeParse({
      allowIndexation: {}
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.allowIndexation).toEqual({ uk: true, en: true });
    }
  });

  it('should reject non-boolean types for allowIndexation', () => {
    const invalidPayload = {
      allowIndexation: { uk: 'invalid-string', en: true }
    };

    const result = PageSeoSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it('should reject non-string values for translated text fields', () => {
    const invalidPayload = {
      description: { uk: 12345, en: 'English description' }
    };

    const result = PageSeoSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });
});

import { z } from 'zod';

export const mockValidSeoData = {
  description: { uk: 'Тестовий опис', en: 'Test description' },
  keywords: { uk: 'тест', en: 'test' },
  canonicalUrl: { uk: 'https://site.ua/page', en: 'https://site.ua/en/page' },
  allowIndexation: { uk: true, en: true }
};

export function describeSeoFieldsSupport(
  schemaName: string,
  schema: z.ZodTypeAny,
  getBaseValidData: () => Record<string, unknown>
) {
  describe(`${schemaName} - SEO fields support`, () => {
    it('should validate successfully without SEO fields (backwards compatibility)', () => {
      const dataWithoutSeo = getBaseValidData();
      const result = schema.safeParse(dataWithoutSeo);

      expect(result.success).toBe(true);
    });

    it('should validate successfully when valid SEO fields are attached', () => {
      const dataWithSeo = {
        ...getBaseValidData(),
        ...mockValidSeoData
      };

      const result = schema.safeParse(dataWithSeo);

      expect(result.success).toBe(true);
    });

    it('should fail validation when SEO fields contain invalid types', () => {
      const dataWithInvalidSeo = {
        ...getBaseValidData(),
        allowIndexation: { uk: 'invalid-boolean-type', en: true }
      };

      const result = schema.safeParse(dataWithInvalidSeo);

      expect(result.success).toBe(false);
    });

    it('should validate successfully with migrated empty string values', () => {
      const migratedData = {
        ...getBaseValidData(),
        description: { uk: '', en: '' },
        keywords: { uk: '', en: '' },
        canonicalUrl: { uk: '', en: '' },
        allowIndexation: { uk: true, en: true }
      };

      const result = schema.safeParse(migratedData);
      expect(result.success).toBe(true);
    });
  });
}

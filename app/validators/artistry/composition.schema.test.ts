import { opusSchema } from './composition.schema';

describe('opusSchema performancesTitle', () => {
  const baseOpusInput = {
    _id: '507f1f77bcf86cd799439011',
    name: { uk: 'Опус 1', en: 'Opus 1' },
    title: { uk: 'Струнний квартет', en: 'String Quartet' },
    number: 1,
    numberKind: 'op',
    creationYear: '1920',
    slug: 'string-quartet-1',
    compositions: []
  };

  it('should accept opus with valid localized performancesTitle', () => {
    const input = {
      ...baseOpusInput,
      performancesTitle: {
        uk: 'ТЕСТ заголовок з CMS',
        en: 'TEST title from CMS'
      }
    };

    const parsed = opusSchema.parse(input);

    expect(parsed.performancesTitle).toEqual({
      uk: 'ТЕСТ заголовок з CMS',
      en: 'TEST title from CMS'
    });
  });

  it('should accept opus when performancesTitle is null or undefined', () => {
    const parsedWithNull = opusSchema.parse({
      ...baseOpusInput,
      performancesTitle: null
    });
    const parsedWithoutField = opusSchema.parse(baseOpusInput);

    expect(parsedWithNull.performancesTitle).toBeNull();
    expect(parsedWithoutField.performancesTitle).toBeUndefined();
  });
});

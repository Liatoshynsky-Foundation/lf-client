import { opusSchema, sheetMusicItemSchema } from './composition.schema';

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

describe('opusSchema coverImage', () => {
  it('should accept opus with valid coverImage', () => {
    const input = {
      ...baseOpusInput,
      coverImage: {
        src: 'https://example.com/cover.jpg',
        alt: { uk: 'Опис фото', en: 'Photo description' }
      }
    };

    const parsed = opusSchema.parse(input);

    expect(parsed.coverImage).toEqual({
      src: 'https://example.com/cover.jpg',
      alt: { uk: 'Опис фото', en: 'Photo description' }
    });
  });

  it('should accept opus when coverImage is null or undefined', () => {
    const parsedWithNull = opusSchema.parse({
      ...baseOpusInput,
      coverImage: null
    });
    const parsedWithoutField = opusSchema.parse(baseOpusInput);

    expect(parsedWithNull.coverImage).toBeNull();
    expect(parsedWithoutField.coverImage).toBeUndefined();
  });
});

describe('opusSchema performancesTitle', () => {
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

describe('sheetMusicItemSchema', () => {
  const baseItem = {
    url: 'https://example.com/scores/piece.pdf',
    fileName: 'piece.pdf',
    publishDate: null
  };

  it.each([
    {
      description: 'fall back to fileName when name is null',
      input: { ...baseItem, name: null },
      expected: 'piece.pdf'
    },
    {
      description: 'fall back to fileName when name is whitespace',
      input: { ...baseItem, name: '   ' },
      expected: 'piece.pdf'
    },
    {
      description: 'keep explicit name as-is',
      input: { ...baseItem, name: 'Ноти для фортепіано' },
      expected: 'Ноти для фортепіано'
    },
    {
      description: 'fall back to filename from url when name and fileName are missing',
      input: {
        url: 'https://example.com/scores/sonata_op12.pdf?download=true',
        name: null,
        fileName: null,
        publishDate: null
      },
      expected: 'sonata_op12.pdf'
    },
    {
      description: 'fall back to empty string when all name sources are missing',
      input: {
        url: null,
        name: null,
        fileName: null,
        publishDate: null
      },
      expected: ''
    }
  ])('should $description', ({ input, expected }) => {
    const parsed = sheetMusicItemSchema.parse(input);
    expect(parsed.name).toBe(expected);
  });
});

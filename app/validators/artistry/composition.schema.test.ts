import { sheetMusicItemSchema } from './composition.schema';

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

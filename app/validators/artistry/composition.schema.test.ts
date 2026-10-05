import { sheetMusicItemSchema } from './composition.schema';

describe('sheetMusicItemSchema', () => {
  it('should fall back to fileName when name is null', () => {
    const input = {
      url: 'https://example.com/scores/piece.pdf',
      name: null,
      fileName: 'piece.pdf',
      publishDate: null
    };

    const parsed = sheetMusicItemSchema.parse(input);

    expect(parsed.name).toBe('piece.pdf');
  });

  it('should fall back to fileName when name is an empty string or spaces', () => {
    const input = {
      url: 'https://example.com/scores/piece.pdf',
      name: '   ',
      fileName: 'piece.pdf',
      publishDate: null
    };

    const parsed = sheetMusicItemSchema.parse(input);

    expect(parsed.name).toBe('piece.pdf');
  });

  it('should keep explicit name as-is', () => {
    const input = {
      url: 'https://example.com/scores/piece.pdf',
      name: 'Ноти для фортепіано',
      fileName: 'piece.pdf',
      publishDate: null
    };

    const parsed = sheetMusicItemSchema.parse(input);

    expect(parsed.name).toBe('Ноти для фортепіано');
  });

  it('should fall back to filename from url when both name and fileName are missing', () => {
    const input = {
      url: 'https://example.com/scores/sonata_op12.pdf?download=true',
      name: null,
      fileName: null,
      publishDate: null
    };

    const parsed = sheetMusicItemSchema.parse(input);

    expect(parsed.name).toBe('sonata_op12.pdf');
  });

  it('should fall back to empty string when name, fileName, and url are all missing', () => {
    const input = {
      url: null,
      name: null,
      fileName: null,
      publishDate: null
    };

    const parsed = sheetMusicItemSchema.parse(input);

    expect(parsed.name).toBe('');
  });
});

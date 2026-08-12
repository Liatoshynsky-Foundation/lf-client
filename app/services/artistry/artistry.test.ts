import type { CompositionRepository } from '~/infrastructure/repositories/artistry/compositions.repo';
import { createArtistryService } from '~/services/artistry/artistryService';

const mockRawCategories = [
  {
    _id: '63f8b3b7a8b3d6c1b3e8e4d1',
    key: 'classical',
    name: { en: 'Classical', uk: 'Класична' }
  }
];

const mockRawCompositions = [
  {
    _id: '63f8b3b7a8b3d6c1b3e8e4b1',
    title: { uk: 'Красива пісня', en: 'A Beautiful Song' },
    year: 2022,
    audioAvailable: true,
    sheetAvailable: false,
    sheetMusic: [],
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    opusId: {
      _id: '63f8b3b7a8b3d6c1b3e8e4c1',
      number: 'op. 1',
      title: { en: 'First Opus', uk: 'Перший опус' },
      releaseYear: 2022,
      createdAt: new Date('2022-01-01'),
      updatedAt: new Date('2022-01-01')
    },
    genre: null
  }
];

describe('artistryService', () => {
  const compositionServiceMock = {
    getAllGenres: jest.fn(),
    getAllCategories: jest.fn(),
    getAllCompositions: jest.fn(),
    getAllCompositionTitles: jest.fn(),
    getCompositionsYearRange: jest.fn(),
    getOpusById: jest.fn()
  } as unknown as jest.Mocked<CompositionRepository>;

  const artistryService = createArtistryService({
    compositionsRepo: compositionServiceMock
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllGenres', () => {
    it('should return empty array (genre filter removed from UI)', async () => {
      const result = await artistryService.getAllGenres();
      expect(result).toEqual([]);
    });
  });

  describe('getAllCategories', () => {
    it('should fetch categories, localize them and return the result', async () => {
      const locale = 'uk';
      (compositionServiceMock.getAllCategories as jest.Mock).mockResolvedValue(mockRawCategories);
      const result = await artistryService.getAllCategories(locale);
      expect(result).toEqual([{ key: 'classical', name: 'Класична' }]);
    });
  });

  describe('getAllCompositions', () => {
    it('should fetch compositions, localize them and return the result', async () => {
      const locale = 'uk';
      (compositionServiceMock.getAllCompositions as jest.Mock).mockResolvedValue(mockRawCompositions);
      const result = await artistryService.getAllCompositions(locale, '');
      const parsedResult = result as unknown as Record<string, unknown>[];
      expect(parsedResult[0].name).toBe('Красива пісня');
      expect(parsedResult[0].opusTitle).toBe('Перший опус');
    });

    it('should return empty array if null returned', async () => {
      (compositionServiceMock.getAllCompositions as jest.Mock).mockResolvedValue(null);
      const result = await artistryService.getAllCompositions('uk', '');
      expect(result).toEqual([]);
    });
  });

  describe('getAllCompositionTitles', () => {
    it('should fetch titles, localize them and add genre suggestions', async () => {
      const locale = 'en';
      const mockTitles = [
        {
          _id: '507f191e810c19729de860ea',
          title: { en: 'Title En', uk: 'Назва Укр' }
        }
      ];
      (compositionServiceMock.getAllCompositionTitles as jest.Mock).mockResolvedValue(mockTitles);
      (compositionServiceMock.getAllGenres as jest.Mock).mockResolvedValue(['Romance', 'Jazz']);

      const result = await artistryService.getAllCompositionTitles(locale);

      expect(result).toEqual([
        { _id: '507f191e810c19729de860ea', title: 'Title En' },
        { _id: 'genre-0', title: 'Romance', kind: 'genre' },
        { _id: 'genre-1', title: 'Jazz', kind: 'genre' }
      ]);
      expect(compositionServiceMock.getAllCompositionTitles).toHaveBeenCalledWith({});
      expect(compositionServiceMock.getAllGenres).toHaveBeenCalled();
    });

    it('should return empty array if repo returns null to cover branch line 42', async () => {
      (compositionServiceMock.getAllCompositionTitles as jest.Mock).mockResolvedValue(null);
      const result = await artistryService.getAllCompositionTitles('uk');
      expect(result).toEqual([]);
    });

    it('should return empty array if repo returns empty array to complete branch cover', async () => {
      (compositionServiceMock.getAllCompositionTitles as jest.Mock).mockResolvedValue([]);
      (compositionServiceMock.getAllGenres as jest.Mock).mockResolvedValue([]);
      const result = await artistryService.getAllCompositionTitles('uk');
      expect(result).toEqual([]);
    });
  });

  describe('getCompositionsYearRange', () => {
    it('should fetch and return year range', async () => {
      const mockRange = { minYear: 1950, maxYear: 2024 };
      (compositionServiceMock.getCompositionsYearRange as jest.Mock).mockResolvedValue(mockRange);

      const result = await artistryService.getCompositionsYearRange();

      expect(result).toEqual(mockRange);
      expect(compositionServiceMock.getCompositionsYearRange).toHaveBeenCalled();
    });
  });

  describe('getOpusDetailsById', () => {
    const rawOpus = {
      opus: {
        _id: '63f8b3b7a8b3d6c1b3e8e4c1',
        number: 16,
        numberKind: 'bo',
        title: { uk: 'Український квінтет', en: 'Ukrainian Quintet' },
        creationYear: '1929'
      },
      compositions: [
        {
          _id: '63f8b3b7a8b3d6c1b3e8e4b1',
          name: { uk: 'Після бою', en: 'After the battle' },
          year: 1929,
          genre: 'Фортепіанний квінтет',
          sheetMusic: [
            { url: 'https://example.com/paid.pdf', isFree: false },
            { url: 'https://example.com/free.pdf', isFree: true }
          ]
        },
        {
          _id: '63f8b3b7a8b3d6c1b3e8e4b2',
          name: { uk: 'Смерть', en: 'Death' },
          year: 1929,
          sheetMusic: []
        }
      ]
    };

    it('should return null when the opus is not found', async () => {
      (compositionServiceMock.getOpusById as jest.Mock).mockResolvedValue(null);

      const result = await artistryService.getOpusDetailsById('uk', 'missing-id');

      expect(result).toBeNull();
    });

    it('should localize and map the opus details', async () => {
      (compositionServiceMock.getOpusById as jest.Mock).mockResolvedValue(rawOpus);

      const result = await artistryService.getOpusDetailsById('uk', rawOpus.opus._id);

      expect(result).toEqual({
        _id: rawOpus.opus._id,
        number: 'bo.16',
        title: 'Український квінтет',
        creationDate: '1929',
        genre: 'Фортепіанний квінтет',
        description: null,
        videos: [],
        compositions: [
          {
            _id: '63f8b3b7a8b3d6c1b3e8e4b1',
            index: 1,
            title: 'Після бою',
            sheetMusicUrl: 'https://example.com/free.pdf'
          },
          {
            _id: '63f8b3b7a8b3d6c1b3e8e4b2',
            index: 2,
            title: 'Смерть',
            sheetMusicUrl: undefined
          }
        ]
      });
    });

    it('should prefer the opus-level description and genre over derived values', async () => {
      (compositionServiceMock.getOpusById as jest.Mock).mockResolvedValue({
        opus: {
          _id: rawOpus.opus._id,
          number: 16,
          numberKind: 'bo',
          title: { uk: 'Український квінтет', en: 'Ukrainian Quintet' },
          creationYear: '1929',
          genre: { uk: 'Фортепіанний квінтет (опус)', en: 'Piano quintet (opus)' },
          description: { uk: 'Опис українською.', en: 'Description in english.' }
        },
        compositions: rawOpus.compositions
      });

      const result = await artistryService.getOpusDetailsById('uk', rawOpus.opus._id);

      expect(result?.genre).toBe('Фортепіанний квінтет (опус)');
      expect(result?.description).toBe('Опис українською.');
    });

    it('should fall back to the first sheet-music entry when none is free', async () => {
      (compositionServiceMock.getOpusById as jest.Mock).mockResolvedValue({
        opus: {
          _id: rawOpus.opus._id,
          number: 1,
          numberKind: 'op',
          title: { uk: 'Опус', en: 'Opus' }
        },
        compositions: [
          {
            _id: '63f8b3b7a8b3d6c1b3e8e4b9',
            name: { uk: 'Твір', en: 'Piece' },
            sheetMusic: [{ url: 'https://example.com/paid.pdf', isFree: false }]
          }
        ]
      });

      const result = await artistryService.getOpusDetailsById('uk', rawOpus.opus._id);

      expect(result?.compositions[0].sheetMusicUrl).toBe('https://example.com/paid.pdf');
    });

    it('should treat a blank opus description as missing (null)', async () => {
      (compositionServiceMock.getOpusById as jest.Mock).mockResolvedValue({
        opus: {
          _id: rawOpus.opus._id,
          number: 16,
          numberKind: 'bo',
          title: { uk: 'Український квінтет', en: 'Ukrainian Quintet' },
          creationYear: '1929',
          description: { uk: '   ', en: '' }
        },
        compositions: []
      });

      const result = await artistryService.getOpusDetailsById('uk', rawOpus.opus._id);

      expect(result?.description).toBeNull();
    });

    it('should map movements, opus sheet-music link and extract YouTube ids from performance links', async () => {
      (compositionServiceMock.getOpusById as jest.Mock).mockResolvedValue({
        opus: {
          _id: rawOpus.opus._id,
          number: 16,
          numberKind: 'bo',
          title: { uk: 'Український квінтет', en: 'Ukrainian Quintet' },
          creationYear: '1929',
          parts: { uk: 'I. Allegro e poco agitato\n  \nII. Lento e tranquillo', en: '' },
          sheetMusicUrl: 'https://example.com/opus-score.pdf',
          performances: [
            { videoUrl: 'https://www.youtube.com/watch?v=abcdefghijk' },
            { videoUrl: 'https://youtu.be/1234567890A' },
            { videoUrl: 'not-a-youtube-url' }
          ]
        },
        compositions: []
      });

      const result = await artistryService.getOpusDetailsById('uk', rawOpus.opus._id);

      expect(result?.movements).toEqual(['I. Allegro e poco agitato', 'II. Lento e tranquillo']);
      expect(result?.sheetMusicUrl).toBe('https://example.com/opus-score.pdf');
      expect(result?.videos).toEqual([
        { _id: 'abcdefghijk', youTubeId: 'abcdefghijk' },
        { _id: '1234567890A', youTubeId: '1234567890A' }
      ]);
    });

    it('should omit movements/sheet-music/videos when blank or absent', async () => {
      (compositionServiceMock.getOpusById as jest.Mock).mockResolvedValue({
        opus: {
          _id: rawOpus.opus._id,
          number: 16,
          numberKind: 'bo',
          title: { uk: 'Український квінтет', en: 'Ukrainian Quintet' },
          parts: { uk: '   ', en: '' },
          sheetMusicUrl: '  '
        },
        compositions: []
      });

      const result = await artistryService.getOpusDetailsById('uk', rawOpus.opus._id);

      expect(result?.movements).toBeUndefined();
      expect(result?.sheetMusicUrl).toBeUndefined();
      expect(result?.videos).toEqual([]);
    });

    it('should localize to english and omit the creation date when creationYear is missing', async () => {
      (compositionServiceMock.getOpusById as jest.Mock).mockResolvedValue({
        opus: {
          _id: rawOpus.opus._id,
          number: 1,
          numberKind: 'op',
          title: { uk: 'Опус', en: 'Opus' }
        },
        compositions: []
      });

      const result = await artistryService.getOpusDetailsById('en', rawOpus.opus._id);

      expect(result?.title).toBe('Opus');
      expect(result?.creationDate).toBeUndefined();
      expect(result?.genre).toBeUndefined();
      expect(result?.compositions).toEqual([]);
    });
  });
});

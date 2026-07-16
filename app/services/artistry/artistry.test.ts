import type { CompositionRepository } from '~/infrastructure/repositories/artistry/compositions.repo';
import { createArtistryService } from '~/services/artistry/artistryService';

const mockRawGenres = [
  {
    _id: '63f8b3b7a8b3d6c1b3e8e4a1',
    key: 'romance',
    name: { en: 'Romance', uk: 'Романс' }
  }
];

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
    genres: mockRawGenres
  }
];

describe('artistryService', () => {
  const compositionServiceMock = {
    getAllGenres: jest.fn(),
    getAllCategories: jest.fn(),
    getAllCompositions: jest.fn(),
    getAllCompositionTitles: jest.fn(),
    getCompositionsYearRange: jest.fn()
  } as unknown as jest.Mocked<CompositionRepository>;

  const artistryService = createArtistryService({
    compositionsRepo: compositionServiceMock
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllGenres', () => {
    it('should fetch genres, localize them and return the result', async () => {
      const locale = 'uk';
      (compositionServiceMock.getAllGenres as jest.Mock).mockResolvedValue(mockRawGenres);
      const result = await artistryService.getAllGenres(locale);
      expect(result).toEqual([{ key: 'romance', name: 'Романс' }]);
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
    it('should fetch titles and localize them with fallback empty object filters', async () => {
      const locale = 'en';
      const mockTitles = [
        {
          _id: '507f191e810c19729de860ea',
          title: { en: 'Title En', uk: 'Назва Укр' }
        }
      ];
      (compositionServiceMock.getAllCompositionTitles as jest.Mock).mockResolvedValue(mockTitles);

      const result = await artistryService.getAllCompositionTitles(locale);

      expect(result).toEqual([{ _id: '507f191e810c19729de860ea', title: 'Title En' }]);
      expect(compositionServiceMock.getAllCompositionTitles).toHaveBeenCalledWith({});
    });

    it('should return empty array if repo returns null to cover branch line 42', async () => {
      (compositionServiceMock.getAllCompositionTitles as jest.Mock).mockResolvedValue(null);
      const result = await artistryService.getAllCompositionTitles('uk');
      expect(result).toEqual([]);
    });

    it('should return empty array if repo returns empty array to complete branch cover', async () => {
      (compositionServiceMock.getAllCompositionTitles as jest.Mock).mockResolvedValue([]);
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
});

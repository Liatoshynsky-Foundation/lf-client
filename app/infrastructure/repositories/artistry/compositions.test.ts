import newCompositionsRepository from './compositions.repository';

import { Category } from '~/infrastructure/models/artistry/artistryCategoriesData';
import { Genre } from '~/infrastructure/models/artistry/artistryGenreData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';

jest.mock('~/infrastructure/db/connect', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('~/infrastructure/models/artistry/artistryGenreData', () => ({ Genre: { find: jest.fn() } }));
jest.mock('~/infrastructure/models/artistry/artistryTableData', () => ({
  Compositions: { find: jest.fn(), aggregate: jest.fn() }
}));
jest.mock('~/infrastructure/models/artistry/artistryCategoriesData', () => ({ Category: { find: jest.fn() } }));
jest.mock('~/infrastructure/models/artistry/artistryOpusData', () => ({ Opus: { find: jest.fn() } }));

jest.mock('~/lib/utils/searchAndFiltersHelpers', () => ({
  namedFilterHelper: jest.fn((val) => (val ? (Array.isArray(val) ? val : [val]) : [])),
  searchHelper: jest.fn((val) => val),
  yearHelper: jest.fn((val) => val)
}));

const compositionsRepository = newCompositionsRepository();

const mockMongooseChain = (resolvedValue: any) => ({
  select: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue(resolvedValue)
});

describe('compositionsRepository', () => {
  beforeEach(() => jest.clearAllMocks());

  const validMongoId = '507f191e810c19729de860ea';

  describe('Basic methods', () => {
    const validNamedFilter = () => ({
      _id: validMongoId,
      key: 'test',
      name: { uk: 'н', en: 'n' },
      title: { uk: 'з', en: 't' }
    });

    it('should cover getAllGenres & getAllCategories', async () => {
      (Genre.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([validNamedFilter()]) });
      (Category.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([validNamedFilter()]) });
      await compositionsRepository.getAllGenres();
      await compositionsRepository.getAllCategories();
      expect(Genre.find).toHaveBeenCalled();
    });

    it('should return aggregated years or defaults', async () => {
      (Compositions.aggregate as jest.Mock).mockResolvedValueOnce([{ minYear: 1950, maxYear: 2000 }]);
      const result = await compositionsRepository.getCompositionsYearRange();
      expect(result).toEqual({ minYear: 1950, maxYear: 2000 });
      (Compositions.aggregate as jest.Mock).mockResolvedValueOnce([]);
      const defaultRes = await compositionsRepository.getCompositionsYearRange();
      expect(defaultRes.minYear).toBeDefined();
    });
  });

  describe('getAllCompositionTitles', () => {
    it('should handle search, years and successful filters (Lines 57-89)', async () => {
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([]));
      (Genre.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));

      await compositionsRepository.getAllCompositionTitles({
        search: 'test',
        genre: ['g1'],
        yearFrom: 1990
      });

      expect(Compositions.find).toHaveBeenCalled();
    });

    it('should return [] if category keys provided but none found in DB (line 74)', async () => {
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([]));
      const res = await compositionsRepository.getAllCompositionTitles({ category: ['none'] });
      expect(res).toEqual([]);
    });

    it('should push categories to conditions if categoryIds found (line 71)', async () => {
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([]));
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));

      await compositionsRepository.getAllCompositionTitles({ category: ['valid-cat'] });
      expect(Compositions.find).toHaveBeenCalled();
    });

    it('should return [] if genre keys provided but none found in DB (line 87-88)', async () => {
      (Genre.find as jest.Mock).mockReturnValue(mockMongooseChain([]));
      const res = await compositionsRepository.getAllCompositionTitles({ genre: ['none-gen'] });
      expect(res).toEqual([]);
      expect(Compositions.find).not.toHaveBeenCalled();
    });

    it('should cover yearTo branch and empty query branch (lines 93, 98)', async () => {
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([]));

      await compositionsRepository.getAllCompositionTitles({ yearTo: 2024 });

      await compositionsRepository.getAllCompositionTitles({});

      expect(Compositions.find).toHaveBeenCalled();
    });
  });

  describe('getAllCompositions', () => {
    const mockComp = {
      _id: validMongoId,
      title: { uk: 'у', en: 'e' },
      year: 2020,
      genres: [],
      categories: [],
      audioAvailable: false,
      sheetAvailable: false,
      sheetMusic: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('should cover Search and Genre filter (Lines 113-119, 123-127)', async () => {
      (Genre.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp]));

      await compositionsRepository.getAllCompositions('Beethoven', { genres: ['g1'] });

      const query = (Compositions.find as jest.Mock).mock.calls[0][0];
      expect(query.$and).toBeDefined();
    });

    it('should cover Category filter branch (Lines 131-136)', async () => {
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp]));

      await compositionsRepository.getAllCompositions(undefined, { categories: ['c1'] });

      const lastCall = (Compositions.find as jest.Mock).mock.calls[0][0];
      expect(lastCall.categories || lastCall.$and).toBeDefined();
    });

    it('should cover Year filter and return parsed data', async () => {
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp]));
      const res = await compositionsRepository.getAllCompositions(undefined, { years: { min: 1900, max: 2000 } });
      expect(res).toHaveLength(1);
    });

    it('should return empty array if no results found', async () => {
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([]));
      const res = await compositionsRepository.getAllCompositions();
      expect(res).toEqual([]);
    });
  });
});

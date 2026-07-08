import newCompositionsRepository from './compositions.repository';

import { Category } from '~/infrastructure/models/artistry/artistryCategoriesData';
import { Genre } from '~/infrastructure/models/artistry/artistryGenreData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';

jest.mock('~/infrastructure/db/connect', () => ({ __esModule: true, default: jest.fn() }));

jest.mock('~/lib/utils/searchAndFiltersHelpers', () => ({
  namedFilterHelper: jest.fn((val) => (val ? (Array.isArray(val) ? val : [val]) : [])),
  searchHelper: jest.fn((val) => val),
  yearHelper: jest.fn((val) => val)
}));

jest.mock('~/infrastructure/models/artistry/artistryGenreData', () => ({
  Genre: { find: jest.fn() }
}));
jest.mock('~/infrastructure/models/artistry/artistryTableData', () => ({
  Compositions: { find: jest.fn(), aggregate: jest.fn() }
}));
jest.mock('~/infrastructure/models/artistry/artistryCategoriesData', () => ({
  Category: { find: jest.fn() }
}));
jest.mock('~/infrastructure/models/artistry/artistryOpusData', () => ({
  Opus: { find: jest.fn(), aggregate: jest.fn(), findById: jest.fn() }
}));

const compositionsRepository = newCompositionsRepository();

const mockMongooseChain = (resolvedValue: any) => ({
  select: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue(resolvedValue)
});

const mockAggregateChain = (resolvedValue: any) => ({
  exec: jest.fn().mockResolvedValue(resolvedValue)
});

describe('compositionsRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validMongoId = '507f191e810c19729de860ea';

  describe('Basic methods', () => {
    const validNamedFilter = () => ({
      _id: validMongoId,
      key: 'test',
      name: { uk: 'назва', en: 'name' },
      title: { uk: 'заголовок', en: 'title' }
    });

    it('should cover getAllGenres & getAllCategories', async () => {
      (Genre.find as jest.Mock).mockReturnValue(mockMongooseChain([validNamedFilter()]));
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([validNamedFilter()]));

      await compositionsRepository.getAllGenres();
      await compositionsRepository.getAllCategories();

      expect(Genre.find).toHaveBeenCalled();
      expect(Category.find).toHaveBeenCalled();
    });

    it('should return aggregated years or defaults', async () => {
      (Compositions.aggregate as jest.Mock).mockResolvedValue([{ minYear: 1950, maxYear: 2000 }]);
      const result = await compositionsRepository.getCompositionsYearRange();
      expect(result).toEqual({ minYear: 1950, maxYear: 2000 });
    });
  });

  describe('getAllCompositionTitles', () => {
    it('should handle search, years and successful filters', async () => {
      (Genre.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));

      (Compositions.aggregate as jest.Mock).mockReturnValue(
        mockAggregateChain([{ _id: validMongoId, title: { uk: 'т', en: 't' } }])
      );
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));

      await compositionsRepository.getAllCompositionTitles({
        search: 'test',
        genre: ['g1'],
        yearFrom: 1990
      });

      expect(Compositions.aggregate).toHaveBeenCalled();
    });

    it('should return [] if category keys provided but none found in DB', async () => {
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([]));
      const res = await compositionsRepository.getAllCompositionTitles({ category: ['none'] });
      expect(res).toEqual([]);
    });

    it('should return [] if genre keys provided but none found in DB', async () => {
      (Genre.find as jest.Mock).mockReturnValue(mockMongooseChain([]));
      const res = await compositionsRepository.getAllCompositionTitles({ genre: ['none-gen'] });
      expect(res).toEqual([]);
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
      updatedAt: new Date(),
      opusId: {
        _id: validMongoId,
        title: { uk: 'о', en: 'o' },
        number: 'Op. 1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };

    it('should cover Search and Genre filter', async () => {
      (Opus.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));
      (Genre.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp]));

      await compositionsRepository.getAllCompositions('Beethoven', { genres: ['g1'] });

      expect(Compositions.find).toHaveBeenCalled();
    });

    it('should cover Category filter branch', async () => {
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp]));

      await compositionsRepository.getAllCompositions(undefined, { categories: ['c1'] });
      expect(Compositions.find).toHaveBeenCalled();
    });

    it('should return empty array if no results found', async () => {
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([]));
      const res = await compositionsRepository.getAllCompositions();
      expect(res).toEqual([]);
    });
  });

  describe('getOpusById', () => {
    const opusDoc = {
      _id: validMongoId,
      number: 'bo.16',
      title: { uk: 'Український квінтет', en: 'Ukrainian Quintet' },
      releaseYear: 1929
    };

    const compositionDoc = {
      _id: validMongoId,
      title: { uk: 'Після бою', en: 'After the battle' },
      year: 1929,
      genres: [],
      sheetMusic: []
    };

    it('should return null when the id is not a valid ObjectId', async () => {
      const result = await compositionsRepository.getOpusById('not-a-valid-id');

      expect(result).toBeNull();
      expect(Opus.findById).not.toHaveBeenCalled();
    });

    it('should return null when the opus is not found', async () => {
      (Opus.findById as jest.Mock).mockReturnValue(mockMongooseChain(null));

      const result = await compositionsRepository.getOpusById(validMongoId);

      expect(result).toBeNull();
      expect(Opus.findById).toHaveBeenCalledWith(validMongoId);
    });

    it('should return the opus with its compositions', async () => {
      (Opus.findById as jest.Mock).mockReturnValue(mockMongooseChain(opusDoc));
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([compositionDoc]));

      const result = await compositionsRepository.getOpusById(validMongoId);

      expect(result).toEqual({ opus: opusDoc, compositions: [compositionDoc] });
      expect(Compositions.find).toHaveBeenCalledWith({ opusId: validMongoId });
    });
  });
});

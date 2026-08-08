import { PipelineStage } from 'mongoose';

import newCompositionsRepository from './compositions.repository';

import { Category } from '~/infrastructure/models/artistry/artistryCategoriesData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';

jest.mock('~/infrastructure/db/connect', () => ({ __esModule: true, default: jest.fn() }));

jest.mock('~/lib/utils/searchAndFiltersHelpers', () => ({
  namedFilterHelper: jest.fn((val) => (val ? (Array.isArray(val) ? val : [val]) : [])),
  searchHelper: jest.fn((val) => val),
  yearHelper: jest.fn((val) => val)
}));

jest.mock('~/infrastructure/models/artistry/artistryTableData', () => ({
  Compositions: { find: jest.fn(), aggregate: jest.fn() }
}));
jest.mock('~/infrastructure/models/artistry/artistryCategoriesData', () => ({
  Category: { find: jest.fn() }
}));
jest.mock('~/infrastructure/models/artistry/artistryOpusData', () => ({
  Opus: { find: jest.fn(), aggregate: jest.fn(), distinct: jest.fn(), findById: jest.fn() }
}));

const compositionsRepository = newCompositionsRepository();

const mockMongooseChain = <T>(resolvedValue: T) => ({
  select: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue(resolvedValue)
});

const mockAggregateChain = <T>(resolvedValue: T) => ({
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
      (Opus.distinct as jest.Mock).mockResolvedValue(['romance', 'jazz', null, '']);
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([validNamedFilter()]));

      const genres = await compositionsRepository.getAllGenres();
      await compositionsRepository.getAllCategories();

      expect(Opus.distinct).toHaveBeenCalledWith('genre.uk');
      expect(Opus.distinct).toHaveBeenCalledWith('genre.en');
      expect(genres).toEqual(expect.arrayContaining(['romance', 'jazz']));
      expect(genres).toHaveLength(2);
      expect(Category.find).toHaveBeenCalled();
    });

    it('should return aggregated years or defaults', async () => {
      (Opus.aggregate as jest.Mock).mockResolvedValue([{ minYear: 1950, maxYear: 2000 }]);
      (Compositions.aggregate as jest.Mock).mockResolvedValue([{ minYear: 1912, maxYear: 1976 }]);

      const result = await compositionsRepository.getCompositionsYearRange();

      expect(result).toEqual({ minYear: 1912, maxYear: 2000 });
      expect(Opus.aggregate).toHaveBeenCalled();
      expect(Compositions.aggregate).toHaveBeenCalled();
    });
  });

  describe('getArtistrySearchSuggestions', () => {
    it('should handle search, years and successful filters', async () => {
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));

      (Compositions.aggregate as jest.Mock).mockReturnValue(
        mockAggregateChain([{ _id: validMongoId, title: { uk: 'т', en: 't' } }])
      );
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));

      await compositionsRepository.getArtistrySearchSuggestions({
        search: 'test',
        yearFrom: 1990
      });

      expect(Opus.aggregate).toHaveBeenCalled();
    });

    it('should return [] if category keys provided but none found in DB', async () => {
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([]));
      const res = await compositionsRepository.getArtistrySearchSuggestions({ category: ['none'] });
      expect(res).toEqual([]);
    });
  });

  describe('getAllCompositions', () => {
    const mockOpusGroup = {
      _id: validMongoId,
      title: { uk: 'Опус', en: 'Opus' },
      name: { uk: 'Опус', en: 'Opus' },
      number: 1,
      numberKind: 'op',
      creationYear: '2020',
      status: 'published',
      genre: { uk: 'Жанр', en: 'Genre' },
      compositions: [
        {
          _id: validMongoId,
          name: { uk: 'назва', en: 'name' },
          audioAvailable: false,
          sheetAvailable: false,
          sheetMusic: []
        }
      ]
    };

    it('should cover Search filter', async () => {
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([mockOpusGroup]));

      await compositionsRepository.getAllCompositions('Beethoven');

      expect(Opus.aggregate).toHaveBeenCalled();
      const pipeline = (Opus.aggregate as jest.Mock).mock.calls[0][0] as PipelineStage[];
      expect(pipeline.find((stage: any) => stage.$match && stage.$match.$and)).toBeDefined();
    });

    it('should cover Category filter branch', async () => {
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([mockOpusGroup]));

      await compositionsRepository.getAllCompositions(undefined, { categories: ['c1'] });
      expect(Opus.aggregate).toHaveBeenCalled();
    });

    it('should return empty array if no results found', async () => {
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));
      const res = await compositionsRepository.getAllCompositions();
      expect(res).toEqual([]);
    });

    it('should cover with-opus special category branch', async () => {
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([mockOpusGroup]));

      await compositionsRepository.getAllCompositions(undefined, { categories: ['with-opus'] });

      const pipeline = (Opus.aggregate as jest.Mock).mock.calls[0][0] as PipelineStage[];
      const matchStage = pipeline.find((stage) => {
        const match = (stage as PipelineStage.Match).$match;
        return (
          match && Array.isArray(match.$and) && match.$and.some((c) => c && typeof c === 'object' && 'numberKind' in c)
        );
      }) as PipelineStage.Match;
      expect(matchStage.$match.$and).toEqual(expect.arrayContaining([{ numberKind: 'op' }]));
    });

    it('should cover without-opus special category branch', async () => {
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([mockOpusGroup]));

      await compositionsRepository.getAllCompositions(undefined, { categories: ['without-opus'] });

      const pipeline = (Opus.aggregate as jest.Mock).mock.calls[0][0] as PipelineStage[];
      const matchStage = pipeline.find((stage) => {
        const match = (stage as PipelineStage.Match).$match;
        return (
          match && Array.isArray(match.$and) && match.$and.some((c) => c && typeof c === 'object' && 'numberKind' in c)
        );
      }) as PipelineStage.Match;
      expect(matchStage.$match.$and).toEqual(expect.arrayContaining([{ numberKind: 'sineop' }]));
    });

    it('should skip opus filter when both with-opus and without-opus selected', async () => {
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([mockOpusGroup]));

      await compositionsRepository.getAllCompositions(undefined, { categories: ['with-opus', 'without-opus'] });

      const pipeline = (Opus.aggregate as jest.Mock).mock.calls[0][0] as PipelineStage[];
      const hasNumberKindMatch = pipeline.some((stage) => {
        const match = (stage as PipelineStage.Match).$match;
        return (
          match && Array.isArray(match.$and) && match.$and.some((c) => c && typeof c === 'object' && 'numberKind' in c)
        );
      });
      expect(hasNumberKindMatch).toBe(false);
    });

    it('should apply year range filter in getAllCompositions', async () => {
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([mockOpusGroup]));
      await compositionsRepository.getAllCompositions(undefined, { years: { min: 1900, max: 2000 } });
      const pipeline = (Opus.aggregate as jest.Mock).mock.calls[0][0] as PipelineStage[];
      const matchStage = pipeline.find((stage) => {
        const match = (stage as PipelineStage.Match).$match;
        return (
          match &&
          Array.isArray(match.$and) &&
          match.$and.some(
            (c) =>
              c &&
              typeof c === 'object' &&
              '$or' in c &&
              Array.isArray(c.$or) &&
              c.$or.some((cond) => cond && typeof cond === 'object' && 'creationYear' in cond)
          )
        );
      }) as PipelineStage.Match;
      expect(matchStage).toBeDefined();
    });

    it('should not push year condition when years filter is not provided', async () => {
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([mockOpusGroup]));
      await compositionsRepository.getAllCompositions(undefined, {});
      expect(Opus.aggregate).toHaveBeenCalled();
    });
    it('should return default year range when aggregation returns no rows', async () => {
      (Opus.aggregate as jest.Mock).mockResolvedValue([]);
      (Compositions.aggregate as jest.Mock).mockResolvedValue([]);

      const result = await compositionsRepository.getCompositionsYearRange();

      expect(result).toEqual({ minYear: 1900, maxYear: new Date().getFullYear() });
    });

    it('should use composition years when opus aggregation is empty', async () => {
      (Opus.aggregate as jest.Mock).mockResolvedValue([]);
      (Compositions.aggregate as jest.Mock).mockResolvedValue([{ minYear: 1912, maxYear: 1976 }]);

      const result = await compositionsRepository.getCompositionsYearRange();

      expect(result).toEqual({ minYear: 1912, maxYear: 1976 });
    });
  });

  describe('getOpusById', () => {
    const opusDoc = {
      _id: validMongoId,
      number: 16,
      numberKind: 'bo',
      title: { uk: 'Український квінтет', en: 'Ukrainian Quintet' },
      creationYear: '1929',
      compositions: [validMongoId]
    };

    const compositionDoc = {
      _id: validMongoId,
      name: { uk: 'Після бою', en: 'After the battle' },
      year: 1929,
      genre: 'жанр твору',
      sheetMusic: []
    };

    it('should return null when the id is not a valid ObjectId', async () => {
      const result = await compositionsRepository.getOpusById('not-a-valid-id');

      expect(result).toBeNull();
      expect(Opus.findById).not.toHaveBeenCalled();
    });

    it('should return null when the opus is not found', async () => {
      (Opus.findById as jest.Mock).mockReturnValue(mockMongooseChain(null));
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([]));

      const result = await compositionsRepository.getOpusById(validMongoId);

      expect(result).toBeNull();
      expect(Opus.findById).toHaveBeenCalledWith(validMongoId);
    });

    it('should return an empty compositions list without querying Compositions when the opus has none', async () => {
      (Opus.findById as jest.Mock).mockReturnValue(mockMongooseChain({ ...opusDoc, compositions: [] }));

      const result = await compositionsRepository.getOpusById(validMongoId);

      expect(result).toEqual({ opus: { ...opusDoc, compositions: [] }, compositions: [] });
      expect(Compositions.find).not.toHaveBeenCalled();
    });

    it('should return the opus with its compositions, fetched by the ids stored on the opus', async () => {
      (Opus.findById as jest.Mock).mockReturnValue(mockMongooseChain(opusDoc));
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([compositionDoc]));

      const result = await compositionsRepository.getOpusById(validMongoId);

      expect(result).toEqual({ opus: opusDoc, compositions: [compositionDoc] });
      expect(Compositions.find).toHaveBeenCalledWith({ _id: { $in: [validMongoId] } });
    });

    it('should order the returned compositions to match the order of opus.compositions', async () => {
      const secondId = '507f191e810c19729de860eb';
      const opusWithTwo = { ...opusDoc, compositions: [secondId, validMongoId] };
      const secondCompositionDoc = { ...compositionDoc, _id: secondId, name: { uk: 'Смерть', en: 'Death' } };

      (Opus.findById as jest.Mock).mockReturnValue(mockMongooseChain(opusWithTwo));
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([compositionDoc, secondCompositionDoc]));

      const result = await compositionsRepository.getOpusById(validMongoId);

      expect(result?.compositions.map((c) => String(c._id))).toEqual([secondId, validMongoId]);
    });
  });
});

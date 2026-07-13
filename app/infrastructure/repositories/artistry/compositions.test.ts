import { PipelineStage } from 'mongoose';

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
  Opus: { find: jest.fn(), aggregate: jest.fn() }
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
    it('should cover with-opus special category branch', async () => {
      (Opus.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp]));

      await compositionsRepository.getAllCompositions(undefined, { categories: ['with-opus'] });

      expect(Opus.find).toHaveBeenCalledWith({ number: { $regex: /^op/i } });
    });

    it('should cover without-opus special category branch', async () => {
      (Opus.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp]));

      await compositionsRepository.getAllCompositions(undefined, { categories: ['without-opus'] });

      expect(Opus.find).toHaveBeenCalledWith({ number: { $regex: /^bo/i } });
    });

    it('should skip opus filter when both with-opus and without-opus selected', async () => {
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp]));

      await compositionsRepository.getAllCompositions(undefined, { categories: ['with-opus', 'without-opus'] });

      expect(Opus.find).not.toHaveBeenCalled();
    });

    it('should sort compositions by opus prefix, number and rest', async () => {
      const makeComp = (id: string, number: string) => ({
        ...mockComp,
        _id: id,
        opusId: { ...mockComp.opusId, _id: id, number }
      });

      const compsUnsorted = [
        makeComp('507f191e810c19729de860eb', 'Op. 2'),
        makeComp('507f191e810c19729de860ec', 'Bo. 1'),
        makeComp('507f191e810c19729de860ed', 'Op. 1b'),
        makeComp('507f191e810c19729de860ee', 'Op. 1a')
      ];

      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain(compsUnsorted));

      const result = await compositionsRepository.getAllCompositions();

      expect(result.map((c) => c.opusId?.number)).toEqual(['Op. 1a', 'Op. 1b', 'Op. 2', 'Bo. 1']);
    });
    it('should push category match when regular category keys are found', async () => {
      (Category.find as jest.Mock).mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));
      (Compositions.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));

      await compositionsRepository.getAllCompositionTitles({ category: ['some-category'] });

      expect(Category.find).toHaveBeenCalledWith({ key: { $in: ['some-category'] } });
      expect(Compositions.aggregate).toHaveBeenCalled();
    });

    it('should add opus-number regex match for with-opus special category', async () => {
      (Compositions.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));

      await compositionsRepository.getAllCompositionTitles({ category: ['with-opus'] });

      const pipelineArg = (Compositions.aggregate as jest.Mock).mock.calls[0][0] as PipelineStage[];
      const matchStage = pipelineArg.find((stage): stage is PipelineStage.Match => '$match' in stage);
      expect(matchStage?.$match).toMatchObject({ 'opusData.number': { $regex: /^op/i } });
    });

    it('should add opus-number regex match for without-opus special category', async () => {
      (Compositions.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));

      await compositionsRepository.getAllCompositionTitles({ category: ['without-opus'] });

      const pipelineArg = (Compositions.aggregate as jest.Mock).mock.calls[0][0] as PipelineStage[];
      const matchStage = pipelineArg.find((stage): stage is PipelineStage.Match => '$match' in stage);
      expect(matchStage?.$match).toMatchObject({ 'opusData.number': { $regex: /^bo/i } });
    });

    it('should skip opus regex match when both with-opus and without-opus selected', async () => {
      (Compositions.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));

      await compositionsRepository.getAllCompositionTitles({ category: ['with-opus', 'without-opus'] });

      const pipelineArg = (Compositions.aggregate as jest.Mock).mock.calls[0][0] as PipelineStage[];
      const matchStage = pipelineArg.find((stage): stage is PipelineStage.Match => '$match' in stage);
      expect(matchStage).toBeUndefined();
    });
    it('should filter out search words shorter than 2 chars but keep valid ones', async () => {
      (Compositions.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));

      await compositionsRepository.getAllCompositionTitles({ search: 'a test' });

      expect(Compositions.aggregate).toHaveBeenCalled();
    });

    it('should apply yearTo condition for opus pipeline', async () => {
      (Compositions.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));

      await compositionsRepository.getAllCompositionTitles({ yearTo: 2000 });

      const opusPipelineArg = (Opus.aggregate as jest.Mock).mock.calls[0][0] as PipelineStage[];
      const matchStage = opusPipelineArg.find((stage): stage is PipelineStage.Match => '$match' in stage);
      expect(matchStage?.$match).toMatchObject({ $and: [{ releaseYear: { $lte: 2000 } }] });
    });

    it('should apply year range filter in getAllCompositions', async () => {
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp]));

      await compositionsRepository.getAllCompositions(undefined, { years: { min: 1900, max: 2000 } });

      expect(Compositions.find).toHaveBeenCalled();
    });
    it('should sort by num when prefix is equal but num differs (same rest)', async () => {
      const makeComp = (id: string, number: string) => ({
        ...mockComp,
        _id: id,
        opusId: { ...mockComp.opusId, _id: id, number }
      });

      const compsUnsorted = [
        makeComp('507f191e810c19729de860ef', 'Op. 3'),
        makeComp('507f191e810c19729de860f0', 'Op. 1')
      ];

      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain(compsUnsorted));

      const result = await compositionsRepository.getAllCompositions();

      expect(result.map((c) => c.opusId?.number)).toEqual(['Op. 1', 'Op. 3']);
    });
    it('should filter out compositions with unparsable opus number', async () => {
      const invalidComp = {
        ...mockComp,
        _id: '507f191e810c19729de860f1',
        opusId: { ...mockComp.opusId, _id: '507f191e810c19729de860f1', number: 'invalid-format' }
      };

      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp, invalidComp]));

      const result = await compositionsRepository.getAllCompositions();

      expect(result).toHaveLength(1);
      expect(result[0].opusId?.number).toBe('Op. 1');
    });

    it('should not push year condition when years filter is not provided', async () => {
      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp]));

      await compositionsRepository.getAllCompositions(undefined, {});

      expect(Compositions.find).toHaveBeenCalled();
    });

    it('should return default year range when aggregation returns no rows', async () => {
      (Compositions.aggregate as jest.Mock).mockResolvedValue([]);

      const result = await compositionsRepository.getCompositionsYearRange();

      const currentYear = new Date().getFullYear();
      expect(result).toEqual({ minYear: 1900, maxYear: currentYear });
    });

    it('should fallback to empty array when namedFilterHelper returns falsy for categories', async () => {
      const { namedFilterHelper } = jest.requireMock('~/lib/utils/searchAndFiltersHelpers');
      (namedFilterHelper as jest.Mock).mockReturnValueOnce([]).mockReturnValueOnce(null);

      (Compositions.find as jest.Mock).mockReturnValue(mockMongooseChain([mockComp]));

      await compositionsRepository.getAllCompositions(undefined, { categories: undefined });

      expect(Compositions.find).toHaveBeenCalled();
    });

    it('should use default empty filters when no arguments provided', async () => {
      (Compositions.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));
      (Opus.aggregate as jest.Mock).mockReturnValue(mockAggregateChain([]));

      const result = await compositionsRepository.getAllCompositionTitles();

      expect(result).toEqual([]);
    });
  });
});

import newCompositionsRepository from './compositions.repository';

import { CategoryDTO } from '~/domain/dto/composition.dto';
import { Category } from '~/infrastructure/models/artistry/artistryCategoriesData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
import { RawCompositionDTO, RawOpusDetailsDTO } from '~/validators/artistry/composition.schema';

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
  Opus: { find: jest.fn(), aggregate: jest.fn(), distinct: jest.fn(), findOne: jest.fn() }
}));

const mockCategory = jest.mocked(Category);
const mockOpus = jest.mocked(Opus);
const mockCompositions = jest.mocked(Compositions);

const compositionsRepository = newCompositionsRepository();

const mockMongooseChain = <T>(resolvedValue: T) =>
  ({
    select: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue(resolvedValue)
  }) as unknown as ReturnType<typeof mockCategory.find>;

const mockAggregateChain = <T>(resolvedValue: T) =>
  ({
    exec: jest.fn().mockResolvedValue(resolvedValue)
  }) as unknown as ReturnType<typeof mockOpus.aggregate>;

const validMongoId = '507f191e810c19729de860ea';

const createMockCategoryDoc = (overrides: Partial<CategoryDTO> = {}): CategoryDTO =>
  ({
    _id: validMongoId,
    key: 'test',
    name: { uk: 'назва', en: 'name' },
    title: { uk: 'заголовок', en: 'title' },
    ...overrides
  }) as CategoryDTO;

const createMockCompositionDoc = (overrides: Partial<RawCompositionDTO> = {}): RawCompositionDTO =>
  ({
    _id: validMongoId,
    name: { uk: 'назва', en: 'name' },
    audioAvailable: false,
    sheetAvailable: false,
    ...overrides
  }) as RawCompositionDTO;

const createMockOpusDoc = (overrides: Partial<RawOpusDetailsDTO> = {}): RawOpusDetailsDTO =>
  ({
    _id: validMongoId,
    title: { uk: 'Опус', en: 'Opus' },
    name: { uk: 'Опус', en: 'Opus' },
    slug: 'valid-slug',
    number: 1,
    numberKind: 'op',
    creationYear: '2020',
    status: 'published',
    compositions: [createMockCompositionDoc()],
    ...overrides
  }) as RawOpusDetailsDTO;

describe('compositionsRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCategories', () => {
    it('should retrieve all categories using mongoose chain', async () => {
      mockCategory.find.mockReturnValue(mockMongooseChain([createMockCategoryDoc()]));

      await compositionsRepository.getAllCategories();

      expect(mockCategory.find).toHaveBeenCalled();
    });
  });

  describe('getCompositionsYearRange', () => {
    it('should return default year range when aggregation returns no rows', async () => {
      mockOpus.aggregate.mockResolvedValue([]);
      mockCompositions.aggregate.mockResolvedValue([]);

      const result = await compositionsRepository.getCompositionsYearRange();

      expect(result).toEqual({ minYear: 1900, maxYear: new Date().getFullYear() });
    });

    it('should use composition years when opus aggregation is empty', async () => {
      mockOpus.aggregate.mockResolvedValue([]);
      mockCompositions.aggregate.mockResolvedValue([{ minYear: 1912, maxYear: 1976 }]);

      const result = await compositionsRepository.getCompositionsYearRange();

      expect(result).toEqual({ minYear: 1912, maxYear: 1976 });
    });

    it('should return aggregated years combining opus and composition limits', async () => {
      mockOpus.aggregate.mockResolvedValue([{ minYear: 1950, maxYear: 2000 }]);
      mockCompositions.aggregate.mockResolvedValue([{ minYear: 1912, maxYear: 1976 }]);

      const result = await compositionsRepository.getCompositionsYearRange();

      expect(result).toEqual({ minYear: 1912, maxYear: 2000 });
      expect(mockOpus.aggregate).toHaveBeenCalled();
      expect(mockCompositions.aggregate).toHaveBeenCalled();
    });
  });

  describe('getAllCompositions', () => {
    it('should return empty array if no results found', async () => {
      mockOpus.aggregate.mockReturnValue(mockAggregateChain([]));

      const result = await compositionsRepository.getAllCompositions();

      expect(result).toEqual([]);
    });

    it('should cover Category filter branch', async () => {
      mockCategory.find.mockReturnValue(mockMongooseChain([{ _id: validMongoId }]));
      mockOpus.aggregate.mockReturnValue(mockAggregateChain([createMockOpusDoc()]));

      await compositionsRepository.getAllCompositions({ categories: ['c1'] });

      expect(mockOpus.aggregate).toHaveBeenCalled();
    });

    it.each([
      { filter: 'with-opus', numberKind: 'op' },
      { filter: 'without-opus', numberKind: 'sineop' }
    ])('should filter by numberKind "$numberKind" when $filter is provided', async ({ filter, numberKind }) => {
      mockOpus.aggregate.mockReturnValue(mockAggregateChain([createMockOpusDoc()]));

      await compositionsRepository.getAllCompositions({ categories: [filter] });

      expect(mockOpus.aggregate).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            $match: expect.objectContaining({
              $and: expect.arrayContaining([{ numberKind }])
            })
          })
        ])
      );
    });

    it('should skip opus filter when both with-opus and without-opus are selected', async () => {
      mockOpus.aggregate.mockReturnValue(mockAggregateChain([createMockOpusDoc()]));

      await compositionsRepository.getAllCompositions({ categories: ['with-opus', 'without-opus'] });

      expect(mockOpus.aggregate).not.toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            $match: expect.objectContaining({
              $and: expect.arrayContaining([expect.objectContaining({ numberKind: expect.anything() })])
            })
          })
        ])
      );
    });

    it('should apply year range filter', async () => {
      mockOpus.aggregate.mockReturnValue(mockAggregateChain([createMockOpusDoc()]));

      await compositionsRepository.getAllCompositions({ years: { min: 1900, max: 2000 } });

      expect(mockOpus.aggregate).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            $match: expect.objectContaining({
              $and: expect.arrayContaining([
                expect.objectContaining({
                  $or: expect.arrayContaining([expect.objectContaining({ creationYear: expect.anything() })])
                })
              ])
            })
          })
        ])
      );
    });

    it('should not push year condition when years filter is not provided', async () => {
      mockOpus.aggregate.mockReturnValue(mockAggregateChain([createMockOpusDoc()]));

      await compositionsRepository.getAllCompositions({});

      expect(mockOpus.aggregate).toHaveBeenCalled();
    });
  });

  describe('getOpusBySlug', () => {
    it('should return null when the opus is not found', async () => {
      mockOpus.findOne.mockReturnValue(mockMongooseChain(null));

      const result = await compositionsRepository.getOpusBySlug('slug');

      expect(result).toBeNull();
      expect(mockOpus.findOne).toHaveBeenCalledWith({ slug: 'slug', status: { $ne: 'draft' } });
    });

    it('should return the opus when found', async () => {
      const opusMock = createMockOpusDoc({ slug: 'valid-slug' });
      mockOpus.findOne.mockReturnValue(mockMongooseChain(opusMock));

      const result = await compositionsRepository.getOpusBySlug('valid-slug');

      expect(result).toMatchObject({ _id: validMongoId });
    });
  });
});

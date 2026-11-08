import newResearchWorksRepo from './researchWorks.repository';
import { ResearchWorkDb } from '~/types/types/researchWorks.types';

import { ResearchWorkStatus } from '~/domain/dto/researchWorks.dto';
import dbConnect from '~/infrastructure/db/connect';
import { ResearchWorks } from '~/infrastructure/models/research-works/researchWorksTableData';
import { searchHelper } from '~/lib/utils/searchAndFiltersHelpers';
import { researchWorksSchema } from '~/validators/researchWorks.schema';

jest.mock('~/infrastructure/db/connect', () => jest.fn());

jest.mock('~/infrastructure/models/research-works/researchWorksTableData', () => ({
  ResearchWorks: {
    distinct: jest.fn(),
    aggregate: jest.fn(),
    find: jest.fn()
  }
}));

jest.mock('~/lib/utils/searchAndFiltersHelpers', () => ({
  searchHelper: jest.fn()
}));

jest.mock('~/validators/researchWorks.schema', () => ({
  researchWorksSchema: {
    parse: jest.fn()
  }
}));

describe('ResearchWorksRepository', () => {
  const repo = newResearchWorksRepo();

  const distinctMock = jest.mocked(ResearchWorks.distinct);
  const aggregateMock = jest.mocked(ResearchWorks.aggregate);
  const findMock = jest.mocked(ResearchWorks.find);

  const works: ResearchWorkDb[] = [
    {
      _id: '507f1f77bcf86cd799439011',
      bibliographicDescription: '{"type":"doc","content":[]}',
      status: ResearchWorkStatus.Published,
      year: '2020'
    }
  ];

  const mockDistinctResult = (result: string[]) => {
    distinctMock.mockReturnValue(Promise.resolve(result) as ReturnType<typeof ResearchWorks.distinct>);
  };

  const mockAggregateResult = (result: { minYear: number; maxYear: number }[]) => {
    aggregateMock.mockReturnValue(Promise.resolve(result) as ReturnType<typeof ResearchWorks.aggregate>);
  };

  const mockFindResult = (result: ResearchWorkDb[]) => {
    findMock.mockReturnValue({
      lean: jest.fn().mockResolvedValue(result)
    } as unknown as ReturnType<typeof ResearchWorks.find>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBibliographicDescriptions', () => {
    it('should return distinct descriptions with all filters applied', async () => {
      const descriptions = ['description 1', 'description 2'];
      mockDistinctResult(descriptions);
      jest.mocked(searchHelper).mockReturnValue('research-pattern');

      await repo.getAllBibliographicDescriptions({
        search: 'research',
        yearFrom: 2000,
        yearTo: 2020
      });

      expect(ResearchWorks.distinct).toHaveBeenCalledWith('bibliographicDescription', {
        $and: [
          { status: ResearchWorkStatus.Published },
          {
            bibliographicDescription: {
              $regex: 'research-pattern',
              $options: 'i'
            }
          },
          { year: { $gte: '2000', $lte: '2020' } }
        ]
      });

      expect(searchHelper).toHaveBeenCalledWith('research');
    });

    it('should apply only the lower year boundary when yearTo is missing', async () => {
      mockDistinctResult([]);

      await repo.getAllBibliographicDescriptions({
        yearFrom: 2000
      });

      expect(ResearchWorks.distinct).toHaveBeenCalledWith('bibliographicDescription', {
        $and: [{ status: ResearchWorkStatus.Published }, { year: { $gte: '2000' } }]
      });
    });

    it('should not apply search when search contains only whitespace', async () => {
      mockDistinctResult([]);

      await repo.getAllBibliographicDescriptions({
        search: '   '
      });

      expect(searchHelper).not.toHaveBeenCalled();
      expect(ResearchWorks.distinct).toHaveBeenCalledWith('bibliographicDescription', {
        $and: [{ status: ResearchWorkStatus.Published }]
      });
    });

    it('should return descriptions without additional filters', async () => {
      const descriptions = ['description 1'];
      mockDistinctResult(descriptions);

      const result = await repo.getAllBibliographicDescriptions();

      expect(result).toEqual(descriptions);
      expect(dbConnect).toHaveBeenCalledTimes(1);
      expect(ResearchWorks.distinct).toHaveBeenCalledWith('bibliographicDescription', {
        $and: [{ status: ResearchWorkStatus.Published }]
      });
    });
  });

  describe('getResearchWorksYearRange', () => {
    it('should return minimum and maximum years from aggregation', async () => {
      mockAggregateResult([{ minYear: 1990, maxYear: 2020 }]);

      const result = await repo.getResearchWorksYearRange();

      expect(result).toEqual({
        minYear: 1990,
        maxYear: 2020
      });

      expect(ResearchWorks.aggregate).toHaveBeenCalledWith([
        {
          $match: {
            status: ResearchWorkStatus.Published,
            year: { $regex: /^\d{4}$/ }
          }
        },
        {
          $addFields: {
            yearNumber: { $toInt: '$year' }
          }
        },
        {
          $group: {
            _id: null,
            minYear: { $min: '$yearNumber' },
            maxYear: { $max: '$yearNumber' }
          }
        }
      ]);
    });

    it('should return default year range when aggregation is empty', async () => {
      mockAggregateResult([]);

      const result = await repo.getResearchWorksYearRange();

      expect(result).toEqual({
        minYear: 1900,
        maxYear: new Date().getFullYear()
      });
    });
  });

  describe('getAllResearchWorks', () => {
    it('should return validated research works with all filters applied', async () => {
      mockFindResult(works);
      jest.mocked(searchHelper).mockReturnValue('research-pattern');
      jest.mocked(researchWorksSchema.parse).mockReturnValue(works);

      const result = await repo.getAllResearchWorks({
        years: [2000, 2020],
        search: 'research'
      });

      expect(result).toEqual(works);
      expect(researchWorksSchema.parse).toHaveBeenCalledWith(works);

      expect(ResearchWorks.find).toHaveBeenCalledWith({
        $and: [
          { status: ResearchWorkStatus.Published },
          {
            bibliographicDescription: {
              $regex: 'research-pattern',
              $options: 'i'
            }
          },
          { year: { $gte: '2000', $lte: '2020' } }
        ]
      });
    });

    it('should return an empty array without parsing when no works are found', async () => {
      mockFindResult([]);

      const result = await repo.getAllResearchWorks({});

      expect(result).toEqual([]);
      expect(researchWorksSchema.parse).not.toHaveBeenCalled();
    });

    it('should not apply optional filters when they are missing', async () => {
      mockFindResult(works);
      jest.mocked(researchWorksSchema.parse).mockReturnValue(works);

      await repo.getAllResearchWorks({});

      expect(ResearchWorks.find).toHaveBeenCalledWith({
        $and: [{ status: ResearchWorkStatus.Published }]
      });

      expect(searchHelper).not.toHaveBeenCalled();
    });
  });
});

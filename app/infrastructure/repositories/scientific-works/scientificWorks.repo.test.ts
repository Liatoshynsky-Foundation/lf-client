import newScientificWorksRepo from './scientificWorks.repository';

import { ScientificWorksAuthor } from '~/infrastructure/models/scientific-works/scientificWorksAuthor';
import { ScientificWorks } from '~/infrastructure/models/scientific-works/scientificWorksTableData';

jest.mock('~/infrastructure/db/connect', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('~/infrastructure/models/scientific-works/scientificWorksAuthor', () => ({
  ScientificWorksAuthor: {
    find: jest.fn()
  }
}));

jest.mock('~/infrastructure/models/scientific-works/scientificWorksTableData', () => ({
  ScientificWorks: {
    find: jest.fn(),
    aggregate: jest.fn()
  }
}));

const repo = newScientificWorksRepo();

let counterB = 1;
const createFakeId = () => {
  const id = '507f191e';
  const suffix = (counterB++).toString(16).padStart(16, '0');
  return id + suffix;
};

const mockMongooseChain = (resolvedValue: any) => {
  const chain: any = {
    sort: jest.fn(() => chain),
    select: jest.fn(() => chain),
    populate: jest.fn(() => chain),
    lean: jest.fn().mockResolvedValue(resolvedValue)
  };
  return chain;
};

describe('scientificWorksRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAuthors', () => {
    it('should call select when fields are provided (covers lines 19-21)', async () => {
      const mockChain = mockMongooseChain([]);
      (ScientificWorksAuthor.find as jest.Mock).mockReturnValue(mockChain);

      await repo.getAllAuthors(['name', 'surname']);

      expect(mockChain.select).toHaveBeenCalledWith('name surname');
    });

    it('should return parsed authors via Zod', async () => {
      const mockAuthors = [{ _id: createFakeId(), name: { uk: 'І', en: 'I' }, surname: { uk: 'К', en: 'K' } }];
      (ScientificWorksAuthor.find as jest.Mock).mockReturnValue(mockMongooseChain(mockAuthors));

      const result = await repo.getAllAuthors();
      expect(result).toEqual(mockAuthors);
    });
  });
  describe('Coverage specialized tests (Authors and Branches)', () => {
    it('should cover all branches of author?.length in getAllScientificTitles', async () => {
      (ScientificWorks.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });

      await repo.getAllScientificTitles({ author: undefined });

      await repo.getAllScientificTitles({ author: [] });

      await repo.getAllScientificTitles({ author: [createFakeId()] });

      expect(ScientificWorks.find).toHaveBeenCalledTimes(3);
    });

    it('should cover all branches of author?.length in getAllScientificWorks', async () => {
      (ScientificWorks.find as jest.Mock).mockReturnValue(mockMongooseChain([]));

      await repo.getAllScientificWorks({ author: undefined });
      await repo.getAllScientificWorks({ author: [] });
      await repo.getAllScientificWorks({ author: [createFakeId()] });

      expect(ScientificWorks.find).toHaveBeenCalled();
    });
  });
  describe('getAllScientificTitles', () => {
    beforeEach(() => {
      (ScientificWorks.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
    });

    it('should handle zero filters (covers query = {} branch)', async () => {
      await repo.getAllScientificTitles({});
      const queryArg = (ScientificWorks.find as jest.Mock).mock.calls[0][0];
      expect(queryArg).toEqual({});
    });

    it('should handle EXACTLY ONE filter (covers conditions.length === 1 branch)', async () => {
      await repo.getAllScientificTitles({ search: 'only-search' });
      const queryArg = (ScientificWorks.find as jest.Mock).mock.calls[0][0];

      expect(queryArg.$and).toHaveLength(1);
    });

    it('should handle author filter with empty array (covers optional chaining branch)', async () => {
      await repo.getAllScientificTitles({ author: [] });
      const queryArg = (ScientificWorks.find as jest.Mock).mock.calls[0][0];
      expect(queryArg).toEqual({});
    });

    it('should handle complex filters (search + author + years)', async () => {
      await repo.getAllScientificTitles({
        search: 'test',
        author: [createFakeId()],
        yearFrom: 1990,
        yearTo: 2020
      });
      const queryArg = (ScientificWorks.find as jest.Mock).mock.calls[0][0];
      expect(queryArg.$and).toHaveLength(3);
    });
  });

  describe('getScientificWorksYearRange', () => {
    it('should return range or defaults', async () => {
      (ScientificWorks.aggregate as jest.Mock).mockResolvedValueOnce([{ minYear: 1950, maxYear: 2020 }]);
      const res1 = await repo.getScientificWorksYearRange();
      expect(res1).toEqual({ minYear: 1950, maxYear: 2020 });

      (ScientificWorks.aggregate as jest.Mock).mockResolvedValueOnce([]);
      const res2 = await repo.getScientificWorksYearRange();
      expect(res2.minYear).toBe(1900);
    });
  });

  describe('getAllScientificWorks', () => {
    const mockWork = {
      _id: createFakeId(),
      title: { uk: 'A', en: 'A' },
      authors: [],
      startYear: 2000,
      endYear: null,
      url: 'https://link.com',
      isPreview: false
    };

    it('should handle empty filters (covers lines 99-100 else)', async () => {
      (ScientificWorks.find as jest.Mock).mockReturnValue(mockMongooseChain([mockWork]));
      await repo.getAllScientificWorks({});
      const queryArg = (ScientificWorks.find as jest.Mock).mock.calls[0][0];
      expect(queryArg).toEqual({});
    });

    it('should handle single condition', async () => {
      (ScientificWorks.find as jest.Mock).mockReturnValue(mockMongooseChain([mockWork]));
      await repo.getAllScientificWorks({ search: 'test' });
      const queryArg = (ScientificWorks.find as jest.Mock).mock.calls[0][0];
      expect(queryArg.$or).toBeDefined();
    });

    it('should handle multiple conditions', async () => {
      (ScientificWorks.find as jest.Mock).mockReturnValue(mockMongooseChain([mockWork]));
      await repo.getAllScientificWorks({ search: 'test', years: [1990, 2020] });
      const queryArg = (ScientificWorks.find as jest.Mock).mock.calls[0][0];
      expect(queryArg.$and).toBeDefined();
    });

    it('should return [] if works is empty (covers line 107)', async () => {
      (ScientificWorks.find as jest.Mock).mockReturnValue(mockMongooseChain([]));
      const result = await repo.getAllScientificWorks({});
      expect(result).toEqual([]);
    });
  });
});

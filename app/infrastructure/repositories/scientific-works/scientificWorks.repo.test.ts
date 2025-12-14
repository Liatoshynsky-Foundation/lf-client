import newScientificWorksRepo from './scientificWorks.repository';

import { ScientificWorksAuthor } from '~/infrastructure/models/scientific-works/scientificWorksAuthor';
import { ScientificWorks } from '~/infrastructure/models/scientific-works/scientificWorksTableData';

jest.mock('~/infrastructure/db/connect', () => jest.fn());
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

describe('scientificWorksRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return parsed authors', async () => {
    const mockAuthors = [
      {
        _id: '507f191e810c19729de860ea',
        name: { uk: 'Іван', en: 'Ivan' },
        surname: { uk: 'Коваль', en: 'Koval' }
      }
    ];

    (ScientificWorksAuthor.find as any).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockAuthors)
    });

    const result = await repo.getAllAuthors();

    expect(result).toEqual(mockAuthors);
    expect(ScientificWorksAuthor.find).toHaveBeenCalledTimes(1);
  });

  it('should return parsed titles', async () => {
    const mockTitles = [
      {
        _id: '507f1f77bcf86cd799439011',
        title: { uk: 'Назва', en: 'Title' }
      }
    ];

    (ScientificWorks.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockTitles)
    });

    const result = await repo.getAllScientificTitles();

    expect(result).toEqual(mockTitles);
  });

  it('should return year range from aggregate', async () => {
    (ScientificWorks.aggregate as any).mockResolvedValue([{ minYear: 1950, maxYear: 2020 }]);

    const result = await repo.getScientificWorksYearRange();

    expect(result).toEqual({ minYear: 1950, maxYear: 2020 });
  });

  it('should fall back to defaults when no rows returned', async () => {
    (ScientificWorks.aggregate as any).mockResolvedValue([]);

    const result = await repo.getScientificWorksYearRange();

    expect(result.minYear).toBe(1900);
    expect(result.maxYear).toBe(new Date().getFullYear());
  });

  it('should correctly build search query', async () => {
    const parsed = {
      _id: '507f1f77bcf86cd799439011',
      title: { uk: 'A', en: 'A' },
      authors: [
        {
          _id: '507f191e810c19729de860ea',
          name: { uk: 'Іван', en: 'Ivan' },
          surname: { uk: 'Коваль', en: 'Koval' }
        }
      ],
      startYear: 2000,
      endYear: null,
      url: null,
      isPreview: false
    };

    (ScientificWorks.find as any).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue([parsed])
      })
    });

    const result = await repo.getAllScientificWorks({
      search: 'abc'
    });

    expect(result).toHaveLength(1);
    expect(ScientificWorks.find).toHaveBeenCalled();

    const queryArg = (ScientificWorks.find as jest.Mock).mock.calls[0][0];

    expect(queryArg).toMatchObject({
      $or: [{ 'title.uk': expect.any(Object) }, { 'title.en': expect.any(Object) }]
    });
  });

  it('should apply author and years filters', async () => {
    const parsed = {
      _id: '507f191e810c19729de860ea',
      title: { uk: 'A', en: 'A' },
      authors: [],
      startYear: 2000,
      endYear: null,
      url: null,
      isPreview: false
    };

    (ScientificWorks.find as any).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue([parsed])
      })
    });

    await repo.getAllScientificWorks({
      author: ['id1', 'id2'],
      years: [1990, 2020]
    });

    const queryArg = (ScientificWorks.find as jest.Mock).mock.calls[0][0];

    expect(queryArg).toMatchObject({
      $and: [{ authors: { $in: ['id1', 'id2'] } }, { startYear: { $gte: 1990, $lte: 2020 } }]
    });
  });

  it('should return [] when no works found', async () => {
    (ScientificWorks.find as any).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue([])
      })
    });

    const result = await repo.getAllScientificWorks({});

    expect(result).toEqual([]);
  });
});

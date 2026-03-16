import { Locale } from 'next-intl';

import { createScientificWorksService } from './scientificWorks';
import { WorkTableFilters } from '~/types/types/tableFilters.types';

import { ScientificWorksRepository } from '~/infrastructure/repositories/scientific-works/scientificWorks.repo';

describe('scientificWorksService', () => {
  const repoMock = {
    getAllAuthors: jest.fn(),
    getAllScientificTitles: jest.fn(),
    getScientificWorksYearRange: jest.fn(),
    getAllScientificWorks: jest.fn()
  } as unknown as jest.Mocked<ScientificWorksRepository>;

  const service = createScientificWorksService({ scientificWorksRepo: repoMock });

  const validId = '507f191e810c19729de860ea';
  const authorId = '507f191e810c19729de860eb';

  // Исправлено: author — это string[], а не string
  const defaultFilters: WorkTableFilters = {
    search: '',
    author: [],
    yearFrom: null,
    yearTo: null
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAuthors', () => {
    it('should return normalized and localized authors', async () => {
      const mockAuthors = [
        {
          _id: { toString: () => validId },
          name: { uk: 'Иван', en: 'Ivan' },
          surname: { uk: 'Франко', en: 'Franko' }
        }
      ];
      repoMock.getAllAuthors.mockResolvedValue(mockAuthors as any);

      const result = await service.getAllAuthors('uk' as Locale);

      expect(result[0]).toEqual({
        key: validId,
        name: 'Франко Иван'
      });
    });
  });

  describe('getAllScientificWorks', () => {
    const baseWork = {
      _id: { toString: () => validId },
      title: { uk: 'Работа', en: 'Work' },
      authors: [
        {
          _id: authorId,
          name: { uk: 'А', en: 'A' },
          surname: { uk: 'Б', en: 'B' }
        }
      ],
      startYear: 2020,
      url: 'http://test.com',
      isPreview: false,
      endYear: null
    };

    it('should handle year range (startYear-endYear)', async () => {
      repoMock.getAllScientificWorks.mockResolvedValue([{ ...baseWork, endYear: 2022 }] as any);

      const filters = { ...defaultFilters, yearFrom: 2020, yearTo: 2022 };
      const result = await service.getAllScientificWorks('en' as Locale, filters);

      expect(result[0].year).toBe('2020-2022');
      expect(result[0].author).toBe('B A');
    });

    it('should handle single year and cover branch without endYear', async () => {
      repoMock.getAllScientificWorks.mockResolvedValue([baseWork] as any);

      const result = await service.getAllScientificWorks('uk' as Locale, defaultFilters);

      expect(result[0].year).toBe('2020');
      expect(result[0].id).toBe(validId);
    });

    it('should set years to undefined if range is incomplete (branch coverage)', async () => {
      repoMock.getAllScientificWorks.mockResolvedValue([]);

      const incompleteFilters = { ...defaultFilters, yearFrom: 2020, yearTo: null };
      await service.getAllScientificWorks('uk' as Locale, incompleteFilters);

      expect(repoMock.getAllScientificWorks).toHaveBeenCalledWith(
        expect.objectContaining({
          years: undefined
        })
      );
    });
  });

  describe('Utility methods', () => {
    it('getScientificWorksYearRange should return value from repo', async () => {
      const mockRange = { min: 1990, max: 2025 };
      repoMock.getScientificWorksYearRange.mockResolvedValue(mockRange as any);

      const result = await service.getScientificWorksYearRange();
      expect(result).toEqual(mockRange);
    });

    it('getAllScientificTitles should call repo with filters', async () => {
      repoMock.getAllScientificTitles.mockResolvedValue([] as any);
      await service.getAllScientificTitles('en' as Locale, defaultFilters);
      expect(repoMock.getAllScientificTitles).toHaveBeenCalledWith(defaultFilters);
    });
  });
});

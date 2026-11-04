import { createResearchWorksService } from './researchWorks';
import { WorkTableFilters } from '~/types/types/tableFilters.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { ResearchWorkStatus } from '~/domain/dto/researchWorks.dto';
import { ResearchWorksRepository } from '~/infrastructure/repositories/research-works/researchWorks.repo';
import { extractTextFromTipTap, parseTipTapString } from '~/lib/utils/tiptapHelpers';

jest.mock('~/lib/utils/tiptapHelpers', () => ({
  extractTextFromTipTap: jest.fn(),
  parseTipTapString: jest.fn()
}));

describe('createResearchWorksService', () => {
  const researchWorksRepo = {
    getAllAuthors: jest.fn(),
    getAllBibliographicDescriptions: jest.fn(),
    getResearchWorksYearRange: jest.fn(),
    getAllResearchWorks: jest.fn()
  } as jest.Mocked<ResearchWorksRepository>;

  const service = createResearchWorksService({ researchWorksRepo });

  const tipTapDoc = {
    type: 'doc',
    content: []
  } as TipTapDoc;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAuthors', () => {
    it('should return normalized authors', async () => {
      const authors = ['{"type":"doc","content":[]}'];
      researchWorksRepo.getAllAuthors.mockResolvedValue(authors);
      (parseTipTapString as jest.Mock).mockReturnValue(tipTapDoc);
      (extractTextFromTipTap as jest.Mock).mockReturnValue('John Doe');
      const result = await service.getAllAuthors();

      expect(result).toEqual([
        {
          key: authors[0],
          name: 'John Doe'
        }
      ]);
      expect(researchWorksRepo.getAllAuthors).toHaveBeenCalledTimes(1);
      expect(parseTipTapString).toHaveBeenCalledWith(authors[0]);
      expect(extractTextFromTipTap).toHaveBeenCalledWith(tipTapDoc);
    });
  });

  describe('getAllBibliographicDescriptions', () => {
    it('should return normalized bibliographic descriptions', async () => {
      const descriptions = ['{"type":"doc","content":[]}'];
      const filters: WorkTableFilters = {
        search: 'research',
        author: ['John Doe'],
        yearFrom: 2000,
        yearTo: 2020
      };
      researchWorksRepo.getAllBibliographicDescriptions.mockResolvedValue(descriptions);
      (parseTipTapString as jest.Mock).mockReturnValue(tipTapDoc);
      (extractTextFromTipTap as jest.Mock).mockReturnValue('Research description');
      const result = await service.getAllBibliographicDescriptions(filters);

      expect(result).toEqual([
        {
          _id: descriptions[0],
          description: 'Research description'
        }
      ]);
      expect(researchWorksRepo.getAllBibliographicDescriptions).toHaveBeenCalledWith(filters);
      expect(parseTipTapString).toHaveBeenCalledWith(descriptions[0]);
      expect(extractTextFromTipTap).toHaveBeenCalledWith(tipTapDoc);
    });
  });

  describe('getResearchWorksYearRange', () => {
    it('should return year range from repository', async () => {
      const yearRange = {
        minYear: 1990,
        maxYear: 2020
      };
      researchWorksRepo.getResearchWorksYearRange.mockResolvedValue(yearRange);
      const result = await service.getResearchWorksYearRange();

      expect(result).toEqual(yearRange);
      expect(researchWorksRepo.getResearchWorksYearRange).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllResearchWorks', () => {
    const filters: WorkTableFilters = {
      search: 'research',
      author: ['John Doe'],
      yearFrom: 2000,
      yearTo: 2020
    };

    const researchWork = {
      _id: '507f1f77bcf86cd799439011',
      bibliographicDescription: '{"type":"doc","content":[]}',
      author: '{"type":"doc","content":[]}',
      status: ResearchWorkStatus.Published,
      year: '2020',
      url: 'https://example.com/research',
      pdfFile: {
        filename: 'research.pdf',
        url: 'https://example.com/research.pdf',
        mimeType: 'application/pdf'
      }
    };
    it('should return mapped research works', async () => {
      researchWorksRepo.getAllResearchWorks.mockResolvedValue([researchWork]);
      const result = await service.getAllResearchWorks(filters);

      expect(result).toEqual([
        {
          id: '507f1f77bcf86cd799439011',
          name: JSON.parse(researchWork.bibliographicDescription),
          author: JSON.parse(researchWork.author),
          sortableYear: 2020,
          year: '2020',
          url: 'https://example.com/research',
          pdfFile: researchWork.pdfFile
        }
      ]);
    });

    it('should pass filters with year range to repository', async () => {
      researchWorksRepo.getAllResearchWorks.mockResolvedValue([]);
      await service.getAllResearchWorks(filters);

      expect(researchWorksRepo.getAllResearchWorks).toHaveBeenCalledWith({
        author: filters.author,
        years: [2000, 2020],
        search: filters.search
      });
    });

    it('should pass undefined years when one of the year boundaries is missing', async () => {
      researchWorksRepo.getAllResearchWorks.mockResolvedValue([]);
      await service.getAllResearchWorks({
        ...filters,
        yearTo: null
      });

      expect(researchWorksRepo.getAllResearchWorks).toHaveBeenCalledWith({
        author: filters.author,
        years: undefined,
        search: filters.search
      });
    });
  });
});

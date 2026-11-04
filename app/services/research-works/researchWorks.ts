import { WorkTableFilters } from '~/types/types/tableFilters.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { ResearchWorksRepository } from '~/infrastructure/repositories/research-works/researchWorks.repo';
import { extractTextFromTipTap, parseTipTapString } from '~/lib/utils/tiptapHelpers';

export const createResearchWorksService = ({ researchWorksRepo }: { researchWorksRepo: ResearchWorksRepository }) => ({
  async getAllAuthors() {
    const authors = await researchWorksRepo.getAllAuthors();

    const normalized = authors.map((author) => ({
      key: author,
      name: extractTextFromTipTap(parseTipTapString(author))
    }));

    return normalized;
  },

  async getAllBibliographicDescriptions(filters: WorkTableFilters) {
    const descriptions = await researchWorksRepo.getAllBibliographicDescriptions(filters);

    return descriptions.map((description) => ({
      _id: description,
      description: extractTextFromTipTap(parseTipTapString(description))
    }));
  },

  async getResearchWorksYearRange() {
    return researchWorksRepo.getResearchWorksYearRange();
  },

  async getAllResearchWorks(filters: WorkTableFilters) {
    const { author, yearFrom, yearTo, search } = filters;

    const years: [number, number] | undefined = yearFrom != null && yearTo != null ? [yearFrom, yearTo] : undefined;

    const works = await researchWorksRepo.getAllResearchWorks({
      author,
      years,
      search
    });

    return works.map((work) => ({
      id: work._id.toString(),
      name: JSON.parse(work.bibliographicDescription) as TipTapDoc,
      author: JSON.parse(work.author) as TipTapDoc,
      sortableYear: Number(work.year),
      year: work.year,
      url: work.url ?? null,
      pdfFile: work.pdfFile ?? null
    }));
  }
});

import { WorkTableFilters } from '~/types/types/tableFilters.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { ResearchWorksRepository } from '~/infrastructure/repositories/research-works/researchWorks.repo';
import { createTipTapDocFromText, extractTextFromTipTap, parseTipTapString } from '~/lib/utils/tiptapHelpers';

const parseResearchWorkContent = (value: string): TipTapDoc => {
  const parsed = parseTipTapString(value);
  if (typeof parsed === 'string') {
    return createTipTapDocFromText(parsed);
  }

  if (Array.isArray(parsed)) {
    return createTipTapDocFromText(parsed.map(({ text }) => text).join('\n'));
  }
  return parsed;
};

export const createResearchWorksService = ({ researchWorksRepo }: { researchWorksRepo: ResearchWorksRepository }) => ({
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
    const { yearFrom, yearTo, search } = filters;

    const years: [number, number] | undefined = yearFrom != null && yearTo != null ? [yearFrom, yearTo] : undefined;

    const works = await researchWorksRepo.getAllResearchWorks({
      years,
      search
    });

    return works.map((work) => ({
      id: work._id.toString(),
      name: parseResearchWorkContent(work.bibliographicDescription),
      sortableYear: Number(work.year),
      year: work.year,
      url: work.url ?? null,
      pdfFile: work.pdfFile ?? null
    }));
  }
});

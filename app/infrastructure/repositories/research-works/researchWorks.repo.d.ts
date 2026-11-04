import { ResearchWorkDb } from '~/types/types/researchWorks.types';
import { ResearchWorksDescriptionFilters } from '~/types/types/tableFilters.types';

export type YearRange = { minYear: number; maxYear: number };

export interface ResearchWorksRepository {
  getAllAuthors(): Promise<string[]>;
  getAllBibliographicDescriptions(filters: ResearchWorksDescriptionFilters): Promise<string[]>;
  getResearchWorksYearRange(): Promise<YearRange>;
  getAllResearchWorks(params: {
    years?: [number, number];
    author?: string[];
    search?: string;
  }): Promise<ResearchWorkDb[]>;
}

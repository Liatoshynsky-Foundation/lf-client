import { ResearchWorkDb } from '~/types/types/researchWorks.types';
import { ResearchWorksDescriptionFilters } from '~/types/types/tableFilters.types';

export type YearRange = { minYear: number; maxYear: number };

export interface ResearchWorksRepository {
  getAllBibliographicDescriptions(filters: ResearchWorksDescriptionFilters): Promise<string[]>;
  getResearchWorksYearRange(): Promise<YearRange>;
  getAllResearchWorks(params: { years?: [number, number]; search?: string }): Promise<ResearchWorkDb[]>;
}

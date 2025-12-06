import { AuthorDb, ScientificWorkDb, ScientificWorkTitleDb } from '~/types/types/scientificWorks.types';

export type YearRange = { minYear: number; maxYear: number };

export interface ScientificWorksRepository {
  getAllAuthors(fields?: string[]): Promise<AuthorDb[]>;
  getAllScientificTitles(): Promise<ScientificWorkTitleDb[]>;
  getScientificWorksYearRange(): Promise<YearRange>;
  getAllScientificWorks(params: {
    years?: [number, number];
    author?: string[];
    search?: string;
  }): Promise<ScientificWorkDb[]>;
}

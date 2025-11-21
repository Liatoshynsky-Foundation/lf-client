import { AuthorDTO, ScientificWorkDTO } from '~/domain/dto/scientificWorks.dto';

export type YearRange = { minYear: number; maxYear: number };

export interface ScientificWorksRepository {
  getAllAuthors(): Promise<AuthorDTO[]>;
  getAllScientificTitles(locale: string): Promise<{ _id: string; title: string }[]>;
  getScientificWorksYearRange(): Promise<YearRange>;
  getAllScientificWorks(params: {
    years?: number[];
    authorIds?: string[];
    search?: string;
    locale: string;
  }): Promise<ScientificWorkDTO[]>;
}

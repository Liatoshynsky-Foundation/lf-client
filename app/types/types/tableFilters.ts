import { CategoryNameDTO, GenreNameDTO, TitlesDTO } from '~/domain/dto/table.dto';

export type WorkTableFilters = {
  search: string;
  authorIds: string[];
  yearFrom: number | null;
  yearTo: number | null;
};

export type ScientificFiltersType = {
  titles: { _id: string; title: string }[];
  authors: { key: string; name: string }[];
  yearRange: { minYear: number; maxYear: number };
};

export type CompositionsFiltersType = {
  titles?: TitlesDTO[];
  genres?: GenreNameDTO[];
  categories?: CategoryNameDTO[];
  yearRange?: { minYear?: number; maxYear?: number };
};

export type CompositionsFilters = {
  search: string;
  genre?: string[];
  category?: string[];
  yearFrom?: number | null;
  yearTo?: number | null;
};

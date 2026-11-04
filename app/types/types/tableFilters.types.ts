import { CategoryNameDTO, TitlesDTO } from '~/domain/dto/table.dto';

export type WorkTableFilters = {
  search: string;
  author: string[];
  yearFrom: number | null;
  yearTo: number | null;
};

export type ResearchFiltersType = {
  bibliographicDescriptions: { _id: string; description: string }[];
  authors: { key: string; name: string }[];
  yearRange: { minYear: number; maxYear: number };
};

export type CompositionsFiltersType = {
  titles?: TitlesDTO[];
  categories?: CategoryNameDTO[];
  yearRange?: { minYear?: number; maxYear?: number };
};

export type CompositionsFilters = {
  search: string;
  category?: string[];
  yearFrom?: number | null;
  yearTo?: number | null;
};

export type CompositionsTitleFilters = Partial<CompositionsFilters>;
export type ResearchWorksDescriptionFilters = Partial<WorkTableFilters>;

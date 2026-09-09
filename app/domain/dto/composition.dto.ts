import { CompositionDetailsSlice, CompositionItem, Opus, OpusGalleryItem } from '../entities/artistry.entity';

export type CategoryDTO = {
  key: string;
  name: string;
};

export type CompositionQueryFilters = {
  categories?: string[];
  years?: { min?: number; max?: number };
};

type AutocompleteVariants = 'composition' | 'genre' | 'opus';

export interface SearchAutocompleteDTO {
  _id: string;
  name: string;
  type?: AutocompleteVariants;
}

export type OpusListDTO = Pick<Opus, 'title' | 'slug' | 'description' | 'name' | 'genre' | '_id' | 'sheetMusic'> & {
  number: string;
  year: string;
  compositions?: CompositionItem[] | null;
  youtubeUrl?: string | null;
};

export type OpusDetailsDTO = Omit<Opus, 'number' | 'numberKind' | 'additionalText' | 'creationYear' | 'endYear'> & {
  number: string;
  year: string;
  compositions?: CompositionDetailsSlice[] | null;
  gallery?: OpusGalleryItem[];
};

export interface YearRangeDTO {
  min: number;
  max: number;
}

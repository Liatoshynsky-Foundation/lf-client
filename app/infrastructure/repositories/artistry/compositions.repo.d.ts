import type { CompositionQueryFilters, RawOpusDetailsDTO, RawOpusListItemDTO } from '~/domain/dto/composition.dto';
import { RawYearRangeDTO } from '~/validators/artistry/composition.schema';
import { RawCategoryDTO } from '~/validators/constants';

export interface CompositionRepository {
  getAllCategories(): Promise<RawCategoryDTO[]>;
  getCompositionsYearRange(): Promise<RawYearRangeDTO>;
  getAllCompositions(filters?: CompositionQueryFilters): Promise<RawOpusListItemDTO[]>;
  getOpusBySlug(slug: string): Promise<RawOpusDetailsDTO | null>;
}

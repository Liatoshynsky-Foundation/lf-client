import { Locale } from 'next-intl';

import { CompositionsTitleFilters } from '~/types/types/tableFilters.types';

import { CompositionRepository } from '~/infrastructure/repositories/artistry/compositions.repo';
import {
  compositionSchema,
  compositionsYearRangeSchema,
  compositionTableReadySchema,
  compositionTitlesSchema
} from '~/validators/artistry/composition.schema';
import { namedFilterSchema } from '~/validators/artistry/namedFilter.schema';
import { ArraySchema, LocalizeSchema, NoIDSchema } from '~/validators/constants';

type ArtistryServiceDeps = {
  compositionsRepo: CompositionRepository;
};

export const createArtistryService = ({ compositionsRepo }: ArtistryServiceDeps) => ({
  async getAllGenres(locale: Locale) {
    const genres = await compositionsRepo.getAllGenres();
    return ArraySchema(LocalizeSchema(NoIDSchema(namedFilterSchema), locale)).parse(genres);
  },

  async getAllCategories(locale: Locale) {
    const categories = await compositionsRepo.getAllCategories();
    return ArraySchema(LocalizeSchema(NoIDSchema(namedFilterSchema), locale)).parse(categories);
  },

  async getAllCompositions(
    locale: Locale,
    search?: string,
    filters?: { opuses?: Array<string | number>; genres?: string[]; years?: { min?: number; max?: number } }
  ) {
    const allSongs = await compositionsRepo.getAllCompositions(search, filters);
    if (!allSongs) return [];

    return ArraySchema(compositionTableReadySchema(LocalizeSchema(compositionSchema, locale))).parse(allSongs);
  },

  async getAllCompositionTitles(locale: Locale, filters: CompositionsTitleFilters = {}) {
    const titles = await compositionsRepo.getAllCompositionTitles(filters);
    if (!titles) return [];
    return ArraySchema(LocalizeSchema(compositionTitlesSchema, locale)).parse(titles);
  },

  async getCompositionsYearRange() {
    const range = await compositionsRepo.getCompositionsYearRange();
    return compositionsYearRangeSchema.parse(range);
  }
});

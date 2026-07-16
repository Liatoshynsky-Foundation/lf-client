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
import { ArraySchema, NoIDSchema } from '~/validators/constants';
import { LocalizeSchema } from '~/validators/localization';

type ArtistryServiceDeps = {
  compositionsRepo: CompositionRepository;
};

export const createArtistryService = ({ compositionsRepo }: ArtistryServiceDeps) => ({
  async getAllGenres() {
    return [];
  },

  async getAllCategories(locale: Locale) {
    const categories = await compositionsRepo.getAllCategories();
    return ArraySchema(LocalizeSchema(NoIDSchema(namedFilterSchema), locale)).parse(categories);
  },

  async getAllCompositions(
    locale: Locale,
    search?: string,
    filters?: { categories?: string[]; years?: { min?: number; max?: number } }
  ) {
    const allSongs = await compositionsRepo.getAllCompositions(search, filters);
    if (!allSongs) return [];

    return ArraySchema(compositionTableReadySchema(LocalizeSchema(compositionSchema, locale))).parse(allSongs);
  },

  async getAllCompositionTitles(locale: Locale, filters: CompositionsTitleFilters = {}) {
    const titles = await compositionsRepo.getAllCompositionTitles(filters);
    if (!titles) return [];

    const localizedTitles = ArraySchema(LocalizeSchema(compositionTitlesSchema, locale)).parse(titles);

    const genres = await compositionsRepo.getAllGenres();
    const genreOptions = genres.map((genre, index) => ({
      _id: `genre-${index}`,
      title: genre,
      kind: 'genre' as const
    }));

    return [...localizedTitles, ...genreOptions];
  },

  async getCompositionsYearRange() {
    const range = await compositionsRepo.getCompositionsYearRange();
    return compositionsYearRangeSchema.parse(range);
  }
});

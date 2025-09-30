import { Locale } from 'next-intl';

import { ArtistryServiceDeps } from '~/domain/services/artistry.type';
import {
  compositionSchema,
  compositionTableReadySchema,
  compositionTitlesSchema,
  parseCompositionsYearRange
} from '~/validators/artistry/composition.schema';
import { namedFilterSchema } from '~/validators/artistry/namedFilter.schema';
import { ArraySchema, LocalizeSchema } from '~/validators/constants';

export const createArtistryService = ({ compositionService }: ArtistryServiceDeps) => ({
  async getAllGenres(locale: Locale) {
    const genres = await compositionService.getAllGenres();
    return ArraySchema(LocalizeSchema(namedFilterSchema, locale)).parse(genres);
  },

  async getAllCategories(locale: Locale) {
    const categories = await compositionService.getAllCategories();
    return ArraySchema(LocalizeSchema(namedFilterSchema, locale)).parse(categories);
  },

  async getAllCompositions(
    locale: Locale,
    search?: string,
    filters?: { opuses?: Array<string | number>; genres?: string[]; years?: { min?: number; max?: number } }
  ) {
    const allSongs = await compositionService.getAllCompositions(search, filters);
    if (!allSongs) return [];

    return ArraySchema(compositionTableReadySchema(LocalizeSchema(compositionSchema, locale))).parse(allSongs);
  },

  async getAllCompositionTitles(locale: Locale) {
    const allTitles = await compositionService.getAllCompositionTitles();
    if (!allTitles) return [];

    return LocalizeSchema(compositionTitlesSchema, locale).parse(allTitles);
  },

  async getCompositionsYearRange() {
    const range = await compositionService.getCompositionsYearRange();
    return parseCompositionsYearRange(range);
  }
});

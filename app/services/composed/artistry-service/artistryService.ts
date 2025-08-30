import { Locale } from 'next-intl';

import { ArtistryServiceDeps } from '~/domain/services/artistry.type';
import {
  createLocalizedCompositionsArraySchema,
  createLocalizedCompositionTitlesSchemaArray,
  parseCompositionsYearRange
} from '~/validators/artistry/composition.schema';
import { createLocalizedGenresArraySchema } from '~/validators/artistry/genre.schema';

export const createArtistryService = ({ compositionService }: ArtistryServiceDeps) => ({
  async getAllGenres(locale: Locale) {
    const genres = await compositionService.getAllGenres();
    return createLocalizedGenresArraySchema(locale).parse(genres);
  },
  async getAllCompositions(
    locale: Locale,
    search?: string,
    filters?: { opuses?: Array<string | number>; genres?: string[]; years?: { min?: number; max?: number } }
  ) {
    const allSongs = await compositionService.getAllCompositions(search, filters);
    if (!allSongs) return [];
    return createLocalizedCompositionsArraySchema(locale).parse(allSongs);
  },

  async getAllCompositionTitles(locale: Locale) {
    const allTitles = await compositionService.getAllCompositionTitles();
    if (!allTitles) return [];
    return createLocalizedCompositionTitlesSchemaArray(locale).parse(allTitles);
  },

  async getCompositionsYearRange() {
    const range = await compositionService.getCompositionsYearRange();
    return parseCompositionsYearRange(range);
  }
});

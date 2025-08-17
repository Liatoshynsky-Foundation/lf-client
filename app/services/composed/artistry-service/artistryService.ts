import { Locale } from 'next-intl';

import { ArtistryServiceDeps } from '~/domain/services/artistry.type';
import {
  createLocalizedCompositionsArraySchema,
  createLocalizedCompositionTitlesSchema,
  createLocalizedCompositionTitlesSchemaArray
} from '~/validators/artistry/composition.schema';
import { createLocalizedGenresArraySchema } from '~/validators/artistry/genre.schema';

export const createArtistryService = ({ compositionService }: ArtistryServiceDeps) => ({
  async getAllGenres(locale: Locale) {
    const genres = await compositionService.getAllGenres();

    return createLocalizedGenresArraySchema(locale).parse(genres);
  },
  async getAllCompositions(locale: Locale, filter: string) {
    const allSongs = await compositionService.getAllCompositions(filter);
    console.log(allSongs);
    //if (!allSongs) return [];
    return allSongs;
    //createLocalizedCompositionsArraySchema(locale).parse(allSongs);
  },
  async getAllTitles(locale: Locale) {
    const allTitles = await compositionService.getAllTitles();

    if (!allTitles) return [];

    return createLocalizedCompositionTitlesSchemaArray(locale).parse(allTitles);
  }
});

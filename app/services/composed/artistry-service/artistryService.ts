import { Locale } from 'next-intl';

import { ArtistryServiceDeps } from '~/domain/services/artistry.type';
import {
  createLocalizedCompositionsArraySchema,
<<<<<<< HEAD
  createLocalizedСompositionTitlesArraySchema
=======
  createLocalizedCompositionTitlesSchema,
  createLocalizedCompositionTitlesSchemaArray
>>>>>>> f785588 (commiting before switching to anotherworking branch)
} from '~/validators/artistry/composition.schema';
import { createLocalizedGenresArraySchema } from '~/validators/artistry/genre.schema';

export const createArtistryService = ({ compositionService }: ArtistryServiceDeps) => ({
  async getAllGenres(locale: Locale) {
    const genres = await compositionService.getAllGenres();

    return createLocalizedGenresArraySchema(locale).parse(genres);
  },
  async getAllCompositions(locale: Locale, filter: string) {
    const allSongs = await compositionService.getAllCompositions(filter);
<<<<<<< HEAD
    if (!allSongs) return [];
    return createLocalizedCompositionsArraySchema(locale).parse(allSongs);
  },
  async getAllCompositionTitles(locale: Locale) {
    const allTitles = await compositionService.getAllCompositionTitles();
    console.log(allTitles);
    if (!allTitles) return [];

    return createLocalizedСompositionTitlesArraySchema(locale).parse(allTitles);
=======
    console.log(allSongs);
    if (!allSongs) return [];
    return createLocalizedCompositionsArraySchema(locale).parse(allSongs);
  },
  async getAllTitles(locale: Locale) {
    const allTitles = await compositionService.getAllTitles();

    if (!allTitles) return [];

    return createLocalizedCompositionTitlesSchemaArray(locale).parse(allTitles);
>>>>>>> f785588 (commiting before switching to anotherworking branch)
  }
});

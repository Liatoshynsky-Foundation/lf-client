import { Locale } from 'next-intl';

import { ICompositionDTO } from '~/types/types/composition.types';
import { Music } from '~/types/types/enhancedTable';
import { IGenreDocument } from '~/types/types/genre.types';
import { TranslatedMap } from '~/types/types/translation';

import { compositionsRepository } from '~/middleware/сompositions.repository';

export const compositionService = {
  async getAllGenres(locale: Locale): Promise<TranslatedMap> {
    const genres: IGenreDocument[] = await compositionsRepository.getAllGenres();
    return genres.reduce<TranslatedMap>((acc, item) => {
      acc[item.key] = item.name[locale];
      return acc;
    }, {});
  },
  async getDataForArtistryTable(locale: Locale): Promise<Music[]> {
    const allSongs: ICompositionDTO[] = await compositionsRepository.getAllCompositions();
    return allSongs.map((song) => {
      const genreNames = song.genres && song.genres.length > 0 ? song.genres.map((genre) => genre.name[locale]) : [];
      return {
        id: song._id,
        name: song.title,
        year: song.year,
        genre: genreNames,
        ...(song.opus && {
          opus: song.opus.number,
          opusTitle: song.opus.title[locale]
        }),
        audioAvailable: song.audioAvailable,
        sheetAvailable: song.sheetAvailable,
        songBlobUrl: song.songBlobUrl ?? ''
      };
    });
  }
};

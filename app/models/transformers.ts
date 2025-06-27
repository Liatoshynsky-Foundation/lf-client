import type { ICompositionDocument } from '~/types/types/composition.types';
import type { IGenreDocument } from '~/types/types/genre.types';
import type { IOpusDocument } from '~/types/types/opus.types';

const transformOpus = (opus: IOpusDocument) => {
  return {
    _id: opus._id.toString(),
    number: opus.number,
    title: opus.title,
    createdAt: opus.createdAt,
    updatedAt: opus.updatedAt
  };
};

export const transformGenre = (genre: IGenreDocument) => {
  return {
    _id: genre._id.toString(),
    key: genre.key,
    name: genre.name
  };
};

export const transformComposition = (song: ICompositionDocument) => {
  return {
    _id: song._id.toString(),
    title: song.title,
    year: song.year,
    audioAvailable: song.audioAvailable,
    sheetAvailable: song.sheetAvailable,
    songBlobUrl: song.songBlobUrl,
    sheetMusic: song.sheetMusic,
    additionalMenu: song.additionalMenu,
    createdAt: song.createdAt,
    updatedAt: song.updatedAt,
    opus: song.opusId ? transformOpus(song.opusId) : undefined,
    genres: song.genres && song.genres.length > 0 ? song.genres.map(transformGenre) : []
  };
};

import { Locale } from 'next-intl';

import { CompositionsTitleFilters } from '~/types/types/tableFilters.types';

import { OpusCompositionDTO, OpusDetailsDTO, OpusVideoDTO } from '~/domain/dto/composition.dto';
import { CompositionRepository } from '~/infrastructure/repositories/artistry/compositions.repo';
import type { OpusWithCompositionsLean } from '~/infrastructure/repositories/artistry/compositions.repository';
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

type OpusLean = OpusWithCompositionsLean['opus'];
type OpusCompositionLean = OpusWithCompositionsLean['compositions'][number];

function pickSheetMusicUrl(sheetMusic?: OpusCompositionLean['sheetMusic']): string | undefined {
  if (!sheetMusic?.length) {
    return undefined;
  }

  const preferred = sheetMusic.find((item) => item.isFree) ?? sheetMusic[0];

  return preferred.url;
}

function deriveGenre(compositions: OpusCompositionLean[], locale: Locale): string | undefined {
  for (const composition of compositions) {
    const genre = composition.genres?.[0];

    if (genre?.name?.[locale]) {
      return genre.name[locale];
    }
  }

  return undefined;
}

function pickGenre(opus: OpusLean, compositions: OpusCompositionLean[], locale: Locale): string | undefined {
  if (opus.genre && opus.genre.trim().length > 0) {
    return opus.genre;
  }

  return deriveGenre(compositions, locale);
}

function pickDescription(description: OpusLean['description'], locale: Locale): string | null {
  const text = description?.[locale];

  if (!text || text.trim().length === 0) {
    return null;
  }

  return text;
}

function nonEmpty(value?: string | null): string | undefined {
  return value && value.trim().length > 0 ? value : undefined;
}

function mapMovements(movements?: string[]): string[] | undefined {
  const cleaned = movements?.map((movement) => movement.trim()).filter((movement) => movement.length > 0);

  return cleaned && cleaned.length > 0 ? cleaned : undefined;
}

const YOUTUBE_ID_REGEX = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/;

function extractYouTubeId(url: string): string | null {
  const match = YOUTUBE_ID_REGEX.exec(url);

  return match ? match[1] : null;
}

function mapVideos(videoLinks?: string[]): OpusVideoDTO[] {
  if (!videoLinks?.length) {
    return [];
  }

  return videoLinks
    .map((url) => extractYouTubeId(url))
    .filter((id): id is string => id !== null)
    .map((id) => ({ _id: id, youTubeId: id }));
}

function mapOpusCompositions(compositions: OpusCompositionLean[], locale: Locale): OpusCompositionDTO[] {
  return compositions.map((composition, index) => ({
    _id: String(composition._id),
    index: index + 1,
    title: composition.title[locale],
    sheetMusicUrl: pickSheetMusicUrl(composition.sheetMusic)
  }));
}

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
    filters?: { categories?: string[]; genres?: string[]; years?: { min?: number; max?: number } }
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
  },

  async getOpusDetailsById(locale: Locale, id: string): Promise<OpusDetailsDTO | null> {
    const raw = await compositionsRepo.getOpusById(id);

    if (!raw) {
      return null;
    }

    const { opus, compositions } = raw;

    return {
      _id: String(opus._id),
      number: opus.number,
      title: opus.title[locale],
      creationDate: opus.releaseYear != null ? String(opus.releaseYear) : undefined,
      genre: pickGenre(opus, compositions, locale),
      movements: mapMovements(opus.movements),
      sheetMusicUrl: nonEmpty(opus.sheetMusicUrl),
      compositions: mapOpusCompositions(compositions, locale),
      description: pickDescription(opus.description, locale),
      videos: mapVideos(opus.videoLinks)
    };
  }
});

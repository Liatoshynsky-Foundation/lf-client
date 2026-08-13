import { Locale } from 'next-intl';

import { CompositionsTitleFilters } from '~/types/types/tableFilters.types';

import { OpusCompositionDTO, OpusDetailsDTO, OpusVideoDTO } from '~/domain/dto/composition.dto';
import { CompositionRepository } from '~/infrastructure/repositories/artistry/compositions.repo';
import type { OpusWithCompositionsLean } from '~/infrastructure/repositories/artistry/compositions.repository';
import {
  compositionsYearRangeSchema,
  compositionTitlesSchema,
  opusGroupSchema
} from '~/validators/artistry/composition.schema';
import { namedFilterSchema } from '~/validators/artistry/namedFilter.schema';
import { ArraySchema, NoIDSchema } from '~/validators/constants';
import { LocalizeSchema } from '~/validators/localization';

type ArtistryServiceDeps = {
  compositionsRepo: CompositionRepository;
};

type OpusLean = OpusWithCompositionsLean['opus'];
type OpusCompositionLean = OpusWithCompositionsLean['compositions'][number];
type OpusPerformanceLean = NonNullable<OpusLean['performances']>[number];

function pickSheetMusicUrl(sheetMusic?: OpusCompositionLean['sheetMusic']): string | undefined {
  if (!sheetMusic?.length) {
    return undefined;
  }

  const preferred = sheetMusic.find((item) => item.isFree) ?? sheetMusic[0];

  return preferred.url;
}

function deriveGenre(compositions: OpusCompositionLean[]): string | undefined {
  for (const composition of compositions) {
    if (composition.genre && composition.genre.trim().length > 0) {
      return composition.genre;
    }
  }

  return undefined;
}

function pickGenre(opus: OpusLean, compositions: OpusCompositionLean[], locale: Locale): string | undefined {
  const opusGenre = opus.genre?.[locale];
  if (opusGenre && opusGenre.trim().length > 0) {
    return opusGenre;
  }

  return deriveGenre(compositions);
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

function mapMovements(parts: OpusLean['parts'], locale: Locale): string[] | undefined {
  const text = parts?.[locale];

  if (!text) {
    return undefined;
  }

  const cleaned = text
    .split('\n')
    .map((movement) => movement.trim())
    .filter((movement) => movement.length > 0);

  return cleaned.length > 0 ? cleaned : undefined;
}

function formatOpusNumber(opus: OpusLean): string {
  const number = String(opus.number);

  return opus.numberKind ? `${opus.numberKind}.${number}` : number;
}

const YOUTUBE_ID_REGEX = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/;

function extractYouTubeId(url: string): string | null {
  const match = YOUTUBE_ID_REGEX.exec(url);

  return match ? match[1] : null;
}

function mapVideos(performances: OpusPerformanceLean[] | undefined, locale: Locale): OpusVideoDTO[] {
  if (!performances?.length) {
    return [];
  }

  return performances
    .map((performance): OpusVideoDTO | null => {
      const youTubeId = extractYouTubeId(performance.videoUrl);

      if (!youTubeId) {
        return null;
      }

      return {
        _id: String(performance._id ?? youTubeId),
        youTubeId,
        title: performance.title?.[locale]
      };
    })
    .filter((video): video is OpusVideoDTO => video !== null);
}

function mapOpusCompositions(compositions: OpusCompositionLean[], locale: Locale): OpusCompositionDTO[] {
  return compositions.map((composition, index) => ({
    _id: String(composition._id),
    index: index + 1,
    title: composition.name[locale],
    sheetMusicUrl: pickSheetMusicUrl(composition.sheetMusic)
  }));
}

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

    return ArraySchema(LocalizeSchema(opusGroupSchema, locale, { fallbackFields: ['name', 'title'] })).parse(allSongs);
  },

  async getSearchAutocompleteOptions(locale: Locale, filters: CompositionsTitleFilters = {}) {
    const titles = await compositionsRepo.getArtistrySearchSuggestions(filters);
    if (!titles) return [];

    const localizedTitles = ArraySchema(
      LocalizeSchema(compositionTitlesSchema, locale, { fallbackFields: ['name', 'title'] })
    ).parse(titles);

    const genres = await compositionsRepo.getAllGenres();
    const genreOptions = genres.map((genre, index) => ({
      _id: `genre-${index}`,
      title: genre,
      type: 'genre' as const
    }));

    return [...localizedTitles, ...genreOptions];
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
      number: formatOpusNumber(opus),
      title: opus.title[locale],
      creationDate: nonEmpty(opus.creationYear) ?? (opus.releaseYear != null ? String(opus.releaseYear) : undefined),
      genre: pickGenre(opus, compositions, locale),
      movements: mapMovements(opus.parts, locale),
      sheetMusicUrl: nonEmpty(opus.sheetMusicUrl),
      compositions: mapOpusCompositions(compositions, locale),
      description: pickDescription(opus.description, locale),
      videos: mapVideos(opus.performances, locale)
    };
  }
});

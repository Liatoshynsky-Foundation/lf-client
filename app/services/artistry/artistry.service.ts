import { Locale } from 'next-intl';

import {
  extractAndCollectGenres,
  formatOpusNumber,
  mapCompositionsForDetails,
  mapMovements,
  mapOpusCompositions,
  mapOpusGallery,
  mapVideos,
  mapYear,
  pickDescription,
  pickGenre
} from './artistry.mapper';
import { CompositionsTitleFilters } from '~/types/types/tableFilters.types';

import {
  CategoryDTO,
  CompositionQueryFilters,
  OpusDetailsDTO,
  OpusListDTO,
  SearchAutocompleteDTO,
  YearRangeDTO
} from '~/domain/dto/composition.dto';
import { CompositionRepository } from '~/infrastructure/repositories/artistry/compositions.repo';
import { RawCompositionDTO } from '~/validators/artistry/composition.schema';
import { ArraySchema, namedFilterSchema, NoIDSchema } from '~/validators/constants';
import { LocalizeSchema } from '~/validators/localization';

type ArtistryServiceDeps = {
  compositionsRepo: CompositionRepository;
};

export const createArtistryService = ({ compositionsRepo }: ArtistryServiceDeps) => ({
  async getAllCategories(locale: Locale): Promise<CategoryDTO[]> {
    const categories = await compositionsRepo.getAllCategories();
    return ArraySchema(LocalizeSchema(NoIDSchema(namedFilterSchema), locale)).parse(categories);
  },

  async getAllCompositions(locale: Locale, search?: string, filters?: CompositionQueryFilters): Promise<OpusListDTO[]> {
    const allSongs = await compositionsRepo.getAllCompositions(filters);
    if (!allSongs) return [];

    const mappedSongs = allSongs.map((song) => {
      const firstVideo = mapVideos(song.performances ?? [], locale)[0];
      const youtubeUrl = firstVideo ? firstVideo.youTubeId : null;

      return {
        _id: song._id,
        number: formatOpusNumber(song),
        name: song.name[locale],
        title: song.title[locale],
        year: mapYear(song),
        genre: song.genre?.[locale] ?? null,
        slug: song.slug,
        compositions: mapOpusCompositions(song.compositions, locale) ?? null,
        description: song.description?.[locale] ?? null,
        youtubeUrl
      };
    });

    if (search) {
      const query = search.toLowerCase().trim();
      return mappedSongs.filter((song) => {
        const nameMatches = song.name.toLowerCase().includes(query);
        const titleMatches = song.title.toLowerCase().includes(query);
        const genreMatches = song.genre?.toLowerCase().includes(query) ?? false;
        const compositionsMatch = song.compositions?.some((c) => c.name.toLowerCase().includes(query)) ?? false;
        return nameMatches || titleMatches || genreMatches || compositionsMatch;
      });
    }

    return mappedSongs;
  },

  async getSearchAutocompleteOptions(
    locale: Locale,
    filters: CompositionsTitleFilters = {}
  ): Promise<SearchAutocompleteDTO[]> {
    let categoryKeys: string[] | undefined;
    if (filters.category) {
      categoryKeys = Array.isArray(filters.category) ? filters.category : [filters.category];
    }
    const allSongs = await compositionsRepo.getAllCompositions({
      categories: categoryKeys,
      years: { min: filters.yearFrom ?? undefined, max: filters.yearTo ?? undefined }
    });

    const localizedSuggestions: SearchAutocompleteDTO[] = [];
    const uniqueGenres = new Set<string>();
    const seenIds = new Set<string>();
    const query = filters.search?.toLowerCase().trim() ?? '';

    allSongs.forEach((song) => {
      const opusName = song.name[locale];
      if (opusName && (!query || opusName.toLowerCase().includes(query))) {
        if (!seenIds.has(song._id)) {
          seenIds.add(song._id);
          localizedSuggestions.push({
            _id: song._id,
            name: opusName,
            type: 'opus'
          });
        }
      }

      if (song.compositions) {
        song.compositions.forEach((comp: RawCompositionDTO) => {
          const compName = comp.name[locale];
          if (compName && (!query || compName.toLowerCase().includes(query))) {
            const compId = String(comp._id);
            if (!seenIds.has(compId)) {
              seenIds.add(compId);
              localizedSuggestions.push({
                _id: compId,
                name: compName,
                type: 'composition'
              });
            }
          }

          extractAndCollectGenres(comp.genre, query, uniqueGenres);
        });
      }

      extractAndCollectGenres(song.genre?.[locale], query, uniqueGenres);
    });

    const sortedGenres = Array.from(uniqueGenres).sort((a, b) => a.localeCompare(b));
    sortedGenres.forEach((genre, index) => {
      localizedSuggestions.push({
        _id: `genre-${index}-${genre}`,
        name: genre,
        type: 'genre'
      });
    });

    return localizedSuggestions;
  },

  async getCompositionsYearRange(): Promise<YearRangeDTO> {
    const range = await compositionsRepo.getCompositionsYearRange();
    return {
      min: range.minYear,
      max: range.maxYear
    };
  },

  async getOpusDetailsBySlug(locale: Locale, slug: string): Promise<OpusDetailsDTO | null> {
    const opusDetails = await compositionsRepo.getOpusBySlug(slug);

    if (!opusDetails) return null;

    return {
      _id: String(opusDetails._id),
      number: formatOpusNumber(opusDetails),
      name: opusDetails.name[locale],
      title: opusDetails.title[locale],
      year: mapYear(opusDetails),
      genre: pickGenre(opusDetails, opusDetails.compositions, locale),
      slug: opusDetails.slug,
      movements: mapMovements(opusDetails.parts ?? null, locale),
      compositions: mapCompositionsForDetails(opusDetails.compositions, locale),
      introDescription: pickDescription(opusDetails.introDescription ?? null, locale),
      description: opusDetails.description ? opusDetails.description[locale] : null,
      videos: mapVideos(opusDetails.performances ?? null, locale),
      sheetMusic: opusDetails.sheetMusic || null,
      gallery: mapOpusGallery(opusDetails.gallery, locale)
    };
  }
});

import { Locale } from 'next-intl';

import { LocalizedString } from '~/types/types/common.types';

import { CompositionDetailsSlice, OpusGalleryItem } from '~/domain/entities/artistry.entity';
import { parseGenreString } from '~/lib/utils/parseGenreString';
import { extractTextFromTipTap, LocalizedTipTap, parseTipTapString } from '~/lib/utils/tiptapHelpers';
import { extractYouTubeId } from '~/lib/utils/youtubeHelpers';
import { RichContent } from '~/shared/components/design-system/all-components/content-block/ContentBlock';
import { isValidUrl } from '~/shared/utils/isValidUrl';
import {
  OpusDocument,
  RawCompositionDTO,
  RawGalleryItemDTO,
  RawOpusDetailsDTO,
  RawOpusListItemDTO,
  RawPerformanceDTO
} from '~/validators/artistry/composition.schema';

export function deriveGenre(compositions: RawCompositionDTO[]): string | undefined {
  for (const composition of compositions) {
    if (composition.genre && composition.genre.trim().length > 0) {
      return composition.genre;
    }
  }
  return undefined;
}

export function mapYear(opus: RawOpusDetailsDTO | RawOpusListItemDTO): string {
  return opus.endYear ? `${opus.creationYear} - ${opus.endYear}` : `${opus.creationYear}`;
}

export function pickGenre(
  opus: OpusDocument,
  compositions: RawCompositionDTO[],
  locale: Locale
): string | undefined | null {
  const opusGenre = opus.genre?.[locale];
  if (opusGenre && opusGenre.trim().length > 0) {
    return opusGenre;
  }
  return deriveGenre(compositions);
}

export function pickDescription(description: LocalizedTipTap, locale: Locale): RichContent | null {
  const text = description?.[locale];
  const parsedText = parseTipTapString(text);

  if (extractTextFromTipTap(parsedText, locale).trim().length === 0) {
    return null;
  }
  return parsedText;
}

export function mapMovements(parts: LocalizedString | null, locale: Locale): string[] | undefined {
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

export function formatOpusNumber(opus: { number: number; numberKind: string; additionalText?: string | null }): string {
  const numberKind = opus.numberKind.toLowerCase() == 'sineop' ? 'sine op' : 'op';
  return opus.additionalText
    ? `${numberKind}. ${opus.number}. ${opus.additionalText}`
    : `${numberKind}. ${opus.number}`;
}

export function mapVideos(performances: RawPerformanceDTO[], locale: Locale) {
  if (!performances?.length) {
    return [];
  }

  return performances
    .map((performance: RawPerformanceDTO) => {
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
    .filter((video): video is NonNullable<typeof video> => video !== null);
}

export function mapOpusCompositions(compositions: RawCompositionDTO[], locale: Locale) {
  return compositions.map((composition) => ({
    _id: String(composition._id),
    name: composition.name[locale],
    year: composition.year,
    genre: composition.genre,
    audioAvailable: composition.audioAvailable,
    sheetAvailable: composition.sheetAvailable,
    audios: composition.audios,
    sheetMusic: composition.sheetMusic
  }));
}

export function mapCompositionsForDetails(
  compositions: RawCompositionDTO[],
  locale: Locale
): CompositionDetailsSlice[] {
  return compositions.map((composition) => ({
    _id: String(composition._id),
    name: composition.name[locale],
    sheetAvailable: composition.sheetAvailable,
    sheetMusic: composition.sheetAvailable ? composition.sheetMusic : null
  }));
}

export function mapOpusGallery(
  gallery: RawGalleryItemDTO[] | null | undefined,
  locale: Locale
): OpusGalleryItem[] | undefined {
  if (!gallery || gallery.length === 0) return undefined;
  const validGallery = gallery.filter((item) => isValidUrl(item?.src));
  if (validGallery.length === 0) return undefined;

  return validGallery.map((item) => ({
    id: String(item._id || item.src),
    src: item.src,
    alt: item.altText[locale],
    caption: item.description?.[locale],
    crop: item.crop ? { rect: item.crop } : undefined
  }));
}

export function extractAndCollectGenres(
  genreStr: string | null | undefined,
  query: string,
  targetSet: Set<string>
): void {
  if (!genreStr) return;
  if (!query || genreStr.toLowerCase().includes(query)) {
    const parsed = parseGenreString(genreStr);
    parsed.forEach((genre) => {
      const clean = genre.trim();
      if (clean) {
        targetSet.add(clean);
      }
    });
  }
}

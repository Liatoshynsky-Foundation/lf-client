import { useMemo } from 'react';

import { Music } from '~/types/types/enhancedTable';

import { OpusListDTO } from '~/domain/dto/composition.dto';

export function useGroupedCompositions(rawData: readonly OpusListDTO[]) {
  return useMemo(() => {
    return rawData.map((group) => {
      const items: Music[] = (group.compositions || []).map((comp) => ({
        id: group._id,
        opus: group.number,
        opusName: group.name,
        opusTitle: group.title,
        opusYear: group.year,
        slug: group.slug,
        opusGenres: group.genre ? [group.genre] : [],
        compositionName: comp.name,
        compositionYear: comp.year ?? null,
        compositionGenre: comp.genre ? [comp.genre] : [],
        audioAvailable: comp.audioAvailable,
        sheetAvailable: comp.sheetAvailable,
        sheetMusic: comp.sheetMusic ?? null,
        audios: comp.audios ?? null,
        opusId: group._id,
        youtubeUrl: group.youtubeUrl ?? null
      }));

      return {
        label: group._id,
        items
      };
    });
  }, [rawData]);
}

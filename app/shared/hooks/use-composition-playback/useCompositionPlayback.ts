'use client';

import { useCallback, useMemo } from 'react';

import { ApiRoutes } from '~/constants/routes/api-routes';
import type { Music } from '~/types/types/enhancedTable';
import { getStorageFileEndpoint } from '~/utils/storageFileEndpoint';

import { useAudioPlayer } from '~/shared/context/AudioPlayerContext';

export function useCompositionPlayback(rowData: Music) {
  const { playTrack, togglePlay, isPlaying, src } = useAudioPlayer();

  const audioName = rowData.audios?.[0]?.name || '';

  const trackUrl = useMemo(
    () => getStorageFileEndpoint(ApiRoutes.STORAGE_FILE, 'compositions', audioName),
    [audioName]
  );

  const isCurrentTrack = Boolean(src?.startsWith(trackUrl));
  const canPlay = Boolean(rowData.audioAvailable);

  const handlePlayClick = useCallback(() => {
    if (!canPlay) return;

    if (isCurrentTrack) togglePlay();
    else playTrack(trackUrl, rowData.name);
  }, [canPlay, isCurrentTrack, togglePlay, playTrack, trackUrl, rowData.name]);

  return {
    canPlay,
    isCurrentTrack,
    isPlaying,
    handlePlayClick
  };
}

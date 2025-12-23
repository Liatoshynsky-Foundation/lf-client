'use client';

import { useCallback, useMemo } from 'react';

import type { Music } from '~/types/types/enhancedTable';

import { useAudioPlayer } from '~/shared/context/AudioPlayerContext';

export function useCompositionPlayback(rowData: Music) {
  const { playTrack, togglePlay, isPlaying, src } = useAudioPlayer();

  const trackUrl = useMemo(
    () => `/api/blob-url?blobName=${encodeURIComponent(rowData.name)}&folderName=compositions`,
    [rowData.name]
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

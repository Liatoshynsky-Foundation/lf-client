'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { API_BLOB_URL, DEFAULT_COMPOSITION_NAME, FOLDER_NAME } from '~/constants/audioPlayer';
import { errors } from '~/constants/errors';

export type AudioPlayerContextType = {
  src: string;
  trackName: string;
  isPlaying: boolean;
  playTrack: (src: string, trackName: string) => void;
  togglePlay: () => void;
};

export const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [src, setSrc] = useState(
    `${API_BLOB_URL}?blobName=${encodeURIComponent(DEFAULT_COMPOSITION_NAME)}&folderName=${encodeURIComponent(FOLDER_NAME)}`
  );
  const [trackName, setTrackName] = useState(DEFAULT_COMPOSITION_NAME);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = useCallback((newSrc: string, newTrackName: string) => {
    setSrc(newSrc);
    setTrackName(newTrackName);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      src,
      trackName,
      isPlaying,
      playTrack,
      togglePlay
    }),
    [src, trackName, isPlaying, playTrack, togglePlay]
  );

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>;
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error(errors.USE_AUDIO_PLAYER_OUTSIDE_PROVIDER);
  return context;
};

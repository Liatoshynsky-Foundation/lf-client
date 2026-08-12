'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { DEFAULT_COMPOSITION_NAME, DEFAULT_COMPOSITION_URL } from '~/constants/audioPlayer';
import { errors } from '~/constants/errors';

export type AudioPlayerContextType = {
  src: string;
  trackName: string;
  isPlaying: boolean;
  isPlayerOpen: boolean;
  playTrack: (src: string, trackName: string) => void;
  togglePlay: () => void;
  openPlayer: () => void;
  closePlayer: () => void;
};

export const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [src, setSrc] = useState(DEFAULT_COMPOSITION_URL);
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

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const openPlayer = useCallback(() => setIsPlayerOpen(true), []);
  const closePlayer = useCallback(() => setIsPlayerOpen(false), []);

  const value = useMemo(
    () => ({
      src,
      trackName,
      isPlaying,
      isPlayerOpen,
      playTrack,
      togglePlay,
      openPlayer,
      closePlayer
    }),
    [src, trackName, isPlaying, isPlayerOpen, playTrack, togglePlay, openPlayer, closePlayer]
  );

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>;
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error(errors.USE_AUDIO_PLAYER_OUTSIDE_PROVIDER);
  return context;
};

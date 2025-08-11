'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

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
    '/api/blob-url?blobName=%D0%9F%D0%BE%D0%B5%D0%BC%D0%B0%20%D0%BF%D1%80%D0%BE%20%D0%BB%D1%96%D1%81&folderName=compositions'
  );
  const [trackName, setTrackName] = useState('Поема про ліс');
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
  if (!context) throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  return context;
};

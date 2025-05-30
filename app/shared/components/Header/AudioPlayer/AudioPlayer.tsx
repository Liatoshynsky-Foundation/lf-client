'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import { styles } from './AudioPlayer.styles';
import AudioPlayerPopover from './AudioPlayerPopover/AudioPlayerPopover';

export type AudioPlayerProps = Readonly<{
  src: string;
  trackName: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}>;

const stickHeights = [
  { id: 'stick-1', height: 7 },
  { id: 'stick-2', height: 19 },
  { id: 'stick-3', height: 30 },
  { id: 'stick-4', height: 13 },
  { id: 'stick-5', height: 22 },
  { id: 'stick-6', height: 7 },
];

export default function AudioPlayer({
  src,
  trackName,
  loop = false,
  autoplay = false,
  className,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const controller = new AbortController();
    const { signal } = controller;

    const updateProgress = () => setCurrentTime(audio.currentTime);
    const updatePlayState = () => setIsPlaying(!audio.paused);
    const loadDuration = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setAnchorEl(null);
    };
    const handleError = () => setError('Error loading audio file.');
    const handleLoadedMetadata = () => {
      loadDuration();
      setError(null);
    };

    audio.addEventListener('timeupdate', updateProgress, { signal });
    audio.addEventListener('play', updatePlayState, { signal });
    audio.addEventListener('pause', updatePlayState, { signal });
    audio.addEventListener('ended', handleEnded, { signal });
    audio.addEventListener('loadedmetadata', handleLoadedMetadata, { signal });
    audio.addEventListener('error', handleError, { signal });

    if (audio.readyState >= 1) {
      loadDuration();
      setError(null);
    }

    if (autoplay) {
      audio.play().catch(() => {
        setError('Playback failed');
      });
    }

    return () => {
      controller.abort();
    };
  }, [autoplay, src]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }, []);

  const togglePopoverAndPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.play();
      setAnchorEl(buttonRef.current);
    } else {
      setAnchorEl((prev) => (prev ? null : buttonRef.current));
    }
  }, [isPlaying]);

  const onSeek = useCallback((newProgress: number) => {
    const audio = audioRef.current;
    if (!audio || isNaN(audio.duration)) return;
    audio.currentTime = newProgress * audio.duration;
  }, []);

  const closePopover = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Box sx={styles.wrapper} className={className}>
        <IconButton
          sx={styles.eqButton}
          onClick={togglePopoverAndPlay}
          aria-label="Toggle audio player"
          ref={buttonRef}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            {stickHeights.map(({ id, height }, i) => (
              <Box
                key={id}
                sx={{
                  ...styles.icon,
                  ...(isPlaying ? styles.iconAnimated : styles.iconStatic),
                  animationDelay: isPlaying ? `${i * 0.1}s` : undefined,
                  height,
                }}
              />
            ))}
          </Box>
        </IconButton>
      </Box>

      <audio ref={audioRef} src={src} preload="metadata" loop={loop}>
        <track kind="captions" srcLang="en" label="English captions" />
      </audio>

      <AudioPlayerPopover
        anchorEl={anchorEl}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        progress={duration ? currentTime / duration : 0}
        onClose={closePopover}
        onTogglePlay={togglePlay}
        onSeek={onSeek}
        trackName={trackName}
        error={error}
      />
    </>
  );
}

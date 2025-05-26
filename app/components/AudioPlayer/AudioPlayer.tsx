import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import { styles } from './AudioPlayer.styles';
import AudioPlayerPopover from './AudioPlayerPopover/AudioPlayerPopover';

type AudioPlayerProps = {
  src: string;
  trackName: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
};

export default function AudioPlayer({
  src,
  trackName,
  loop = false,
  autoplay = false,
  className,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stickHeights = [7, 19, 30, 13, 22, 7];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const checkAudio = async () => {
      try {
        await audio.load();
        if (audio.readyState === 0) throw new Error('File not loaded');
        setError(null);
      } catch {
        setError('Error loading audio file.');
      }
    };

    checkAudio();

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
    };

    const updatePlayState = () => {
      setIsPlaying(!audio.paused);
    };

    const loadDuration = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setAnchorEl(null);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('play', updatePlayState);
    audio.addEventListener('pause', updatePlayState);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', loadDuration);

    if (audio.readyState >= 1) loadDuration();
    if (autoplay) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('play', updatePlayState);
      audio.removeEventListener('pause', updatePlayState);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', loadDuration);
    };
  }, [autoplay, src]);

  const togglePlay = useCallback((): void => {
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
            {stickHeights.map((height, i) => (
              <Box
                key={i}
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

      <audio ref={audioRef} src={src} preload="metadata" loop={loop} />

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

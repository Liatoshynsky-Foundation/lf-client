'use client';

import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  useCallback,
} from 'react';
import { Box, IconButton } from '@mui/material';
import { styles } from './AudioPlayer.styles';
import AudioPlayerPopover from './AudioPlayerPopover/AudioPlayerPopover';

type AudioPlayerProps = {
  src: string;
  trackName: string;
  loop?: boolean;
  autoplay?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  className?: string;
};

export default function AudioPlayer({
  src,
  trackName,
  loop = false,
  autoplay = false,
  onPlay,
  onPause,
  onEnd,
  className,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const stickHeights = [7, 19, 30, 13, 22, 7];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.currentTime / (audio.duration || 1));
    };

    const updatePlayState = () => {
      const playing = !audio.paused;
      setIsPlaying(playing);
      if (playing) {
        onPlay?.();
      } else {
        onPause?.();
      }
    };

    const loadDuration = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      } else {
        const check = () => {
          if (!audioRef.current) return;
          const dur = audioRef.current.duration;
          if (!isNaN(dur) && dur > 0) {
            setDuration(dur);
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setAnchorEl(null);
      onEnd?.();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('play', updatePlayState);
    audio.addEventListener('pause', updatePlayState);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', loadDuration);

    if (audio.readyState >= 1) loadDuration();
    if (autoplay) audio.play().catch(() => {});

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('play', updatePlayState);
      audio.removeEventListener('pause', updatePlayState);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', loadDuration);
    };
  }, [autoplay, onPlay, onPause, onEnd]);

  const togglePlay = useCallback((): void => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }, []);

  const togglePopover = useCallback((): void => {
    setAnchorEl((prev) => (prev ? null : buttonRef.current));
  }, []);

  const onProgressClick = useCallback((e: MouseEvent<HTMLDivElement>): void => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar) return;

    const { left, width } = bar.getBoundingClientRect();
    const clickX = e.clientX - left;
    const percent = Math.min(Math.max(clickX / width, 0), 1);

    audio.currentTime = percent * (audio.duration || 0);
  }, []);

  const closePopover = useCallback((): void => {
    audioRef.current?.pause();
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Box sx={styles.wrapper} className={className}>
        <IconButton
          sx={styles.eqButton}
          onClick={() => {
            togglePlay();
            togglePopover();
          }}
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
        progress={progress}
        onClose={closePopover}
        onTogglePlay={togglePlay}
        onProgressClick={onProgressClick}
        trackName={trackName}
        ref={progressRef}
      />
    </>
  );
}

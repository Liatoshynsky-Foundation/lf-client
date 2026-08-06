'use client';

import { Box, IconButton, Popover, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import Button from '~/ds-components/button/Button';

import { styles } from './AudioPlayerPopover.styles';
import { calculateProgress, formatTime } from '~/utils/audioPlayer';

import { ROUTES } from '~/shared/components/constants/routes';
interface AudioPlayerPopoverProps {
  anchorEl: HTMLButtonElement | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  onClose: () => void;
  onTogglePlay: () => void;
  onSeek: (progress: number) => void;
  trackName: string;
  error: string | null;
}

const AudioPlayerPopover = ({
  anchorEl,
  isPlaying,
  currentTime,
  duration,
  progress,
  onClose,
  onTogglePlay,
  onSeek,
  trackName,
  error
}: AudioPlayerPopoverProps) => {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const playButtonRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = Boolean(anchorEl);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    onSeek(calculateProgress(e, progressRef));
  };

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      playButtonRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      onSeek(calculateProgress(e, progressRef));
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onSeek]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const STEP = 0.05;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        onSeek(Math.max(0, progress - STEP));
        break;

      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        onSeek(Math.min(1, progress + STEP));
        break;

      case 'Home':
        event.preventDefault();
        onSeek(0);
        break;

      case 'End':
        event.preventDefault();
        onSeek(1);
        break;

      default:
        break;
    }
  };

  return (
    <Popover
      disableScrollLock
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      PaperProps={{ sx: styles.popoverPaper }}
    >
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Typography sx={styles.timeText}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Typography>
          <Typography sx={styles.trackText} noWrap>
            {trackName}
          </Typography>
        </Box>

        {error ? (
          <Box sx={styles.errorMessage}>
            <Typography>{error}</Typography>
          </Box>
        ) : (
          <>
            <Box ref={progressRef} onMouseDown={handleMouseDown} sx={styles.progressBar}>
              <Box sx={styles.progressLine} style={{ width: `${progress * 100}%` }} />

              <Box
                tabIndex={0}
                role="slider"
                aria-label="Track progress"
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                onKeyDown={handleKeyDown}
                sx={styles.progressThumbSvg}
                style={{ left: `${progress * 100}%` }}
              >
                <Image src="/icons/audio-play-circle-icon.svg" alt="" width={16} height={16} />
              </Box>
            </Box>

            <Box sx={styles.controls}>
              <IconButton
                onClick={onTogglePlay}
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                sx={styles.playPauseButton}
                ref={playButtonRef}
              >
                <Image
                  src={isPlaying ? '/icons/pause-icon.svg' : '/icons/play-icon.svg'}
                  alt=""
                  width={24}
                  height={24}
                />
              </IconButton>

              <Button fullWidth variant="contained" link={ROUTES.ARTISTRY} sx={styles.allTracksButton}>
                Усі твори
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Popover>
  );
};

export default AudioPlayerPopover;

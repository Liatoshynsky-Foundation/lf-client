'use client';

import React, { forwardRef } from 'react';
import { Box, IconButton, Popover, Typography, Button } from '@mui/material';
import { styles } from './AudioPlayerPopover.styles';

interface AudioPlayerPopoverProps {
  anchorEl: HTMLButtonElement | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  onClose: () => void;
  onTogglePlay: () => void;
  onProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  trackName: string;
}

const AudioPlayerPopover = forwardRef<HTMLDivElement, AudioPlayerPopoverProps>(
  (
    {
      anchorEl,
      isPlaying,
      currentTime,
      duration,
      progress,
      onClose,
      onTogglePlay,
      onProgressClick,
      trackName,
    },
    progressRef,
  ) => {
    const formatTime = (time: number) =>
      `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`;

    return (
      <Popover
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

          <Box
            ref={progressRef}
            onClick={onProgressClick}
            sx={styles.progressBar}
          >
            <Box sx={{ ...styles.progressLine, width: `${progress * 100}%` }} />
            <Box
              sx={{
                ...styles.progressThumbSvg,
                left: `${progress * 100}%`,
              }}
            >
              <img
                src="/audio-play-circle-icon.svg"
                alt="progress thumb"
                width={16}
                height={16}
              />
            </Box>
          </Box>

          <Box sx={styles.controls}>
            <IconButton
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              sx={styles.playPauseButton}
            >
              {isPlaying ? (
                <img
                  src="./pause-icon.svg"
                  alt="Pause"
                  width={24}
                  height={24}
                />
              ) : (
                <img src="./play-icon.svg" alt="Play" width={24} height={24} />
              )}
            </IconButton>

            <Button fullWidth variant="contained" sx={styles.allTracksButton}>
              Усі твори
            </Button>
          </Box>
        </Box>
      </Popover>
    );
  },
);

AudioPlayerPopover.displayName = 'AudioPlayerPopover';

export default AudioPlayerPopover;

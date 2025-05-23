import React, { useRef, useState, useEffect } from 'react';
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
  onSeek: (progress: number) => void;
  trackName: string;
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
}: AudioPlayerPopoverProps) => {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formatTime = (time: number) =>
    `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`;

  const calculateProgress = (e: MouseEvent | React.MouseEvent) => {
    if (!progressRef.current) return 0;
    const { left, width } = progressRef.current.getBoundingClientRect();
    const pos = e.clientX - left;
    return Math.min(Math.max(pos / width, 0), 1);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    onSeek(calculateProgress(e));
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      onSeek(calculateProgress(e));
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
          onMouseDown={handleMouseDown}
          sx={styles.progressBar}
          role="progressbar"
        >
          <Box sx={styles.progressLine(progress)} />
          <Box sx={styles.progressThumbSvg(progress)}>
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
            <img
              src={isPlaying ? './pause-icon.svg' : './play-icon.svg'}
              alt={isPlaying ? 'Pause' : 'Play'}
              width={24}
              height={24}
            />
          </IconButton>

          <Button fullWidth variant="contained" sx={styles.allTracksButton}>
            Усі твори
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

AudioPlayerPopover.displayName = 'AudioPlayerPopover';

export default AudioPlayerPopover;

'use client';

import { Box, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

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
  { id: 'stick-6', height: 7 }
];

export default function AudioPlayer({ src, trackName, loop = false, autoplay = false, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const barRefs = useRef<any>([]);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const setupAudioAnalyzer = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audioContextRef.current) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 64;

    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;
  }, []);

  const animateBars = useCallback(() => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    if (!analyser || !dataArray) return;

    analyser.getByteFrequencyData(dataArray);

    const bandSize = Math.floor(dataArray.length / stickHeights.length);

    stickHeights.forEach((_, i) => {
      const start = i * bandSize;
      const end = start + bandSize;
      const avg = dataArray.slice(start, end).reduce((sum, val) => sum + val, 0) / bandSize;

      const bar = barRefs.current[i];
      if (bar) {
        const percent = Math.max(5, (avg / 255) * 100);
        bar.style.height = `${percent}%`;
      }
    });

    animationRef.current = requestAnimationFrame(animateBars);
  }, []);

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
      audio
        .play()
        .then(() => {
          setupAudioAnalyzer();
          animateBars();
        })
        .catch(() => {
          setError('Playback failed');
        });
    }

    return () => {
      controller.abort();
    };
  }, [autoplay, src, setupAudioAnalyzer, animateBars]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      animateBars();
    } else {
      audio.pause();

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [animateBars]);

  const togglePopoverAndPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.play();
      setAnchorEl(buttonRef.current);

      if (!audioContextRef.current) {
        setupAudioAnalyzer();
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animateBars();
    } else {
      setAnchorEl((prev) => (prev ? null : buttonRef.current));
    }
  }, [isPlaying, animateBars, setupAudioAnalyzer]);

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
          <Box display="flex" alignItems="center" gap={0.5} height={30}>
            {stickHeights.map(({ id, height }, i) => (
              <Box
                key={id}
                sx={styles.icon}
                ref={(el) => {
                  if (el) barRefs.current[i] = el;
                }}
                style={{ height: `${height}px` }}
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

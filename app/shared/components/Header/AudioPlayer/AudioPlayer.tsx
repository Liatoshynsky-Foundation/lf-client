'use client';

import { Box, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { styles } from './AudioPlayer.styles';
import AudioPlayerPopover from './AudioPlayerPopover/AudioPlayerPopover';

import { useAudioPlayer } from '~/shared/context/AudioPlayerContext';

const stickHeights = [
  { id: 'stick-1', height: 7 },
  { id: 'stick-2', height: 19 },
  { id: 'stick-3', height: 30 },
  { id: 'stick-4', height: 13 },
  { id: 'stick-5', height: 22 },
  { id: 'stick-6', height: 7 }
];

export default function AudioPlayer() {
  const { src, trackName, isPlaying, togglePlay } = useAudioPlayer();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const setupAudioAnalyzer = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioCtx();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 64;

    if (!sourceRef.current) {
      sourceRef.current = audioContext.createMediaElementSource(audio);
      sourceRef.current.connect(analyser);
      analyser.connect(audioContext.destination);
    }

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

    const updateProgress = () => setCurrentTime(audio.currentTime);
    const loadDuration = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => setAnchorEl(null);
    const handleError = () => setError('Error loading audio file.');
    const handleLoadedMetadata = () => {
      loadDuration();
      setError(null);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    audio.src = src;
    audio.load();
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    const playAudio = async () => {
      try {
        await audio.play();
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
          setupAudioAnalyzer();
        }
        animateBars();
        setError(null);
      } catch {
        setError('Playback failed');
      }
    };

    if (isPlaying) {
      playAudio();
    } else {
      audio.pause();

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [isPlaying, src, setupAudioAnalyzer, animateBars]);

  const handlePopoverToggle = useCallback(() => {
    setAnchorEl((prev) => (prev ? null : buttonRef.current));

    if (src && !isPlaying) {
      togglePlay();
    }
  }, [isPlaying, togglePlay, src]);

  const onSeek = useCallback((newProgress: number) => {
    const audio = audioRef.current;
    if (!audio || isNaN(audio.duration)) return;
    audio.currentTime = newProgress * audio.duration;
  }, []);

  const closePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Box sx={styles.wrapper}>
        <IconButton sx={styles.eqButton} onClick={handlePopoverToggle} aria-label="Toggle audio player" ref={buttonRef}>
          <Box display="flex" alignItems="center" gap={0.5} height={30}>
            {stickHeights.map(({ id, height }, i) => (
              <Box
                key={id}
                sx={styles.icon}
                ref={(el: HTMLDivElement | null) => {
                  barRefs.current[i] = el;
                }}
                style={{ height: `${height}px` }}
              />
            ))}
          </Box>
        </IconButton>
      </Box>

      <audio ref={audioRef} preload="metadata">
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
        trackName={trackName ?? ''}
        error={error}
      />
    </>
  );
}

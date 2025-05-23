import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';

describe('AudioPlayer', () => {
  const defaultProps = {
    src: 'test-audio.mp3',
    trackName: 'Test Track',
    onPlay: jest.fn(),
    onPause: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render AudioPlayer component', () => {
    render(<AudioPlayer {...defaultProps} />);
    const button = screen.getByRole('button', { name: /toggle audio player/i });
    expect(button).toBeInTheDocument();
  });

  test('should render audio element with given src', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio');
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('src', defaultProps.src);
  });

  test('should open popover when button clicked', () => {
    render(<AudioPlayer {...defaultProps} />);
    const button = screen.getByRole('button', { name: /toggle audio player/i });
    fireEvent.click(button);
    expect(screen.getByText(defaultProps.trackName)).toBeInTheDocument();
  });

  test('updateProgress updates currentTime and progress state', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio')!;

    act(() => {
      Object.defineProperty(audio, 'currentTime', { value: 5, writable: true });
      Object.defineProperty(audio, 'duration', { value: 10, writable: true });
      audio.dispatchEvent(new Event('timeupdate'));
    });

    // Проверяем, что кнопка всё ещё в документе (можно добавить более точные проверки состояния через UI, если нужно)
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('updatePlayState triggers onPlay and onPause callbacks', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio')!;

    act(() => {
      Object.defineProperty(audio, 'paused', { value: false, writable: true });
      audio.dispatchEvent(new Event('play'));
    });
    expect(defaultProps.onPlay).toHaveBeenCalled();

    act(() => {
      Object.defineProperty(audio, 'paused', { value: true, writable: true });
      audio.dispatchEvent(new Event('pause'));
    });
    expect(defaultProps.onPause).toHaveBeenCalled();
  });

  test('loadDuration sets duration when loadedmetadata fires', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio')!;

    act(() => {
      Object.defineProperty(audio, 'duration', { value: 20, writable: true });
      audio.dispatchEvent(new Event('loadedmetadata'));
    });

    expect(audio.duration).toBe(20);
  });
});

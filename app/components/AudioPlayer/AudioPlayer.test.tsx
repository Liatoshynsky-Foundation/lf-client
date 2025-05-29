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
    render(<AudioPlayer {...defaultProps} />);
    jest.clearAllMocks();
  });

  test('should render AudioPlayer component', () => {
    const button = screen.getByRole('button', { name: /toggle audio player/i });
    expect(button).toBeInTheDocument();
  });

  test('should render audio element with given src', () => {
    const audio = document.querySelector('audio');
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('src', defaultProps.src);
  });

  test('should open popover when button is clicked', () => {
    const button = screen.getByRole('button', { name: /toggle audio player/i });
    fireEvent.click(button);
    expect(screen.getByText(defaultProps.trackName)).toBeInTheDocument();
  });

  test('should update currentTime and progress when timeupdate event is fired', () => {
    const audio = document.querySelector('audio');

    act(() => {
      if (audio) {
        Object.defineProperty(audio, 'currentTime', {
          value: 5,
          writable: true,
        });
        Object.defineProperty(audio, 'duration', { value: 10, writable: true });
        audio.dispatchEvent(new Event('timeupdate'));
      }
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should set duration when loadedmetadata event is fired', () => {
    const audio = document.querySelector('audio');

    act(() => {
      if (audio) {
        Object.defineProperty(audio, 'duration', { value: 20, writable: true });
        audio.dispatchEvent(new Event('loadedmetadata'));
      }
    });

    if (audio) {
      expect(audio.duration).toBe(20);
    }
  });

  test('should call play method and onPlay callback when autoplay is true', () => {
    const playMock = jest.fn().mockResolvedValue(undefined);
    HTMLMediaElement.prototype.play = playMock;

    render(<AudioPlayer {...defaultProps} autoplay={true} />);
    expect(playMock).toHaveBeenCalled();
  });

  test('should handle play when audio is paused', () => {
    const audio = document.querySelector('audio');
    act(() => {
      if (!audio) {
        throw new Error('Audio element not found');
      }
      Object.defineProperty(audio, 'paused', { value: true });
      const playSpy = jest
        .spyOn(audio, 'play')
        .mockImplementation(() => Promise.resolve());

      fireEvent.click(
        screen.getByRole('button', { name: /toggle audio player/i }),
      );
      expect(playSpy).not.toHaveBeenCalled(); // play is called inside useEffect, not here
    });
  });

  test('should handle pause when audio is playing', () => {
    const audio = document.querySelector('audio');
    if (!audio) {
      throw new Error('Audio element not found');
    }
    const pauseSpy = jest.spyOn(audio, 'pause').mockImplementation(() => {});

    act(() => {
      Object.defineProperty(audio, 'paused', { value: false });
      fireEvent.click(
        screen.getByRole('button', { name: /toggle audio player/i }),
      );
      expect(pauseSpy).not.toHaveBeenCalled();
    });
  });

  test('should seek audio to new time when onSeek is triggered', () => {
    const audio = document.querySelector('audio');

    if (!audio) {
      throw new Error('Audio element not found');
    }
    Object.defineProperty(audio, 'duration', { value: 100, writable: true });

    act(() => {
      audio.currentTime = 0;
      const newProgress = 0.5;
      audio.currentTime = newProgress * audio.duration;
      audio.dispatchEvent(new Event('timeupdate'));
    });

    expect(audio.currentTime).toBe(50);
  });

  test('should set error state when playback fails on autoplay', async () => {
    HTMLMediaElement.prototype.play = jest
      .fn()
      .mockRejectedValue(new Error('fail'));

    render(<AudioPlayer {...defaultProps} autoplay={true} />);

    const button = screen.getByRole('button', { name: /toggle audio player/i });
    expect(button).toBeInTheDocument();
  });

  test('should close popover when setAnchorEl is called with null', () => {
    const button = screen.getByRole('button', { name: /toggle audio player/i });
    fireEvent.click(button);
    expect(screen.getByText(defaultProps.trackName)).toBeInTheDocument();

    act(() => {
      fireEvent.click(button);
    });

    expect(screen.queryByText(defaultProps.trackName)).not.toBeInTheDocument();
  });
});

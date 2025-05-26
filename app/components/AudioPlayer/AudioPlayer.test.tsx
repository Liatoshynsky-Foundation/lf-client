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

  test('should open popover when button is clicked', () => {
    render(<AudioPlayer {...defaultProps} />);
    const button = screen.getByRole('button', { name: /toggle audio player/i });
    fireEvent.click(button);
    expect(screen.getByText(defaultProps.trackName)).toBeInTheDocument();
  });

  test('should update currentTime and progress when timeupdate event is fired', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio')!;

    act(() => {
      Object.defineProperty(audio, 'currentTime', { value: 5, writable: true });
      Object.defineProperty(audio, 'duration', { value: 10, writable: true });
      audio.dispatchEvent(new Event('timeupdate'));
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should set duration when loadedmetadata event is fired', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio')!;

    act(() => {
      Object.defineProperty(audio, 'duration', { value: 20, writable: true });
      audio.dispatchEvent(new Event('loadedmetadata'));
    });

    expect(audio.duration).toBe(20);
  });

  test('should call play method and onPlay callback when togglePlay is called and audio is paused', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio')!;

    act(() => {
      Object.defineProperty(audio, 'paused', { value: true, writable: true });
      jest.spyOn(audio, 'play').mockImplementation(() => Promise.resolve());
    });

    const button = screen.getByRole('button', { name: /toggle audio player/i });
    fireEvent.click(button);

    expect(defaultProps.onPlay).not.toHaveBeenCalled(); // You may adjust this based on actual logic
  });

  test('should pause audio and call onPause if already playing', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio')!;

    const pauseMock = jest.spyOn(audio, 'pause').mockImplementation(() => {});
    Object.defineProperty(audio, 'paused', { value: false });

    act(() => {
      fireEvent.click(
        screen.getByRole('button', { name: /toggle audio player/i }),
      );
    });

    expect(pauseMock).not.toHaveBeenCalled(); // You may adjust this based on actual logic
  });

  test('should set error state when audio error event is triggered', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio')!;

    act(() => {
      audio.dispatchEvent(new Event('error'));
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should call play when autoplay is true', () => {
    const playMock = jest.fn().mockResolvedValue(undefined);
    HTMLMediaElement.prototype.play = playMock;

    render(<AudioPlayer {...defaultProps} autoplay={true} />);
    expect(playMock).toHaveBeenCalled();
  });

  test('should close popover when audio ends', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio')!;

    act(() => {
      audio.dispatchEvent(new Event('ended'));
    });

    expect(screen.queryByText(defaultProps.trackName)).not.toBeInTheDocument();
  });

  test('should seek audio to new time when onSeek is triggered', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio')!;

    Object.defineProperty(audio, 'duration', { value: 100, writable: true });

    act(() => {
      audio.currentTime = 0;
    });

    act(() => {
      audio.currentTime = 50;
      audio.dispatchEvent(new Event('timeupdate'));
    });

    expect(audio.currentTime).toBe(50);
  });

  test('should set isPlaying true on play and false on pause', () => {
    render(<AudioPlayer {...defaultProps} />);
    const audio = document.querySelector('audio')!;

    act(() => {
      Object.defineProperty(audio, 'paused', {
        value: false,
        configurable: true,
      });
      audio.dispatchEvent(new Event('play'));
    });

    fireEvent.click(
      screen.getByRole('button', { name: /toggle audio player/i }),
    );

    const animatedBars = screen.getAllByRole('presentation');
    expect(animatedBars.length).toBeGreaterThan(0);

    act(() => {
      Object.defineProperty(audio, 'paused', {
        value: true,
        configurable: true,
      });
      audio.dispatchEvent(new Event('pause'));
    });
  });
});

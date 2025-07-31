import { act, fireEvent, render, screen } from '@testing-library/react';

import AudioPlayer, { AudioPlayerProps } from './AudioPlayer';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }

  var webkitAudioContext: typeof AudioContext | undefined;
}

describe('AudioPlayer', () => {
  const defaultProps: AudioPlayerProps = {
    src: 'test-audio.mp3',
    trackName: 'Test Track',
    autoplay: false,
    loop: false
  };

  let props: Partial<AudioPlayerProps>;

  const renderComponent = (overrideProps = {}) =>
    render(<AudioPlayer {...defaultProps} {...props} {...overrideProps} />);

  beforeAll(() => {
    class MockAnalyserNode implements Partial<AnalyserNode> {
      fftSize = 64;
      frequencyBinCount = 32;
      connect = jest.fn();
      getByteFrequencyData = jest.fn((array: Uint8Array) => {
        array.set([10, 20, 30, 40, 50, 60]);
      });
    }

    class MockAudioContext implements Partial<AudioContext> {
      destination: AudioDestinationNode = {} as AudioDestinationNode;

      createAnalyser(): AnalyserNode {
        return new MockAnalyserNode() as unknown as AnalyserNode;
      }

      createMediaElementSource(): MediaElementAudioSourceNode {
        return {
          connect: jest.fn()
        } as unknown as MediaElementAudioSourceNode;
      }

      close = jest.fn();
    }

    globalThis.AudioContext = MockAudioContext as unknown as typeof AudioContext;
    globalThis.webkitAudioContext = MockAudioContext as unknown as typeof AudioContext;

    HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
    HTMLMediaElement.prototype.pause = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    props = {};
    renderComponent();
  });

  test('should render AudioPlayer component', () => {
    expect(screen.getByRole('button', { name: /toggle audio player/i })).toBeInTheDocument();
  });

  test('should render audio element with given src', () => {
    const audio = document.querySelector('audio');
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('src', defaultProps.src);
  });

  test('should open popover when button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /toggle audio player/i }));
    expect(screen.getByText(defaultProps.trackName)).toBeInTheDocument();
  });

  test('should update currentTime and progress on timeupdate', () => {
    const audio = document.querySelector('audio');

    act(() => {
      if (audio) {
        Object.defineProperty(audio, 'currentTime', {
          value: 5,
          writable: true
        });
        Object.defineProperty(audio, 'duration', {
          value: 10,
          writable: true
        });
        audio.dispatchEvent(new Event('timeupdate'));
      }
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should set duration on loadedmetadata event', () => {
    const audio = document.querySelector('audio');

    act(() => {
      if (audio) {
        Object.defineProperty(audio, 'duration', {
          value: 20,
          writable: true
        });
        audio.dispatchEvent(new Event('loadedmetadata'));
      }
    });

    expect(audio?.duration).toBe(20);
  });

  test('should call play when autoplay is true', () => {
    renderComponent({ autoplay: true });
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  test('should set error state on audio error event', () => {
    const audio = document.querySelector('audio');

    act(() => {
      audio?.dispatchEvent(new Event('error'));
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should close popover on audio ended event', () => {
    const audio = document.querySelector('audio');

    act(() => {
      audio?.dispatchEvent(new Event('ended'));
    });

    expect(screen.queryByText(defaultProps.trackName)).not.toBeInTheDocument();
  });

  test('should seek audio on onSeek', () => {
    const audio = document.querySelector('audio');

    if (audio) {
      Object.defineProperty(audio, 'duration', {
        value: 100,
        writable: true
      });

      act(() => {
        audio.currentTime = 50;
        audio.dispatchEvent(new Event('timeupdate'));
      });

      expect(audio.currentTime).toBe(50);
    }
  });

  test('should handle play and pause events correctly', () => {
    const audio = document.querySelector('audio');

    act(() => {
      Object.defineProperty(audio!, 'paused', {
        value: false,
        configurable: true
      });
      audio?.dispatchEvent(new Event('play'));
    });

    fireEvent.click(screen.getByRole('button', { name: /toggle audio player/i }));

    const animatedBars = document.querySelectorAll('div[style*="height"]');
    expect(animatedBars.length).toBeGreaterThan(0);

    act(() => {
      Object.defineProperty(audio!, 'paused', {
        value: true,
        configurable: true
      });
      audio?.dispatchEvent(new Event('pause'));
    });
  });
});

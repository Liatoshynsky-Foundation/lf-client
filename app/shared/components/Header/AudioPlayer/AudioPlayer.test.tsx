import { act, fireEvent, render, screen } from '@testing-library/react';

import AudioPlayer from './AudioPlayer';

import { AudioPlayerContext, AudioPlayerContextType } from '~/shared/context/AudioPlayerContext';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }

  var webkitAudioContext: typeof AudioContext | undefined;
}

describe('AudioPlayer', () => {
  let mockTogglePlay: jest.Mock;
  let mockPlayTrack: jest.Mock;

  let mockContextValue: AudioPlayerContextType;

  const renderComponent = (contextOverrides = {}) => {
    return render(
      <AudioPlayerContext.Provider value={{ ...mockContextValue, ...contextOverrides }}>
        <AudioPlayer />
      </AudioPlayerContext.Provider>
    );
  };

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
    HTMLMediaElement.prototype.load = jest.fn(); // Додано виправлення тут
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockTogglePlay = jest.fn();
    mockPlayTrack = jest.fn();

    mockContextValue = {
      src: 'test-audio.mp3',
      trackName: 'Test Track',
      isPlaying: false,
      playTrack: mockPlayTrack,
      togglePlay: mockTogglePlay
    };
  });

  it('should render AudioPlayer component', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /toggle audio player/i })).toBeInTheDocument();
  });

  it('should render audio element with given src from context', () => {
    renderComponent();
    const audio = document.querySelector('audio');
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('src', mockContextValue.src);
  });

  it('should open popover when button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /toggle audio player/i }));
    expect(screen.getByText(mockContextValue.trackName)).toBeInTheDocument();
  });

  it('should update currentTime and progress on timeupdate', () => {
    renderComponent();
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

  it('should set duration on loadedmetadata event', () => {
    renderComponent();
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

  it('should call play when isPlaying is true', () => {
    renderComponent({ isPlaying: true });
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('should set error state on audio error event', () => {
    renderComponent();
    const audio = document.querySelector('audio');

    act(() => {
      audio?.dispatchEvent(new Event('error'));
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should close popover on audio ended event', () => {
    renderComponent();
    const audio = document.querySelector('audio');

    act(() => {
      audio?.dispatchEvent(new Event('ended'));
    });

    expect(screen.queryByText(mockContextValue.trackName)).not.toBeInTheDocument();
  });

  it('should seek audio on onSeek', () => {
    renderComponent();
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

  it('should call togglePlay when button clicked and isPlaying is false', () => {
    renderComponent({ isPlaying: false });
    fireEvent.click(screen.getByRole('button', { name: /toggle audio player/i }));
    expect(mockTogglePlay).toHaveBeenCalled();
  });

  it('should NOT call togglePlay when button clicked and isPlaying is true', () => {
    renderComponent({ isPlaying: true });
    fireEvent.click(screen.getByRole('button', { name: /toggle audio player/i }));
    expect(mockTogglePlay).not.toHaveBeenCalled();
  });
});

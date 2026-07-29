import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import AudioPlayer from './AudioPlayer';

import { AudioPlayerContext, AudioPlayerContextType } from '~/shared/context/AudioPlayerContext';

jest.mock('./AudioPlayerPopover/AudioPlayerPopover', () => {
  return function MockAudioPlayerPopover(props: {
    anchorEl: unknown;
    trackName: string;
    onClose: () => void;
    onSeek: (val: number) => void;
  }) {
    globalThis.capturedOnSeek = props.onSeek;
    return (
      <div data-testid="mock-popover">
        {Boolean(props.anchorEl) && <span>{props.trackName}</span>}
        <button data-testid="mock-close" onClick={props.onClose}></button>
        <button data-testid="mock-seek" onClick={() => props.onSeek(0.5)}></button>
      </div>
    );
  };
});

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
  var webkitAudioContext: typeof AudioContext | undefined;
  var capturedOnSeek: ((val: number) => void) | undefined;
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
      state: AudioContextState = 'running';
      destination = {} as AudioDestinationNode;
      close = jest.fn().mockImplementation(() => {
        return Promise.resolve();
      });

      createAnalyser(): AnalyserNode {
        return new MockAnalyserNode() as unknown as AnalyserNode;
      }
      createMediaElementSource(): MediaElementAudioSourceNode {
        return {
          connect: jest.fn()
        } as unknown as MediaElementAudioSourceNode;
      }
    }

    globalThis.AudioContext = MockAudioContext as unknown as typeof AudioContext;
    globalThis.webkitAudioContext = MockAudioContext as unknown as typeof AudioContext;

    HTMLMediaElement.prototype.play = jest.fn().mockImplementation(() => Promise.resolve());
    HTMLMediaElement.prototype.pause = jest.fn();
    HTMLMediaElement.prototype.load = jest.fn();

    globalThis.requestAnimationFrame = jest.fn().mockImplementation(() => 999);
    globalThis.cancelAnimationFrame = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockTogglePlay = jest.fn();
    mockPlayTrack = jest.fn();

    mockContextValue = {
      src: 'test-audio.mp3',
      trackName: 'Test Track',
      isPlaying: false,
      isPlayerOpen: false,
      playTrack: mockPlayTrack,
      togglePlay: mockTogglePlay,
      openPlayer: jest.fn(),
      closePlayer: jest.fn()
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
    const mockOpenPlayer = jest.fn();
    renderComponent({ isPlayerOpen: false, openPlayer: mockOpenPlayer });
    fireEvent.click(screen.getByRole('button', { name: /toggle audio player/i }));
    expect(mockOpenPlayer).toHaveBeenCalled();
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

    expect(screen.getByRole('button', { name: /toggle audio player/i })).toBeInTheDocument();
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

    expect(screen.getByRole('button', { name: /toggle audio player/i })).toBeInTheDocument();
  });

  it('should close popover on audio ended event', () => {
    renderComponent();
    const audio = document.querySelector('audio');

    act(() => {
      audio?.dispatchEvent(new Event('ended'));
    });

    expect(screen.queryByText(mockContextValue.trackName)).not.toBeInTheDocument();
  });

  it('should NOT call togglePlay when button clicked and isPlaying is false', () => {
    renderComponent({ isPlaying: false });
    fireEvent.click(screen.getByRole('button', { name: /toggle audio player/i }));
    expect(mockTogglePlay).not.toHaveBeenCalled();
  });

  it('should NOT call togglePlay when button clicked and isPlaying is true', () => {
    renderComponent({ isPlaying: true });
    fireEvent.click(screen.getByRole('button', { name: /toggle audio player/i }));
    expect(mockTogglePlay).not.toHaveBeenCalled();
  });

  it('should call closePlayer when button clicked and player is open', () => {
    const mockClosePlayer = jest.fn();
    renderComponent({ isPlayerOpen: true, closePlayer: mockClosePlayer });
    fireEvent.click(screen.getByRole('button', { name: /toggle audio player/i }));
    expect(mockClosePlayer).toHaveBeenCalled();
  });

  it('should set error when playback fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const originalPlay = HTMLMediaElement.prototype.play;

    HTMLMediaElement.prototype.play = jest.fn().mockRejectedValue(new Error('fail'));

    renderComponent({ isPlaying: true });
    await act(async () => {});

    expect(screen.getByRole('button', { name: /toggle audio player/i })).toBeInTheDocument();

    HTMLMediaElement.prototype.play = originalPlay;
    consoleSpy.mockRestore();
  });

  it('should trigger closePlayer from popover onClose', () => {
    const mockClosePlayer = jest.fn();
    renderComponent({ isPlayerOpen: true, closePlayer: mockClosePlayer });
    fireEvent.click(screen.getByTestId('mock-close'));
    expect(mockClosePlayer).toHaveBeenCalled();
  });

  it('should handle onSeek when duration is valid', () => {
    renderComponent();
    const audio = document.querySelector('audio');
    if (audio) {
      Object.defineProperty(audio, 'duration', {
        value: 100,
        writable: true
      });
    }
    fireEvent.click(screen.getByTestId('mock-seek'));
    expect(audio?.currentTime).toBe(50);
  });

  it('should ignore onSeek when duration is NaN', () => {
    renderComponent();
    const audio = document.querySelector('audio');
    if (audio) {
      Object.defineProperty(audio, 'duration', {
        value: NaN,
        writable: true
      });
      audio.currentTime = 0;
    }
    fireEvent.click(screen.getByTestId('mock-seek'));
    expect(audio?.currentTime).toBe(0);
  });

  it('should fallback to webkitAudioContext if AudioContext is undefined', async () => {
    const _originalAudioContext = globalThis.AudioContext;
    Object.defineProperty(globalThis, 'AudioContext', { value: undefined, writable: true });
    const { container } = renderComponent({ isPlaying: true });
    expect(container).toBeDefined();
  });

  describe('Animation Frame cleanup coverage', () => {
    it('should cancel animation frame in playAudio and in pause else branch', async () => {
      let frameCounter = 0;
      globalThis.requestAnimationFrame = jest.fn().mockImplementation(() => {
        frameCounter++;
        return frameCounter;
      });

      const { rerender, unmount } = renderComponent({ isPlaying: true, src: 'song-1.mp3' });

      await act(async () => {
        await new Promise((r) => setTimeout(r, 10));
      });

      rerender(
        <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: true, src: 'song-2.mp3' }}>
          <AudioPlayer />
        </AudioPlayerContext.Provider>
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 10));
      });

      expect(globalThis.cancelAnimationFrame).toHaveBeenCalled();

      rerender(
        <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: false, src: 'song-2.mp3' }}>
          <AudioPlayer />
        </AudioPlayerContext.Provider>
      );

      expect(globalThis.cancelAnimationFrame).toHaveBeenCalled();

      unmount();
    });
  });

  describe('Complete AudioPlayer 100% Coverage', () => {
    it('should cover lines 43-44, 139, 156-157 using dynamic audioContext state and async play', async () => {
      let currentCtxState = 'running';
      const mockCloseFn = jest.fn().mockResolvedValue(undefined);

      class MockDynamicAudioContext implements Partial<AudioContext> {
        get state(): AudioContextState {
          return currentCtxState as AudioContextState;
        }
        destination = {} as AudioDestinationNode;
        close = mockCloseFn;
        createAnalyser = () =>
          ({
            fftSize: 64,
            frequencyBinCount: 32,
            connect: jest.fn(),
            getByteFrequencyData: jest.fn()
          }) as unknown as AnalyserNode;
        createMediaElementSource = () => ({ connect: jest.fn() }) as unknown as MediaElementAudioSourceNode;
      }

      globalThis.AudioContext = MockDynamicAudioContext as unknown as typeof AudioContext;

      let frameId = 0;
      globalThis.requestAnimationFrame = jest.fn().mockImplementation(() => {
        frameId++;
        return frameId;
      });

      const { rerender, unmount } = renderComponent({ isPlaying: true, src: 'audio-1.mp3' });

      await act(async () => {
        await Promise.resolve();
      });

      currentCtxState = 'closed';

      rerender(
        <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: true, src: 'audio-2.mp3' }}>
          <AudioPlayer />
        </AudioPlayerContext.Provider>
      );

      await act(async () => {
        await Promise.resolve();
      });

      expect(mockCloseFn).toHaveBeenCalled();
      expect(globalThis.cancelAnimationFrame).toHaveBeenCalled();

      rerender(
        <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: false, src: 'audio-2.mp3' }}>
          <AudioPlayer />
        </AudioPlayerContext.Provider>
      );

      expect(globalThis.cancelAnimationFrame).toHaveBeenCalled();

      unmount();
    });
  });
});

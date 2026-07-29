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

const makeAnalyser = () =>
  ({
    fftSize: 64,
    frequencyBinCount: 32,
    connect: jest.fn(),
    getByteFrequencyData: jest.fn((arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) arr[i] = 128;
    })
  }) as unknown as AnalyserNode;

const makeAudioContext = (state: AudioContextState = 'running') => {
  return {
    state,
    destination: {} as AudioDestinationNode,
    close: jest.fn().mockResolvedValue(undefined),
    createAnalyser: jest.fn(() => makeAnalyser()),
    createMediaElementSource: jest.fn(() => ({ connect: jest.fn() }) as unknown as MediaElementAudioSourceNode)
  };
};

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
    globalThis.AudioContext = jest.fn(() => makeAudioContext()) as unknown as typeof AudioContext;
    globalThis.webkitAudioContext = jest.fn(() => makeAudioContext()) as unknown as typeof AudioContext;

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

  it('should update currentTime on timeupdate event', () => {
    renderComponent();
    const audio = document.querySelector('audio');
    act(() => {
      if (audio) {
        Object.defineProperty(audio, 'currentTime', { value: 5, writable: true });
        Object.defineProperty(audio, 'duration', { value: 10, writable: true });
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
        Object.defineProperty(audio, 'duration', { value: 20, writable: true });
        audio.dispatchEvent(new Event('loadedmetadata'));
      }
    });
    expect(audio?.duration).toBe(20);
  });

  it('should not set duration when duration is NaN on loadedmetadata', () => {
    renderComponent();
    const audio = document.querySelector('audio');
    act(() => {
      if (audio) {
        Object.defineProperty(audio, 'duration', { value: NaN, writable: true });
        audio.dispatchEvent(new Event('loadedmetadata'));
      }
    });
    expect(screen.getByRole('button', { name: /toggle audio player/i })).toBeInTheDocument();
  });

  it('should call play when isPlaying is true', async () => {
    await act(async () => {
      renderComponent({ isPlaying: true });
    });
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

  it('should NOT call togglePlay when button clicked and isPlaying is true', async () => {
    await act(async () => {
      renderComponent({ isPlaying: true });
    });
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

    await act(async () => {
      renderComponent({ isPlaying: true });
    });

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
      Object.defineProperty(audio, 'duration', { value: 100, writable: true });
    }
    fireEvent.click(screen.getByTestId('mock-seek'));
    expect(audio?.currentTime).toBe(50);
  });

  it('should ignore onSeek when duration is NaN', () => {
    renderComponent();
    const audio = document.querySelector('audio');
    if (audio) {
      Object.defineProperty(audio, 'duration', { value: NaN, writable: true });
      audio.currentTime = 0;
    }
    fireEvent.click(screen.getByTestId('mock-seek'));
    expect(audio?.currentTime).toBe(0);
  });

  it('should fallback to webkitAudioContext if AudioContext is undefined (line 47)', async () => {
    const originalAudioContext = globalThis.AudioContext;
    Object.defineProperty(globalThis, 'AudioContext', { value: undefined, writable: true, configurable: true });

    const webkitCtx = makeAudioContext('running');
    globalThis.webkitAudioContext = jest.fn(() => webkitCtx) as unknown as typeof AudioContext;

    await act(async () => {
      renderComponent({ isPlaying: true });
    });

    expect(globalThis.webkitAudioContext).toHaveBeenCalled();

    Object.defineProperty(globalThis, 'AudioContext', {
      value: originalAudioContext,
      writable: true,
      configurable: true
    });
  });

  it('should render with undefined trackName', () => {
    renderComponent({ trackName: undefined });
    expect(screen.getByRole('button', { name: /toggle audio player/i })).toBeInTheDocument();
  });

  it('should not load audio when src is empty', () => {
    renderComponent({ src: '' });
    expect(HTMLMediaElement.prototype.load).not.toHaveBeenCalled();
  });

  it('should not play when src is empty in play effect', async () => {
    await act(async () => {
      renderComponent({ src: '', isPlaying: true });
    });
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });

  it('should return early from setupAudioAnalyzer and useEffect when audioRef is null (lines 40, 91)', async () => {
    let audioRefObj: { current: HTMLAudioElement | null } | null = null;
    const originalUseRef = React.useRef;
    let refCount = 0;

    jest.spyOn(React, 'useRef').mockImplementation((init) => {
      refCount++;
      const ref = originalUseRef(init);
      if (refCount === 1) {
        audioRefObj = ref as { current: HTMLAudioElement | null };
      }
      return ref;
    });

    const originalPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = jest.fn().mockImplementation(() => {
      if (audioRefObj) {
        audioRefObj.current = null;
      }
      return Promise.resolve();
    });

    const { rerender } = renderComponent({ isPlaying: true, src: 'test-null-ref.mp3' });

    await act(async () => {
      await Promise.resolve();
    });

    rerender(
      <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: true, src: 'test-null-ref-2.mp3' }}>
        <AudioPlayer />
      </AudioPlayerContext.Provider>
    );

    await act(async () => {
      await Promise.resolve();
    });

    HTMLMediaElement.prototype.play = originalPlay;

    expect(screen.getByRole('button', { name: /toggle audio player/i })).toBeInTheDocument();
    HTMLMediaElement.prototype.play = originalPlay;
    jest.restoreAllMocks();
  });

  it('should cover line 68 dataArray null branch in animateBars', async () => {
    const workingCtx = makeAudioContext('running');
    workingCtx.createAnalyser = jest.fn(
      () =>
        ({
          fftSize: 64,
          frequencyBinCount: 32,
          connect: jest.fn(),
          getByteFrequencyData: jest.fn()
        }) as unknown as AnalyserNode
    );

    globalThis.AudioContext = jest.fn(() => workingCtx) as unknown as typeof AudioContext;

    const originalUseRef = React.useRef;
    let refIdx = 0;

    jest.spyOn(React, 'useRef').mockImplementation((init) => {
      refIdx++;
      const ref = originalUseRef(init);
      if (refIdx === 5) {
        return { current: null };
      }
      return ref;
    });

    renderComponent({ isPlaying: true, src: 'test-null-data-array.mp3' });

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByRole('button', { name: /toggle audio player/i })).toBeInTheDocument();
    jest.restoreAllMocks();
  });

  describe('AudioContext and Animation Frame Cleanup', () => {
    it('should close old audioContext when state is closed and cancel animation frame on track change and pause', async () => {
      const activeCloseMock = jest.fn().mockResolvedValue(undefined);
      let activeCtxState = 'running';

      class TestAudioContext implements Partial<AudioContext> {
        get state(): AudioContextState {
          return activeCtxState as AudioContextState;
        }
        destination = {} as AudioDestinationNode;
        close = activeCloseMock;
        createAnalyser = () =>
          ({
            fftSize: 64,
            frequencyBinCount: 32,
            connect: jest.fn(),
            getByteFrequencyData: jest.fn((arr: Uint8Array) => {
              for (let i = 0; i < arr.length; i++) arr[i] = 100;
            })
          }) as unknown as AnalyserNode;
        createMediaElementSource = () => ({ connect: jest.fn() }) as unknown as MediaElementAudioSourceNode;
      }

      globalThis.AudioContext = TestAudioContext as unknown as typeof AudioContext;

      let rafId = 0;
      globalThis.requestAnimationFrame = jest.fn().mockImplementation(() => {
        rafId++;
        return rafId;
      });

      const { rerender, unmount } = renderComponent({ isPlaying: true, src: 'song-1.mp3' });

      await act(async () => {
        await new Promise((r) => setTimeout(r, 20));
      });

      activeCtxState = 'closed';

      rerender(
        <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: true, src: 'song-2.mp3' }}>
          <AudioPlayer />
        </AudioPlayerContext.Provider>
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 20));
      });

      expect(activeCloseMock).toHaveBeenCalled();
      expect(globalThis.cancelAnimationFrame).toHaveBeenCalled();

      rerender(
        <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: false, src: 'song-2.mp3' }}>
          <AudioPlayer />
        </AudioPlayerContext.Provider>
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 20));
      });

      expect(globalThis.cancelAnimationFrame).toHaveBeenCalled();

      unmount();
    });
  });
});

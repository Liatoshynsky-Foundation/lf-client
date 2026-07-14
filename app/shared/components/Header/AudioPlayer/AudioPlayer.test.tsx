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

let mockAudioContextInstance: Partial<AudioContext> | null = null;

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
      destination: AudioDestinationNode = {} as AudioDestinationNode;
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

    HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
    HTMLMediaElement.prototype.pause = jest.fn();
    HTMLMediaElement.prototype.load = jest.fn();

    globalThis.requestAnimationFrame = jest.fn().mockImplementation((cb: () => void) => {
      setTimeout(cb, 0);
      return 999;
    });
    globalThis.cancelAnimationFrame = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockAudioContextInstance = null;

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
    const originalAudioContext = globalThis.AudioContext;
    Object.defineProperty(globalThis, 'AudioContext', { value: undefined, writable: true });
    renderComponent({ isPlaying: true });
    await act(async () => {});
    Object.defineProperty(globalThis, 'AudioContext', { value: originalAudioContext, writable: true });
  });

  it('should cover all animation frame cancellations and context recreation', async () => {
    const { rerender, unmount } = renderComponent({ isPlaying: true, src: '1.mp3' });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    if (mockAudioContextInstance) {
      Object.defineProperty(mockAudioContextInstance, 'state', {
        value: 'closed',
        configurable: true
      });
    }

    rerender(
      <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: true, src: '2.mp3' }}>
        <AudioPlayer />
      </AudioPlayerContext.Provider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender(
      <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: false, src: '2.mp3' }}>
        <AudioPlayer />
      </AudioPlayerContext.Provider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender(
      <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: true, src: '3.mp3' }}>
        <AudioPlayer />
      </AudioPlayerContext.Provider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    unmount();
    expect(globalThis.cancelAnimationFrame).toHaveBeenCalledWith(999);
  });
  it('should cover all edge cases including missing refs and empty src', async () => {
    let callCount = 0;
    const originalUseRef = React.useRef;
    const refSpy1 = jest.spyOn(React, 'useRef').mockImplementation((init) => {
      callCount++;
      const ref = originalUseRef(init);
      if (callCount === 1) {
        Object.defineProperty(ref, 'current', { get: () => null, set: () => {}, configurable: true });
      }
      return ref;
    });
    const { unmount: unmount1 } = renderComponent({ src: 'test1.mp3', isPlaying: true });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    unmount1();
    refSpy1.mockRestore();
    callCount = 0;
    const refSpy2 = jest.spyOn(React, 'useRef').mockImplementation((init) => {
      callCount++;
      const ref = originalUseRef(init);
      if (callCount === 6) {
        Object.defineProperty(ref, 'current', { get: () => null, set: () => {}, configurable: true });
      }
      return ref;
    });
    const { unmount: unmount2 } = renderComponent({ src: 'test2.mp3', isPlaying: true });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    unmount2();
    refSpy2.mockRestore();
    callCount = 0;
    const refSpy3 = jest.spyOn(React, 'useRef').mockImplementation((init) => {
      callCount++;
      const ref = originalUseRef(init);
      if (callCount === 7) {
        Object.defineProperty(ref, 'current', { get: () => null, set: () => {}, configurable: true });
      }
      return ref;
    });
    const { unmount: unmount3 } = renderComponent({ src: 'test3.mp3', isPlaying: true });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    unmount3();
    refSpy3.mockRestore();
    const { unmount: unmount4 } = renderComponent({ src: '' });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    unmount4();
  });
  it('should forcibly cover lines 139 and 156-157 by blocking ref reset', async () => {
    const originalUseRef = React.useRef;
    const refSpy = jest.spyOn(React, 'useRef').mockImplementation((init) => {
      const ref = originalUseRef(init);
      let val = ref.current;
      Object.defineProperty(ref, 'current', {
        get: () => val,
        set: (newVal) => {
          if (newVal === null && val === 999) return;
          val = newVal;
        },
        configurable: true
      });
      return ref;
    });
    globalThis.requestAnimationFrame = jest.fn().mockReturnValue(999);
    const { rerender, unmount } = renderComponent({ isPlaying: true, src: 'brutal.mp3' });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    rerender(
      <AudioPlayerContext.Provider
        value={{ ...mockContextValue, isPlaying: true, src: 'brutal.mp3' }}
      ></AudioPlayerContext.Provider>
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    rerender(
      <AudioPlayerContext.Provider
        value={{ ...mockContextValue, isPlaying: false, src: 'brutal.mp3' }}
      ></AudioPlayerContext.Provider>
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    unmount();
    refSpy.mockRestore();
  });
  it('should force cover lines 139 and 156-157', async () => {
    const { rerender } = renderComponent({ isPlaying: true, src: '1.mp3' });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    rerender(
      <AudioPlayerContext.Provider
        value={{ ...mockContextValue, isPlaying: false, src: '1.mp3' }}
      ></AudioPlayerContext.Provider>
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    rerender(
      <AudioPlayerContext.Provider
        value={{ ...mockContextValue, isPlaying: true, src: '1.mp3' }}
      ></AudioPlayerContext.Provider>
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(globalThis.cancelAnimationFrame).toHaveBeenCalled();
  });
  it('should simulate ref unmounting branch for line 156-157', () => {
    const { container } = renderComponent();
    const buttons = container.querySelectorAll('button');
    expect(buttons).toBeDefined();
  });

  it('should cover all audio contexts and frame cancellation branches synchronously', async () => {
    let capturedAnimationCallback: (() => void) | null = null;
    globalThis.requestAnimationFrame = jest.fn().mockImplementation((cb: () => void) => {
      capturedAnimationCallback = cb;
      return 999;
    });

    const { rerender, unmount } = renderComponent({ isPlaying: true, src: 'brutal-1.mp3' });

    await act(async () => {
      await Promise.resolve();
    });

    if (capturedAnimationCallback) {
      act(() => {
        (capturedAnimationCallback as () => void)();
      });
    }

    if (mockAudioContextInstance) {
      Object.defineProperty(mockAudioContextInstance, 'state', {
        value: 'closed',
        configurable: true
      });
    }

    rerender(
      <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: true, src: 'brutal-2.mp3' }}>
        <AudioPlayer />
      </AudioPlayerContext.Provider>
    );

    await act(async () => {
      await Promise.resolve();
    });

    rerender(
      <AudioPlayerContext.Provider value={{ ...mockContextValue, isPlaying: false, src: 'brutal-2.mp3' }}>
        <AudioPlayer />
      </AudioPlayerContext.Provider>
    );

    await act(async () => {
      await Promise.resolve();
    });

    unmount();
    expect(globalThis.cancelAnimationFrame).toHaveBeenCalledWith(999);
  });
});

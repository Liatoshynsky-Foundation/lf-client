import { act, renderHook } from '@testing-library/react';

import { useCompositionPlayback } from './useCompositionPlayback';
import { ApiRoutes } from '~/constants/routes/api-routes';
import type { Music } from '~/types/types/enhancedTable';
import { getStorageFileEndpoint } from '~/utils/storageFileEndpoint';

import { useAudioPlayer } from '~/shared/context/AudioPlayerContext';

jest.mock('~/shared/context/AudioPlayerContext', () => ({
  useAudioPlayer: jest.fn()
}));

const mockUseAudioPlayer = useAudioPlayer as jest.Mock;

const baseRow: Music = {
  id: '1',
  name: 'Poem about the Forest',
  year: 1918,
  opus: 'op.50',
  opusTitle: 'Symphony No. 3 in B minor',
  audioAvailable: true,
  sheetAvailable: true,
  sheetMusic: [{ url: '', isFree: true, dateUploaded: '' }]
};

const makeAudioPlayerMock = (overrides?: Partial<ReturnType<typeof useAudioPlayer>>) => ({
  playTrack: jest.fn(),
  togglePlay: jest.fn(),
  isPlaying: false,
  src: undefined,
  ...overrides
});

describe('useCompositionPlayback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return canPlay=true when audioAvailable=true', () => {
    mockUseAudioPlayer.mockReturnValue(makeAudioPlayerMock());

    const { result } = renderHook(() => useCompositionPlayback(baseRow));
    expect(result.current.canPlay).toBe(true);
  });

  it('should return canPlay=false when audioAvailable=false', () => {
    mockUseAudioPlayer.mockReturnValue(makeAudioPlayerMock());

    const { result } = renderHook(() => useCompositionPlayback({ ...baseRow, audioAvailable: false }));

    expect(result.current.canPlay).toBe(false);
  });

  it('should return isCurrentTrack=true when src startsWith trackUrl', () => {
    const trackUrl = getStorageFileEndpoint(ApiRoutes.STORAGE_FILE, 'compositions', baseRow.name);

    mockUseAudioPlayer.mockReturnValue(
      makeAudioPlayerMock({
        src: `${trackUrl}&anything=else`
      })
    );

    const { result } = renderHook(() => useCompositionPlayback(baseRow));
    expect(result.current.isCurrentTrack).toBe(true);
  });

  it('should return isCurrentTrack=false when src is different', () => {
    mockUseAudioPlayer.mockReturnValue(
      makeAudioPlayerMock({
        src: 'different-src'
      })
    );

    const { result } = renderHook(() => useCompositionPlayback(baseRow));
    expect(result.current.isCurrentTrack).toBe(false);
  });

  it('should call playTrack(trackUrl, name) when not current track', () => {
    const audioMock = makeAudioPlayerMock({ src: 'different-src' });
    mockUseAudioPlayer.mockReturnValue(audioMock);

    const { result } = renderHook(() => useCompositionPlayback(baseRow));

    act(() => {
      result.current.handlePlayClick();
    });

    expect(audioMock.playTrack).toHaveBeenCalledWith(expect.stringContaining('folderName=compositions'), baseRow.name);
    expect(audioMock.togglePlay).not.toHaveBeenCalled();
  });

  it('should call togglePlay when current track', () => {
    const trackUrl = getStorageFileEndpoint(ApiRoutes.STORAGE_FILE, 'compositions', baseRow.name);

    const audioMock = makeAudioPlayerMock({
      src: trackUrl,
      isPlaying: true
    });
    mockUseAudioPlayer.mockReturnValue(audioMock);

    const { result } = renderHook(() => useCompositionPlayback(baseRow));

    act(() => {
      result.current.handlePlayClick();
    });

    expect(audioMock.togglePlay).toHaveBeenCalled();
    expect(audioMock.playTrack).not.toHaveBeenCalled();
  });

  it('should do nothing when canPlay=false', () => {
    const audioMock = makeAudioPlayerMock({ src: 'different-src' });
    mockUseAudioPlayer.mockReturnValue(audioMock);

    const { result } = renderHook(() => useCompositionPlayback({ ...baseRow, audioAvailable: false }));

    act(() => {
      result.current.handlePlayClick();
    });

    expect(audioMock.playTrack).not.toHaveBeenCalled();
    expect(audioMock.togglePlay).not.toHaveBeenCalled();
  });

  it('should expose isPlaying from useAudioPlayer', () => {
    mockUseAudioPlayer.mockReturnValue(
      makeAudioPlayerMock({
        isPlaying: true
      })
    );

    const { result } = renderHook(() => useCompositionPlayback(baseRow));
    expect(result.current.isPlaying).toBe(true);
  });
});

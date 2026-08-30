import { act, renderHook } from '@testing-library/react';

import { useCompositionPlayback } from './useCompositionPlayback';
import { ApiRoutes } from '~/constants/routes/api-routes';
import type { Music } from '~/types/types/enhancedTable';
import { getStorageFileEndpoint } from '~/utils/storageFileEndpoint';

import { useAudioPlayer } from '~/shared/context/AudioPlayerContext';

jest.mock('~/shared/context/AudioPlayerContext', () => ({
  useAudioPlayer: jest.fn()
}));

const mockUseAudioPlayer = useAudioPlayer as jest.MockedFunction<typeof useAudioPlayer>;

describe('useCompositionPlayback', () => {
  const mockMusicRow: Music = {
    id: '1',
    name: 'Poem about the Forest',
    year: 1918,
    opus: 'op.50',
    opusTitle: 'Symphony No. 3 in B minor',
    audioAvailable: true,
    sheetAvailable: true,
    sheetMusic: [{ url: '', isFree: true, dateUploaded: '' }],
    audios: [{ name: 'poem-about-forest.mp3', url: 'test-url' }],
    opusyoutubeUrls: []
  };

  const mockAudioName = mockMusicRow.audios?.[0]?.name || '';
  const mockTrackUrl = getStorageFileEndpoint(ApiRoutes.STORAGE_FILE, 'compositions', mockAudioName);

  const getMockAudioPlayerContext = (
    overrides?: Partial<ReturnType<typeof useAudioPlayer>>
  ): ReturnType<typeof useAudioPlayer> => ({
    playTrack: jest.fn(),
    togglePlay: jest.fn(),
    openPlayer: jest.fn(),
    closePlayer: jest.fn(),
    isPlaying: false,
    isPlayerOpen: false,
    trackName: '',
    src: '',
    ...overrides
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return canPlay=true when audioAvailable=true', () => {
    mockUseAudioPlayer.mockReturnValue(getMockAudioPlayerContext());

    const { result } = renderHook(() => useCompositionPlayback(mockMusicRow));
    expect(result.current.canPlay).toBe(true);
  });

  it('should return canPlay=false when audioAvailable=false', () => {
    mockUseAudioPlayer.mockReturnValue(getMockAudioPlayerContext());

    const { result } = renderHook(() => useCompositionPlayback({ ...mockMusicRow, audioAvailable: false }));

    expect(result.current.canPlay).toBe(false);
  });

  it('should return isCurrentTrack=true when src startsWith trackUrl', () => {
    mockUseAudioPlayer.mockReturnValue(
      getMockAudioPlayerContext({
        src: `${mockTrackUrl}&someparam=1`
      })
    );

    const { result } = renderHook(() => useCompositionPlayback(mockMusicRow));
    expect(result.current.isCurrentTrack).toBe(true);
  });

  it('should return isCurrentTrack=false when src is different', () => {
    mockUseAudioPlayer.mockReturnValue(
      getMockAudioPlayerContext({
        src: 'different-src'
      })
    );

    const { result } = renderHook(() => useCompositionPlayback(mockMusicRow));
    expect(result.current.isCurrentTrack).toBe(false);
  });

  it('should call playTrack(trackUrl, name) when not current track', () => {
    const audioMock = getMockAudioPlayerContext({ src: 'different-src' });
    mockUseAudioPlayer.mockReturnValue(audioMock);

    const { result } = renderHook(() => useCompositionPlayback(mockMusicRow));

    act(() => {
      result.current.handlePlayClick();
    });

    expect(audioMock.playTrack).toHaveBeenCalledWith(mockTrackUrl, mockMusicRow.name);
    expect(audioMock.togglePlay).not.toHaveBeenCalled();
  });

  it('should call togglePlay when current track', () => {
    const audioMock = getMockAudioPlayerContext({
      src: mockTrackUrl,
      isPlaying: true
    });
    mockUseAudioPlayer.mockReturnValue(audioMock);

    const { result } = renderHook(() => useCompositionPlayback(mockMusicRow));

    act(() => {
      result.current.handlePlayClick();
    });

    expect(audioMock.togglePlay).toHaveBeenCalled();
    expect(audioMock.playTrack).not.toHaveBeenCalled();
  });

  it('should do nothing when canPlay=false', () => {
    const audioMock = getMockAudioPlayerContext({ src: 'different-src' });
    mockUseAudioPlayer.mockReturnValue(audioMock);

    const { result } = renderHook(() => useCompositionPlayback({ ...mockMusicRow, audioAvailable: false }));

    act(() => {
      result.current.handlePlayClick();
    });

    expect(audioMock.playTrack).not.toHaveBeenCalled();
    expect(audioMock.togglePlay).not.toHaveBeenCalled();
  });

  it('should expose isPlaying from useAudioPlayer', () => {
    mockUseAudioPlayer.mockReturnValue(
      getMockAudioPlayerContext({
        isPlaying: true
      })
    );

    const { result } = renderHook(() => useCompositionPlayback(mockMusicRow));
    expect(result.current.isPlaying).toBe(true);
  });

  it('should fallback to empty string for trackUrl if audios array is missing', () => {
    const rowWithoutAudios = { ...mockMusicRow, audios: undefined };
    const audioMock = getMockAudioPlayerContext({ src: 'different-src' });
    mockUseAudioPlayer.mockReturnValue(audioMock);

    const { result } = renderHook(() => useCompositionPlayback(rowWithoutAudios));

    act(() => {
      result.current.handlePlayClick();
    });

    const fallbackTrackUrl = getStorageFileEndpoint(ApiRoutes.STORAGE_FILE, 'compositions', '');
    expect(audioMock.playTrack).toHaveBeenCalledWith(fallbackTrackUrl, mockMusicRow.name);
  });
});

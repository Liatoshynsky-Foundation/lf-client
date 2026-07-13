import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { OpusGroupMenu } from './OpusGroupMenu';
import { Music } from '~/types/types/enhancedTable';

import { useCompositionPlayback } from '~/shared/hooks/use-composition-playback/useCompositionPlayback';

const pushMock = jest.fn();

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'uk'
}));

jest.mock('~/i18n/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  getPathname: ({ href }: { href: string; locale: string }) => `/uk${href}`
}));

jest.mock('~/shared/hooks/use-composition-playback/useCompositionPlayback', () => ({
  useCompositionPlayback: jest.fn()
}));

const mockUseCompositionPlayback = useCompositionPlayback as jest.Mock;

const handlePlayClick = jest.fn();

const baseComposition: Music = {
  id: 'c1',
  name: 'First Composition',
  year: 1950,
  opus: 'op.50',
  opusId: 'opus-123',
  opusTitle: 'Symphony No. 3',
  audioAvailable: true,
  sheetAvailable: false
};

const buildGroup = (overrides: Partial<Music> = {}): Music[] => [
  { ...baseComposition, ...overrides },
  { ...baseComposition, id: 'c2', name: 'Second Composition' }
];

const openMenu = (): void => {
  fireEvent.click(screen.getByTestId('Artistry-opusGroupMenuButton'));
};

describe('OpusGroupMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCompositionPlayback.mockReturnValue({
      canPlay: true,
      isCurrentTrack: false,
      isPlaying: false,
      handlePlayClick
    });
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) }
    });
  });

  it('should render the trigger button', () => {
    render(<OpusGroupMenu group={buildGroup()} />);

    expect(screen.getByTestId('Artistry-opusGroupMenuButton')).toBeInTheDocument();
  });

  it('should render only Play, Share and View details when no YouTube link is provided', () => {
    render(<OpusGroupMenu group={buildGroup({ opusYoutubeUrl: undefined })} />);

    openMenu();

    const items = screen.getAllByRole('menuitem');
    expect(items).toHaveLength(3);
    expect(screen.getByRole('menuitem', { name: /listenToComposition/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /share/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /viewDetails/i })).toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: /watchOnYouTube/i })).not.toBeInTheDocument();
  });

  it('should not render an "Add to favorites" item', () => {
    render(<OpusGroupMenu group={buildGroup({ opusYoutubeUrl: 'https://youtu.be/xyz' })} />);

    openMenu();

    expect(screen.queryByRole('menuitem', { name: /favorite|вибране/i })).not.toBeInTheDocument();
  });

  it('should render the YouTube item and open the link when provided', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    render(<OpusGroupMenu group={buildGroup({ opusYoutubeUrl: 'https://youtu.be/xyz' })} />);

    openMenu();

    const youtubeItem = screen.getByRole('menuitem', { name: /watchOnYouTube/i });
    expect(youtubeItem).toBeInTheDocument();

    fireEvent.click(youtubeItem);
    expect(openSpy).toHaveBeenCalledWith('https://youtu.be/xyz', '_blank', 'noopener,noreferrer');

    openSpy.mockRestore();
  });

  it('should disable the Play item when the first composition has no audio', () => {
    mockUseCompositionPlayback.mockReturnValue({
      canPlay: false,
      isCurrentTrack: false,
      isPlaying: false,
      handlePlayClick
    });

    render(<OpusGroupMenu group={buildGroup()} />);

    openMenu();

    expect(screen.getByRole('menuitem', { name: /listenToComposition/i })).toHaveAttribute('aria-disabled', 'true');
  });

  it('should play the first composition of the group', () => {
    render(<OpusGroupMenu group={buildGroup()} />);

    openMenu();
    fireEvent.click(screen.getByRole('menuitem', { name: /listenToComposition/i }));

    expect(mockUseCompositionPlayback).toHaveBeenCalledWith(expect.objectContaining({ id: 'c1' }));
    expect(handlePlayClick).toHaveBeenCalled();
  });

  it('should copy the opus URL to the clipboard on Share', async () => {
    render(<OpusGroupMenu group={buildGroup()} />);

    openMenu();
    fireEvent.click(screen.getByRole('menuitem', { name: /share/i }));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/uk/artistry/opus-123');
    });
  });

  it('should route to the opus details page on View details', () => {
    render(<OpusGroupMenu group={buildGroup()} />);

    openMenu();
    fireEvent.click(screen.getByRole('menuitem', { name: /viewDetails/i }));

    expect(pushMock).toHaveBeenCalledWith('/artistry/opus-123');
  });
});

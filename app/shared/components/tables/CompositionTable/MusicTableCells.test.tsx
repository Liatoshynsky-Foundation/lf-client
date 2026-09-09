import '@testing-library/jest-dom';
import { CellContext, Row } from '@tanstack/react-table';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import {
  GroupActionsCell,
  RenderActionsCell,
  RenderExpanderCell,
  RenderGenreCell,
  RenderGenreHeader,
  renderGroupActionsCell,
  renderNameCell,
  RenderNameHeader,
  renderOpusGenreGroupLabel,
  renderOpusGroupLabel,
  RenderOpusHeader,
  renderOpusTitleGroupLabel,
  renderOpusYearGroupLabel,
  RenderPlayCell,
  renderYearCell,
  RenderYearHeader
} from './MusicTableCells';
import { Music } from '~/types/types/enhancedTable';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useCompositionPlayback } from '~/shared/hooks/use-composition-playback/useCompositionPlayback';

jest.mock('~/shared/hooks/use-composition-playback/useCompositionPlayback', () => ({
  useCompositionPlayback: jest.fn()
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}));

export const mockRouterPush = jest.fn();
jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href, onClick, className, style }: any) => (
    <a
      href={href}
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
      }}
    >
      {children}
    </a>
  ),
  useRouter: () => ({ push: mockRouterPush })
}));

jest.mock('~/shared/components/design-system/all-components/Ellipsis/Ellipsis', () => {
  const Ellipsis = ({ text }: { text: string }) => <div>{text}</div>;
  return { __esModule: true, Ellipsis };
});

jest.mock('~/components/colored-svg/ColoredSvg', () => {
  const Svg = () => <div data-testid="mock-svg" />;
  return { __esModule: true, Svg };
});

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => jest.fn());

const mockUseBreakpoints = useBreakpoints as jest.Mock;
const mockUseCompositionPlayback = useCompositionPlayback as jest.Mock;

const mockMusic: Music = {
  id: '1',
  opusName: 'Poem about the Forest',
  opusYear: 1918,
  compositionName: 'Movement I',
  slug: 'poem',
  opus: 'op.50',
  opusTitle: 'Symphony No. 3 in B minor',
  audioAvailable: true,
  sheetAvailable: true,
  sheetMusic: [
    {
      name: 'sheet.pdf',
      url: '',
      publishDate: ''
    }
  ],
  youtubeUrl: null
};

const mockRow = {
  original: mockMusic,
  getCanExpand: jest.fn(() => false)
} as unknown as Row<Music>;

const mockCellContext = {
  row: mockRow
} as CellContext<Music, unknown>;

describe('MusicTableCells', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCompositionPlayback.mockReturnValue({
      canPlay: true,
      isCurrentTrack: false,
      isPlaying: false,
      handlePlayClick: jest.fn()
    });
  });

  describe('Header renderers', () => {
    it('should render all headers with correct translation keys', () => {
      render(
        <>
          <RenderOpusHeader />
          <RenderNameHeader />
          <RenderYearHeader />
          <RenderGenreHeader />
        </>
      );

      expect(screen.getByText('opus')).toBeInTheDocument();
      expect(screen.getByText('name')).toBeInTheDocument();
      expect(screen.getByText('year')).toBeInTheDocument();
      expect(screen.getByText('genre')).toBeInTheDocument();
    });
  });

  describe('Basic cell renderers', () => {
    it('should render name and year cells with values', () => {
      const nameCell = renderNameCell({ getValue: () => 'Poem about the Forest' } as CellContext<Music, unknown>);
      const yearCell = renderYearCell({ getValue: () => '1918' } as CellContext<Music, unknown>);

      const { getByText } = render(
        <>
          {nameCell}
          {yearCell}
        </>
      );

      expect(getByText('Poem about the Forest')).toBeInTheDocument();
      expect(getByText('1918')).toBeInTheDocument();
    });

    it('should render null for year cell when value is null or undefined', () => {
      const yearCellNull = renderYearCell({ getValue: () => null } as CellContext<Music, unknown>);
      const yearCellUndefined = renderYearCell({ getValue: () => undefined } as CellContext<Music, unknown>);

      const { container: container1 } = render(<>{yearCellNull}</>);
      expect(container1).toBeEmptyDOMElement();

      const { container: container2 } = render(<>{yearCellUndefined}</>);
      expect(container2).toBeEmptyDOMElement();
    });

    it('should render genre cell joined with commas', () => {
      const genreCell = RenderGenreCell({ getValue: () => ['Classical', 'Romantic'] } as CellContext<Music, unknown>);
      render(<>{genreCell}</>);
      expect(screen.getByText('Classical, Romantic')).toBeInTheDocument();
    });

    it('should render nothing if no genres', () => {
      const genreCell = RenderGenreCell({ getValue: () => [] } as CellContext<Music, unknown>);
      const { container } = render(<>{genreCell}</>);
      expect(container).toBeEmptyDOMElement();
    });

    it('should cover fallback when getValue returns undefined for genres', () => {
      const genreCell = RenderGenreCell({ getValue: () => undefined } as CellContext<Music, unknown>);
      const { container } = render(<>{genreCell}</>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('PlayCell', () => {
    it('should render play icon when canPlay=true', () => {
      render(RenderPlayCell(mockCellContext));
      expect(screen.getByTestId('mock-svg')).toBeInTheDocument();
    });

    it('should not render icon when canPlay=false', () => {
      mockUseCompositionPlayback.mockReturnValue({
        canPlay: false,
        isCurrentTrack: false,
        isPlaying: false,
        handlePlayClick: jest.fn()
      });

      render(RenderPlayCell(mockCellContext));

      expect(screen.queryByTestId('mock-svg')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { hidden: true })).not.toBeInTheDocument();
    });

    it('should call handlePlayClick on click', () => {
      const handlePlayClick = jest.fn();

      mockUseCompositionPlayback.mockReturnValue({
        canPlay: true,
        isCurrentTrack: false,
        isPlaying: false,
        handlePlayClick
      });

      render(RenderPlayCell(mockCellContext));

      fireEvent.click(screen.getByRole('button', { hidden: true }));
      expect(handlePlayClick).toHaveBeenCalled();
    });

    it('should render pause icon when track is current and playing', () => {
      mockUseCompositionPlayback.mockReturnValue({
        canPlay: true,
        isCurrentTrack: true,
        isPlaying: true,
        handlePlayClick: jest.fn()
      });

      render(RenderPlayCell(mockCellContext));
      expect(screen.getByTestId('mock-svg')).toBeInTheDocument();
    });
  });

  describe('ActionsCell', () => {
    it('should render button when desktop', () => {
      mockUseBreakpoints.mockReturnValue({ isDesktop: true });

      const onAction = jest.fn();
      render(RenderActionsCell(mockCellContext, onAction));

      const desktopBtn = screen.getByText('viewSheetMusic');
      expect(desktopBtn).toBeInTheDocument();

      fireEvent.click(desktopBtn);
      expect(onAction).toHaveBeenCalledTimes(1);
      expect(onAction).toHaveBeenCalledWith({
        composition: mockMusic.compositionName,
        notes: mockMusic.sheetMusic
      });
    });

    it('should render icon button on laptop', () => {
      mockUseBreakpoints.mockReturnValue({ isLaptop: true });

      const onAction = jest.fn();
      render(RenderActionsCell(mockCellContext, onAction));

      expect(screen.getByAltText('viewSheetMusic')).toBeInTheDocument();
    });

    it('should open overflow menu and render play item', () => {
      mockUseBreakpoints.mockReturnValue({ isDesktop: false, isLaptop: false });

      render(RenderActionsCell(mockCellContext, jest.fn()));

      fireEvent.click(screen.getByTestId('Artistry-overflowMenuButton'));

      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'listenToComposition' })).toBeInTheDocument();
    });

    it('should not render "viewSheetMusic" in menu when showNotesInline=true', () => {
      mockUseBreakpoints.mockReturnValue({ isDesktop: true, isLaptop: false });

      render(RenderActionsCell(mockCellContext, jest.fn()));

      expect(screen.getByText('viewSheetMusic')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('Artistry-overflowMenuButton'));

      expect(screen.queryByRole('menuitem', { name: /viewSheetMusic/i })).not.toBeInTheDocument();
    });

    it('should render "viewSheetMusic" in menu on mobile and call onAction', async () => {
      mockUseBreakpoints.mockReturnValue({ isDesktop: false, isLaptop: false });

      const onAction = jest.fn();
      render(RenderActionsCell(mockCellContext, onAction));

      expect(screen.queryByText('viewSheetMusic')).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId('Artistry-overflowMenuButton'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      const notesItem = screen.getByRole('menuitem', { name: /viewSheetMusic/i });
      fireEvent.click(notesItem);

      expect(onAction).toHaveBeenCalledTimes(1);
      expect(onAction).toHaveBeenCalledWith({
        composition: mockMusic.compositionName,
        notes: mockMusic.sheetMusic
      });

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('should disable play menu item when canPlay=false', () => {
      mockUseBreakpoints.mockReturnValue({ isDesktop: false, isLaptop: false });

      mockUseCompositionPlayback.mockReturnValue({
        canPlay: false,
        isCurrentTrack: false,
        isPlaying: false,
        handlePlayClick: jest.fn()
      });

      render(RenderActionsCell(mockCellContext, jest.fn()));
      fireEvent.click(screen.getByTestId('Artistry-overflowMenuButton'));

      const playItem = screen.getByRole('menuitem', { name: 'listenToComposition' });
      expect(playItem).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not call onAction if it is not provided when clicking viewSheetMusic', () => {
      mockUseBreakpoints.mockReturnValue({ isDesktop: true });

      render(RenderActionsCell(mockCellContext, undefined as unknown as () => void));

      const desktopBtn = screen.getByText('viewSheetMusic');
      expect(desktopBtn).toBeInTheDocument();

      expect(() => fireEvent.click(desktopBtn)).not.toThrow();
    });

    it('should render pause icon in overflow menu when track is current and playing', () => {
      mockUseBreakpoints.mockReturnValue({ isDesktop: false, isLaptop: false });
      mockUseCompositionPlayback.mockReturnValue({
        canPlay: true,
        isCurrentTrack: true,
        isPlaying: true,
        handlePlayClick: jest.fn()
      });

      render(RenderActionsCell(mockCellContext, jest.fn()));
      fireEvent.click(screen.getByTestId('Artistry-overflowMenuButton'));

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  describe('Group renderers', () => {
    it('should render opus label', () => {
      render(renderOpusGroupLabel([mockMusic]));
      expect(screen.getByText('op.50')).toBeInTheDocument();
    });

    it('should render opus title label', () => {
      render(renderOpusTitleGroupLabel([mockMusic]));
      expect(screen.getByText('Poem about the Forest')).toBeInTheDocument();
    });

    it('should render opus year label when present', () => {
      const musicWithYear: Music = { ...mockMusic, opusYear: '1918–1920' };
      render(renderOpusYearGroupLabel([musicWithYear]));
      expect(screen.getByText('1918–1920')).toBeInTheDocument();
    });

    it('should return null for opus year label when absent', () => {
      const mockWithoutYear = { ...mockMusic, opusYear: undefined };
      const { container } = render(<>{renderOpusYearGroupLabel([mockWithoutYear])}</>);
      expect(container).toBeEmptyDOMElement();
    });

    it('should render opus genres joined by comma when present', () => {
      const musicWithGenres: Music = { ...mockMusic, opusGenres: ['Chamber', 'Symphonic'] };
      render(renderOpusGenreGroupLabel([musicWithGenres]));
      expect(screen.getByText('Chamber, Symphonic')).toBeInTheDocument();
    });

    it('should return null for opus genres when absent or empty', () => {
      const { container: container1 } = render(<>{renderOpusGenreGroupLabel([mockMusic])}</>);
      expect(container1).toBeEmptyDOMElement();

      const musicWithEmptyGenres: Music = { ...mockMusic, opusGenres: [] };
      const { container: container2 } = render(<>{renderOpusGenreGroupLabel([musicWithEmptyGenres])}</>);
      expect(container2).toBeEmptyDOMElement();
    });

    it('should render opus title link and handle stopPropagation when opusId is present', () => {
      const musicWithOpusId: Music = { ...mockMusic, opusId: 'test-opus-id' };
      render(renderOpusTitleGroupLabel([musicWithOpusId]));

      const link = screen.getByText('Poem about the Forest').closest('a');
      expect(link).toBeInTheDocument();

      if (link) fireEvent.click(link);
    });
  });

  describe('RenderExpanderCell', () => {
    it('should render expander icon for group rows', () => {
      mockUseBreakpoints.mockReturnValue({ isMobile: true, isTablet: false });

      render(RenderExpanderCell(mockCellContext));
      expect(screen.getByTestId('mock-svg')).toBeInTheDocument();
    });

    it('should return null if it is desktop (not mobile and not tablet)', () => {
      mockUseBreakpoints.mockReturnValue({ isMobile: false, isTablet: false });

      const { container } = render(<>{RenderExpanderCell(mockCellContext)}</>);
      expect(container).toBeEmptyDOMElement();
    });

    it('should return null if row can expand', () => {
      mockUseBreakpoints.mockReturnValue({ isMobile: true, isTablet: false });

      const mockExpandableRow = {
        original: mockMusic,
        getCanExpand: jest.fn(() => true)
      } as unknown as Row<Music>;

      const mockExpandableContext = {
        row: mockExpandableRow
      } as CellContext<Music, unknown>;

      const { container } = render(<>{RenderExpanderCell(mockExpandableContext)}</>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('GroupActionsCell', () => {
    const mockWriteText = jest.fn();
    const originalClipboard = navigator.clipboard;
    const originalWindowOpen = window.open;

    beforeAll(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true
      });
      window.open = jest.fn();
    });

    afterAll(() => {
      Object.defineProperty(navigator, 'clipboard', { value: originalClipboard });
      window.open = originalWindowOpen;
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should render group actions cell correctly via wrapper function', () => {
      render(renderGroupActionsCell([mockMusic]));
      expect(screen.getByTestId('Artistry-opusOverflowMenuButton')).toBeInTheDocument();
    });

    it('should handle all menu actions when opusId and youtube URL exist', async () => {
      const musicWithData: Music = {
        ...mockMusic,
        opusId: 'opus-123',
        youtubeUrl: 'youtube-id-1',
        audios: [{ url: 'test-audio.mp3' } as NonNullable<Music['audios']>[number]]
      };

      const handlePlayClickMock = jest.fn();
      mockUseCompositionPlayback.mockReturnValue({
        canPlay: true,
        isCurrentTrack: false,
        isPlaying: false,
        handlePlayClick: handlePlayClickMock
      });

      render(renderGroupActionsCell([musicWithData]));

      const openMenu = () => {
        fireEvent.click(screen.getByTestId('Artistry-opusOverflowMenuButton'));
      };

      fireEvent.click(screen.getByTestId('Artistry-opusOverflowMenuButton').parentElement!);

      openMenu();
      fireEvent.click(screen.getByRole('menuitem', { name: 'listenToComposition' }));
      expect(handlePlayClickMock).toHaveBeenCalled();

      openMenu();
      fireEvent.click(screen.getByRole('menuitem', { name: 'watchOnYoutube' }));
      expect(window.open).toHaveBeenCalledWith(
        'https://www.youtube.com/watch?v=youtube-id-1',
        '_blank',
        'noopener,noreferrer'
      );

      openMenu();
      fireEvent.click(screen.getByRole('menuitem', { name: 'copyLink' }));
      expect(mockWriteText).toHaveBeenCalledWith(expect.stringContaining('/en/artistry/opus-123'));

      openMenu();
      fireEvent.click(screen.getByRole('menuitem', { name: 'viewDetails' }));
      expect(mockRouterPush).toHaveBeenCalledWith('/artistry/opus-123');
    });

    it('should gracefully handle disabled states when data is missing', () => {
      const musicNoData: Music = { ...mockMusic, opusId: undefined, youtubeUrl: null };
      mockUseCompositionPlayback.mockReturnValue({
        canPlay: false,
        isCurrentTrack: false,
        isPlaying: false,
        handlePlayClick: jest.fn()
      });

      render(renderGroupActionsCell([musicNoData]));
      fireEvent.click(screen.getByTestId('Artistry-opusOverflowMenuButton'));

      expect(screen.getByRole('menuitem', { name: 'watchOnYoutube' })).toHaveAttribute('aria-disabled', 'true');
      expect(screen.getByRole('menuitem', { name: 'listenToComposition' })).toHaveAttribute('aria-disabled', 'true');
    });

    it('should ignore YouTube click if youtubeUrl is unexpectedly empty', () => {
      const musicWithoutYoutube: Music = { ...mockMusic, youtubeUrl: null };
      render(<GroupActionsCell items={[musicWithoutYoutube]} />);
      fireEvent.click(screen.getByTestId('Artistry-opusOverflowMenuButton'));

      fireEvent.click(screen.getByRole('menuitem', { name: 'watchOnYoutube' }));

      expect(window.open).not.toHaveBeenCalled();
    });

    it('should handle clipboard error silently', async () => {
      const musicWithData: Music = { ...mockMusic, opusId: 'opus-123' };
      mockWriteText.mockRejectedValueOnce(new Error('clipboard error'));

      render(renderGroupActionsCell([musicWithData]));
      fireEvent.click(screen.getByTestId('Artistry-opusOverflowMenuButton'));

      fireEvent.click(screen.getByRole('menuitem', { name: 'copyLink' }));

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalled();
      });
    });

    it('should fallback to the first item for playback if no audio is available', () => {
      const musicNoAudio: Music = { ...mockMusic, audioAvailable: false, audios: [] };
      render(renderGroupActionsCell([musicNoAudio]));

      expect(mockUseCompositionPlayback).toHaveBeenCalledWith(musicNoAudio);
    });
  });
});

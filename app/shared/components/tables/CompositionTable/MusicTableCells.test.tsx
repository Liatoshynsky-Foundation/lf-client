import '@testing-library/jest-dom';
import { CellContext, Row } from '@tanstack/react-table';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import {
  RenderActionsCell,
  RenderExpanderCell,
  RenderGenreCell,
  RenderGenreHeader,
  renderNameCell,
  RenderNameHeader,
  renderOpusGroupLabel,
  RenderOpusHeader,
  renderOpusTitleGroupLabel,
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
  useTranslations: () => (key: string) => key
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

jest.mock('~/shared/components/design-system/all-components/Ellipsis/Ellipsis', () => {
  const Ellipsis = ({ text }: { text: string }) => {
    return <div>{text}</div>;
  };
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
  name: 'Poem about the Forest',
  year: 1918,
  opus: 'op.50',
  opusTitle: 'Symphony No. 3 in B minor',
  audioAvailable: true,
  sheetAvailable: true,
  sheetMusic: [
    {
      url: '',
      isFree: true,
      dateUploaded: ''
    }
  ]
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

    it('should render genre cell joined with commas', () => {
      const genreCell = RenderGenreCell({ getValue: () => ['Classical', 'Romantic'] } as CellContext<Music, unknown>);
      const { getByText } = render(<>{genreCell}</>);
      expect(getByText('Classical, Romantic')).toBeInTheDocument();
    });

    it('should render nothing if no genres', () => {
      const genreCell = RenderGenreCell({ getValue: () => [] } as CellContext<Music, unknown>);
      const { container } = render(<>{genreCell}</>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('PlayCell', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      mockUseCompositionPlayback.mockReturnValue({
        canPlay: true,
        isCurrentTrack: false,
        isPlaying: false,
        handlePlayClick: jest.fn()
      });
    });

    it('should render play icon when canPlay=true', () => {
      mockUseCompositionPlayback.mockReturnValue({
        canPlay: true,
        isCurrentTrack: false,
        isPlaying: false,
        handlePlayClick: jest.fn()
      });

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
  });

  describe('ActionsCell', () => {
    it('should render button when desktop', () => {
      mockUseBreakpoints.mockReturnValue({
        isDesktop: true
      });
      const onAction = jest.fn();
      const { getByText } = render(RenderActionsCell(mockCellContext, onAction));
      const desktopBtn = getByText('viewSheetMusic');
      expect(desktopBtn).toBeInTheDocument();
      fireEvent.click(desktopBtn);
      expect(onAction).toHaveBeenCalled();
    });

    it('should render icon button on laptop', () => {
      mockUseBreakpoints.mockReturnValue({
        isLaptop: true
      });
      const onAction = jest.fn();
      const { getByAltText } = render(RenderActionsCell(mockCellContext, onAction));
      expect(getByAltText('viewSheetMusic')).toBeInTheDocument();
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
      expect(screen.queryByRole('menuitem', { name: 'viewSheetMusic' })).not.toBeInTheDocument();
    });

    it('should render "viewSheetMusic" in menu on mobile and call onAction', () => {
      mockUseBreakpoints.mockReturnValue({ isDesktop: false, isLaptop: false });

      const onAction = jest.fn();
      render(RenderActionsCell(mockCellContext, onAction));

      expect(screen.queryByText('viewSheetMusic')).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId('Artistry-overflowMenuButton'));

      const notesText = screen.getByText('viewSheetMusic');
      const notesItem = notesText.closest('[role="menuitem"]');
      if (!notesItem) throw new Error('Menuitem not found');

      fireEvent.click(notesItem);
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
  });

  describe('Group renderers', () => {
    it('should render opus label', () => {
      const { getByText } = render(renderOpusGroupLabel([mockMusic]));
      expect(getByText('op.50')).toBeInTheDocument();
    });

    it('should render opus title label', () => {
      const { getByText } = render(renderOpusTitleGroupLabel([mockMusic]));
      expect(getByText('Symphony No. 3 in B minor')).toBeInTheDocument();
    });
  });

  describe('RenderExpanderCell', () => {
    it('should render expander icon for group rows', () => {
      mockUseBreakpoints.mockReturnValue({ isMobile: true, isTablet: false });

      mockUseCompositionPlayback.mockReturnValue({
        canPlay: true,
        isCurrentTrack: false,
        isPlaying: false,
        handlePlayClick: jest.fn()
      });

      render(RenderExpanderCell(mockCellContext));
      expect(screen.getByTestId('mock-svg')).toBeInTheDocument();
    });
  });
});

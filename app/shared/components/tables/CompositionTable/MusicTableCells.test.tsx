import '@testing-library/jest-dom';
import { CellContext, Row } from '@tanstack/react-table';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import {
  RenderActionsCell,
  RenderExpanderCell,
  RenderGenreCell,
  RenderGenreHeader,
  renderGroupActions,
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

import { useAudioPlayer } from '~/shared/context/AudioPlayerContext';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

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

jest.mock('~/shared/context/AudioPlayerContext', () => ({
  useAudioPlayer: jest.fn()
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => jest.fn());

const mockUseAudioPlayer = useAudioPlayer as jest.Mock;
const mockUseBreakpoints = useBreakpoints as jest.Mock;

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

const useAudioPlayerMockReturn = {
  playTrack: jest.fn(),
  togglePlay: jest.fn(),
  isPlaying: true,
  src: `/api/blob-url?blobName=${encodeURIComponent(mockMusic.name)}&folderName=compositions`
};

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
    it('should render play icon', () => {
      mockUseAudioPlayer.mockReturnValue(useAudioPlayerMockReturn);
      const { getByTestId } = render(RenderPlayCell(mockCellContext));
      expect(getByTestId('mock-svg')).toBeInTheDocument();
    });

    it('should call playTrack when clicked if different track', () => {
      mockUseAudioPlayer.mockReturnValue({ ...useAudioPlayerMockReturn, src: 'different-src' });
      const { getByRole } = render(RenderPlayCell(mockCellContext));
      fireEvent.click(getByRole('button', { hidden: true }));
      expect(useAudioPlayerMockReturn.playTrack).toHaveBeenCalledWith(
        expect.stringContaining('compositions'),
        mockMusic.name
      );
    });

    it('should call togglePlay when same track is playing', () => {
      mockUseAudioPlayer.mockReturnValue(useAudioPlayerMockReturn);
      const { getByRole } = render(RenderPlayCell(mockCellContext));
      fireEvent.click(getByRole('button', { hidden: true }));
      expect(useAudioPlayerMockReturn.togglePlay).toHaveBeenCalled();
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

    it('should render group actions icon', () => {
      const { getByAltText } = render(renderGroupActions());
      expect(getByAltText('menu')).toBeInTheDocument();
    });
  });

  describe('RenderExpanderCell', () => {
    it('should render expander icon for group rows', () => {
      mockUseBreakpoints.mockReturnValue({
        isMobile: true
      });
      mockUseAudioPlayer.mockReturnValue(useAudioPlayerMockReturn);
      const { getByTestId } = render(RenderExpanderCell(mockCellContext));
      expect(getByTestId('mock-svg')).toBeInTheDocument();
    });
  });
});

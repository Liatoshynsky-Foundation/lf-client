import { act, fireEvent, render, screen } from '@testing-library/react';

import AudioPlayerPopover from './AudioPlayerPopover';

jest.mock('@mui/material/ButtonBase', () => {
  const OriginalButtonBase = jest.requireActual('@mui/material/ButtonBase').default;
  return function MockButtonBase(props: Record<string, unknown>) {
    return <OriginalButtonBase {...props} disableRipple />;
  };
});

const defaultProps = {
  anchorEl: document.createElement('button'),
  isPlaying: false,
  currentTime: 30,
  duration: 120,
  progress: 0.25,
  onClose: jest.fn(),
  onTogglePlay: jest.fn(),
  onSeek: jest.fn(),
  trackName: 'Test Track',
  error: null
};

describe('AudioPlayerPopover', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with provided props', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    expect(screen.getByText('0:30 / 2:00')).toBeInTheDocument();
    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: /track progress/i })).toBeInTheDocument();
  });

  it('should render pause icon when isPlaying is true', () => {
    render(<AudioPlayerPopover {...defaultProps} isPlaying={true} />);
    expect(screen.getByRole('button', { name: /Pause audio/i })).toBeInTheDocument();
  });

  it('should not render when anchorEl is null', () => {
    const { container } = render(<AudioPlayerPopover {...defaultProps} anchorEl={null} />);
    expect(container.querySelector('[role="presentation"]')).not.toBeInTheDocument();
  });

  it('should focus play button after timeout when open', () => {
    jest.useFakeTimers();
    render(<AudioPlayerPopover {...defaultProps} />);
    const playButton = screen.getByRole('button', { name: /Play audio/i });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(playButton).toHaveFocus();
    jest.useRealTimers();
  });

  it('should render error message when error prop is provided', () => {
    render(<AudioPlayerPopover {...defaultProps} error="Failed to load track" />);
    expect(screen.getByText('Failed to load track')).toBeInTheDocument();
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
  });

  it('should call onTogglePlay when play button is clicked', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Play audio/i });

    fireEvent.click(button);

    expect(defaultProps.onTogglePlay).toHaveBeenCalledTimes(1);
  });

  it('should display progress thumb image and "Усі твори" button', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    expect(screen.getByRole('slider', { name: /track progress/i })).toBeInTheDocument();
    expect(screen.getByText('Усі твори')).toBeInTheDocument();
  });

  describe('keyboard navigation (handleKeyDown)', () => {
    it('should handle ArrowLeft and ArrowDown keys correctly', () => {
      const onSeekMock = jest.fn();
      render(<AudioPlayerPopover {...defaultProps} progress={0.25} onSeek={onSeekMock} />);

      const slider = screen.getByRole('slider', { name: /track progress/i });

      fireEvent.keyDown(slider, { key: 'ArrowLeft' });
      expect(onSeekMock).toHaveBeenLastCalledWith(expect.closeTo(0.2, 5));

      fireEvent.keyDown(slider, { key: 'ArrowDown' });
      expect(onSeekMock).toHaveBeenLastCalledWith(expect.closeTo(0.2, 5));
    });

    it('should handle ArrowRight and ArrowUp keys correctly', () => {
      const onSeekMock = jest.fn();
      render(<AudioPlayerPopover {...defaultProps} progress={0.25} onSeek={onSeekMock} />);

      const slider = screen.getByRole('slider', { name: /track progress/i });

      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      expect(onSeekMock).toHaveBeenLastCalledWith(expect.closeTo(0.3, 5));

      fireEvent.keyDown(slider, { key: 'ArrowUp' });
      expect(onSeekMock).toHaveBeenLastCalledWith(expect.closeTo(0.3, 5));
    });

    it('should clamp progress to 0 and 1 when exceeding limits with arrow keys', () => {
      const onSeekMock = jest.fn();
      const { rerender } = render(<AudioPlayerPopover {...defaultProps} progress={0.02} onSeek={onSeekMock} />);

      const slider = screen.getByRole('slider', { name: /track progress/i });

      fireEvent.keyDown(slider, { key: 'ArrowLeft' });
      expect(onSeekMock).toHaveBeenLastCalledWith(0);

      rerender(<AudioPlayerPopover {...defaultProps} progress={0.98} onSeek={onSeekMock} />);
      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      expect(onSeekMock).toHaveBeenLastCalledWith(1);
    });

    it('should handle Home and End keys correctly', () => {
      const onSeekMock = jest.fn();
      render(<AudioPlayerPopover {...defaultProps} progress={0.5} onSeek={onSeekMock} />);

      const slider = screen.getByRole('slider', { name: /track progress/i });

      fireEvent.keyDown(slider, { key: 'Home' });
      expect(onSeekMock).toHaveBeenLastCalledWith(0);

      fireEvent.keyDown(slider, { key: 'End' });
      expect(onSeekMock).toHaveBeenLastCalledWith(1);
    });

    it('should do nothing on unsupported key press', () => {
      const onSeekMock = jest.fn();
      render(<AudioPlayerPopover {...defaultProps} onSeek={onSeekMock} />);

      const slider = screen.getByRole('slider', { name: /track progress/i });

      fireEvent.keyDown(slider, { key: 'Enter' });
      expect(onSeekMock).not.toHaveBeenCalled();
    });
  });

  describe('dragging behavior', () => {
    it('should handle mouse down, move, and up events correctly', () => {
      const anchor = document.createElement('button');
      document.body.appendChild(anchor);

      const onSeekMock = jest.fn();

      render(<AudioPlayerPopover {...defaultProps} anchorEl={anchor} onSeek={onSeekMock} />);

      const slider = screen.getByRole('slider', { name: /track progress/i });
      const progressBar = slider.parentElement;

      if (!progressBar) {
        throw new Error('Progress bar element not found');
      }

      Object.defineProperty(progressBar, 'getBoundingClientRect', {
        configurable: true,
        value: () => ({
          left: 100,
          width: 200,
          top: 0,
          right: 300,
          bottom: 10,
          height: 10,
          x: 100,
          y: 0,
          toJSON: () => ({})
        })
      });

      fireEvent.mouseDown(progressBar, { clientX: 150 });
      expect(onSeekMock).toHaveBeenCalledWith(0.25);

      fireEvent.mouseMove(document, { clientX: 180 });
      expect(onSeekMock).toHaveBeenCalledWith(0.4);

      fireEvent.mouseUp(document);

      fireEvent.mouseMove(document, { clientX: 190 });
      expect(onSeekMock).toHaveBeenCalledTimes(2);

      document.body.removeChild(anchor);
    });
  });
});

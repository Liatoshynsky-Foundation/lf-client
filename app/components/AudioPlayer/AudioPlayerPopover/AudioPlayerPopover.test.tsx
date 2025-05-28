import { render, screen, fireEvent } from '@testing-library/react';
import AudioPlayerPopover from './AudioPlayerPopover';

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
  error: null,
};

const mockBoundingClientRect = {
  width: 200,
  left: 100,
  top: 0,
  right: 300,
  bottom: 10,
  height: 10,
  x: 0,
  y: 0,
  toJSON: () => {},
};

describe('AudioPlayerPopover', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with provided props', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    expect(screen.getByText('0:30 / 2:00')).toBeInTheDocument();
    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByRole('progress')).toBeInTheDocument();
  });

  it('should render pause icon when isPlaying is true', () => {
    render(<AudioPlayerPopover {...defaultProps} isPlaying={true} />);
    expect(
      screen.getByRole('button', { name: /Pause audio/i }),
    ).toBeInTheDocument();
  });

  it('should not render when anchorEl is null', () => {
    const { container } = render(
      <AudioPlayerPopover {...defaultProps} anchorEl={null} />,
    );
    expect(
      container.querySelector('[role="presentation"]'),
    ).not.toBeInTheDocument();
  });

  it('should call onTogglePlay when play button is clicked', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Play audio/i });
    fireEvent.click(button);
    expect(defaultProps.onTogglePlay).toHaveBeenCalled();
  });

  it('should call onClose when Popover closes', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    defaultProps.onClose();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should display progress thumb image', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    expect(screen.getByAltText('progress thumb')).toBeInTheDocument();
  });

  it('should display "Усі твори" button', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    expect(screen.getByText('Усі твори')).toBeInTheDocument();
  });

  describe('dragging behavior', () => {
    it('should handle mouse down, move, and up events correctly', async () => {
      const anchor = document.createElement('button');
      document.body.appendChild(anchor);

      const onSeekMock = jest.fn();

      render(
        <AudioPlayerPopover
          {...defaultProps}
          anchorEl={anchor}
          onSeek={onSeekMock}
        />,
      );

      const progressBar = await screen.findByRole('progress');

      Object.defineProperty(progressBar, 'getBoundingClientRect', {
        configurable: true,
        value: () => mockBoundingClientRect,
      });

      fireEvent.mouseDown(progressBar, { clientX: 150 });
      expect(onSeekMock).toHaveBeenCalledWith(0.25);

      fireEvent.mouseMove(document, { clientX: 180 });
      expect(onSeekMock).toHaveBeenCalledWith(0.4);

      fireEvent.mouseUp(document);
      expect(onSeekMock).toHaveBeenCalledTimes(2);
    });
  });
});

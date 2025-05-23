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
};

describe('AudioPlayerPopover', () => {
  it('renders correctly with provided props', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    expect(screen.getByText('0:30 / 2:00')).toBeInTheDocument();
    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('calls onTogglePlay when play button is clicked', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Play audio/i });
    fireEvent.click(button);
    expect(defaultProps.onTogglePlay).toHaveBeenCalled();
  });

  describe('AudioPlayerPopover dragging behavior', () => {
    it('handles dragging behavior: mouse down, move and up', async () => {
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

      const progressBar = await screen.findByRole('progressbar');

      // Mock getBoundingClientRect to simulate the progress bar's position and size
      Object.defineProperty(progressBar, 'getBoundingClientRect', {
        configurable: true,
        value: () => ({
          width: 200,
          left: 100,
          top: 0,
          right: 300,
          bottom: 10,
          height: 10,
          x: 0,
          y: 0,
          toJSON: () => {},
        }),
      });

      // Simulate mouse events
      fireEvent.mouseDown(progressBar, { clientX: 150 });
      expect(onSeekMock).toHaveBeenCalledWith(0.25);

      fireEvent.mouseMove(document, { clientX: 180 });
      expect(onSeekMock).toHaveBeenCalledWith(0.4);

      fireEvent.mouseUp(document);

      expect(onSeekMock).toHaveBeenCalledTimes(2);
    });
  });

  it('renders pause icon when isPlaying is true', () => {
    render(<AudioPlayerPopover {...defaultProps} isPlaying={true} />);
    expect(
      screen.getByRole('button', { name: /Pause audio/i }),
    ).toBeInTheDocument();
  });

  it('calls onClose when Popover closes', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    defaultProps.onClose();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('does not render when anchorEl is null', () => {
    const { container } = render(
      <AudioPlayerPopover {...defaultProps} anchorEl={null} />,
    );
    expect(
      container.querySelector('[role="presentation"]'),
    ).not.toBeInTheDocument();
  });

  it('displays progress thumb image', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    expect(screen.getByAltText('progress thumb')).toBeInTheDocument();
  });

  it('displays "Усі твори" button', () => {
    render(<AudioPlayerPopover {...defaultProps} />);
    expect(screen.getByText('Усі твори')).toBeInTheDocument();
  });
});

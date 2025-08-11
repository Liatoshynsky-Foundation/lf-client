import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AudioPlayerProvider, useAudioPlayer } from './AudioPlayerContext';

const TextComponent = () => {
  const { src, trackName, isPlaying, playTrack, togglePlay } = useAudioPlayer();
  return (
    <div>
      <p data-testid="src">{src}</p>
      <p data-testid="trackName">{trackName}</p>
      <p data-testid="isPlaying">{isPlaying ? 'true' : 'false'}</p>
      <button
        onClick={() => {
          playTrack('newSrc', 'newTrack');
        }}
      >
        Play
      </button>
      <button onClick={togglePlay}>Pause</button>
    </div>
  );
};

describe('AudioPlayerContext', () => {
  it('should have default values', () => {
    render(
      <AudioPlayerProvider>
        <TextComponent />
      </AudioPlayerProvider>
    );

    expect(screen.getByTestId('src').textContent).toContain('/api/blob-url');
    expect(screen.getByTestId('trackName').textContent).toBe('Поема про ліс');
    expect(screen.getByTestId('isPlaying').textContent).toBe('false');
  });
  it('should update state when playTrack is called', async () => {
    render(
      <AudioPlayerProvider>
        <TextComponent />
      </AudioPlayerProvider>
    );
    await userEvent.click(screen.getByText('Play'));
    expect(screen.getByTestId('src').textContent).toBe('newSrc');
    expect(screen.getByTestId('trackName').textContent).toBe('newTrack');
  });
  it('should toggle play state', async () => {
    render(
      <AudioPlayerProvider>
        <TextComponent />
      </AudioPlayerProvider>
    );
    await userEvent.click(screen.getByText('Play'));
    expect(screen.getByTestId('isPlaying').textContent).toBe('true');

    await userEvent.click(screen.getByText('Pause'));
    expect(screen.getByTestId('isPlaying').textContent).toBe('false');
  });
});

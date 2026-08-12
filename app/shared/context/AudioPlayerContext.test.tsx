import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { AudioPlayerProvider, useAudioPlayer } from './AudioPlayerContext';
import { DEFAULT_COMPOSITION_NAME, DEFAULT_COMPOSITION_URL, FOLDER_NAME } from '~/constants/audioPlayer';
import { errors } from '~/constants/errors';

const TestComponent = () => {
  const { src, trackName, isPlaying, isPlayerOpen, playTrack, togglePlay, openPlayer, closePlayer } = useAudioPlayer();
  return (
    <div>
      <p data-testid="src">{src}</p>
      <p data-testid="trackName">{trackName}</p>
      <p data-testid="isPlaying">{isPlaying ? 'true' : 'false'}</p>
      <p data-testid="isPlayerOpen">{isPlayerOpen ? 'true' : 'false'}</p>
      <button onClick={() => playTrack('newSrc', 'newTrack')}>Play</button>
      <button onClick={togglePlay}>Pause</button>
      <button onClick={openPlayer}>Open</button>
      <button onClick={closePlayer}>Close</button>
    </div>
  );
};

describe('AudioPlayerContext', () => {
  it('should have default values', () => {
    render(
      <AudioPlayerProvider>
        <TestComponent />
      </AudioPlayerProvider>
    );

    expect(screen.getByTestId('src').textContent).toBe(DEFAULT_COMPOSITION_URL);
    expect(screen.getByTestId('trackName').textContent).toBe(DEFAULT_COMPOSITION_NAME);
    expect(FOLDER_NAME).toBe('compositions');
    expect(screen.getByTestId('isPlaying').textContent).toBe('false');
    expect(screen.getByTestId('isPlayerOpen').textContent).toBe('false');
  });

  it('should update state when playTrack is called', async () => {
    render(
      <AudioPlayerProvider>
        <TestComponent />
      </AudioPlayerProvider>
    );
    await userEvent.click(screen.getByText('Play'));
    expect(screen.getByTestId('src').textContent).toBe('newSrc');
    expect(screen.getByTestId('trackName').textContent).toBe('newTrack');
  });

  it('should toggle play state', async () => {
    render(
      <AudioPlayerProvider>
        <TestComponent />
      </AudioPlayerProvider>
    );
    await userEvent.click(screen.getByText('Play'));
    expect(screen.getByTestId('isPlaying').textContent).toBe('true');

    await userEvent.click(screen.getByText('Pause'));
    expect(screen.getByTestId('isPlaying').textContent).toBe('false');
  });

  it('should open and close player state cleanly', async () => {
    render(
      <AudioPlayerProvider>
        <TestComponent />
      </AudioPlayerProvider>
    );
    await userEvent.click(screen.getByText('Open'));
    expect(screen.getByTestId('isPlayerOpen').textContent).toBe('true');

    await userEvent.click(screen.getByText('Close'));
    expect(screen.getByTestId('isPlayerOpen').textContent).toBe('false');
  });

  it('should throw missing provider error when hook used outside container boundaries', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow(errors.USE_AUDIO_PLAYER_OUTSIDE_PROVIDER);
    consoleSpy.mockRestore();
  });
});

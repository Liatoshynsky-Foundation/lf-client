import { render, screen } from '@testing-library/react';

import RightActionsPanel from './RightActionsPanel';

jest.mock('../AudioPlayer/AudioPlayer', () => {
  const AudioPlayer = () => <div data-testid="audio-player" />;
  AudioPlayer.displayName = 'AudioPlayer';
  return AudioPlayer;
});
jest.mock('../SupportButton/SupportButton', () => ({
  __esModule: true,
  default: ({ data }: { data: { text: string; link: string } }) => <div data-testid="support-button">{data.text}</div>
}));

jest.mock('~/ds-components/language-switcher/LanguageSwitcher', () => {
  const LanguageSwitcher = () => <div data-testid="language-switcher" />;
  LanguageSwitcher.displayName = 'LanguageSwitcher';
  return LanguageSwitcher;
});

const mockedSupportButtonData = {
  text: 'Support Us',
  link: 'link'
};

describe('RightActionsPanel', () => {
  it('should render all components with correct data', () => {
    render(<RightActionsPanel supportButtonData={mockedSupportButtonData} scrollDirection="up" />);

    const player = screen.getByTestId('audio-player');
    const switcher = screen.getByTestId('language-switcher');
    const supportBtn = screen.getByTestId('support-button');

    expect(player).toBeInTheDocument();
    expect(switcher).toBeInTheDocument();
    expect(supportBtn.textContent).toContain('Support Us');
  });
});

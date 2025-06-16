import { render, screen } from '@testing-library/react';

import RightActionsPanel from './RightActionsPanel';
import { SupportButtonDataProps } from '~/types/types/header.type';

jest.mock('../AudioPlayer/AudioPlayer', () => {
  const AudioPlayer = () => <div data-testid="audio-player" />;
  AudioPlayer.displayName = 'Logo';
  return AudioPlayer;
});
jest.mock('../SupportButton/SupportButton', () => ({ supportButtonData }: SupportButtonDataProps) => {
  const SupportButton = () => <div data-testid="support-button">{supportButtonData.text}</div>;
  SupportButton.displayName = 'Logo';
  return SupportButton;
});
jest.mock('~/ds-components/language-switcher/LanguageSwitcher', () => {
  const LanguageSwitcher = () => <div data-testid="language-switcher" />;
  LanguageSwitcher.displayName = 'Logo';
  return LanguageSwitcher;
});

const mockedSupportButtonData = {
  text: 'Support Us',
  link: 'link'
};

describe('RightActionsPanel', () => {
  it('should render all components with correct data', () => {
    render(<RightActionsPanel supportButtonData={mockedSupportButtonData} />);

    const player = screen.getByTestId('audio-player');
    const switcher = screen.getByTestId('language-switcher');
    const supportBtn = screen.getByTestId('support-button');

    expect(player).toBeInTheDocument();
    expect(switcher).toBeInTheDocument();
    expect(supportBtn.textContent).toContain('Support Us');
  });
});

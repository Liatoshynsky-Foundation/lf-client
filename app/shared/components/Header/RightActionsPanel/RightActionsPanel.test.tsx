import { render, screen } from '@testing-library/react';

import RightActionsPanel from './RightActionsPanel';

jest.mock('~/hooks/use-breakpoints/useBreakpoints');

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

const mockUseBreakpoints = useBreakpoints as jest.Mock;

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
  it('should render desktop version', () => {
    mockUseBreakpoints.mockReturnValue({
      isMobile: false
    });

    render(<RightActionsPanel supportButtonData={mockedSupportButtonData} scrollDirection="up" />);

    expect(screen.getByTestId('audio-player')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('support-button')).toHaveTextContent('Support Us');
  });

  it('should render mobile version', () => {
    mockUseBreakpoints.mockReturnValue({
      isMobile: true
    });

    render(<RightActionsPanel supportButtonData={mockedSupportButtonData} scrollDirection="up" />);

    expect(screen.getByTestId('audio-player')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('support-button')).toHaveTextContent('Support Us');
  });
});

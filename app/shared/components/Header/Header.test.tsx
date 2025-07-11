import { render, screen } from '@testing-library/react';
import React from 'react';

import Header from './Header';

import { useScrollDirection } from '~/shared/hooks/use-scroll-direction/useScrollDirection';

jest.mock('~/ds-components/logo/Logo', () => ({
  __esModule: true,
  default: () => <div data-testid="logo" />
}));

jest.mock('~/ds-components/navigation-bar/NavigationBar', () => ({
  __esModule: true,
  default: ({ navLabels }: { navLabels: Record<string, string> }) => (
    <div data-testid="navigation-bar">{Object.values(navLabels).join(',')}</div>
  )
}));

jest.mock('./RightActionsPanel/RightActionsPanel', () => ({
  __esModule: true,
  default: ({ supportButtonData }: { supportButtonData: { text: string; link: string } }) => (
    <div data-testid="right-actions">{supportButtonData.text}</div>
  )
}));

jest.mock('~/shared/hooks/use-scroll-direction/useScrollDirection', () => ({
  useScrollDirection: jest.fn()
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'navLabels.liatoshynsky': 'Liatoshynsky',
      'navLabels.biography': 'Biography',
      'navLabels.artistry': 'Artistry',
      'navLabels.research': 'Research',
      'navLabels.foundation': 'Foundation',
      'navLabels.foundationHome': 'Home',
      'navLabels.news': 'News',
      'navLabels.mediaAboutUs': 'Media',
      'navLabels.archive': 'Archive',
      'navLabels.collaboration': 'Collaboration',
      supportButton: 'Support'
    };
    return translations[key] || key;
  }
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render logo, navigation-bar and right-actions', () => {
    (useScrollDirection as jest.Mock).mockReturnValue('up');
    render(<Header />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument();
    expect(screen.getByTestId('right-actions')).toBeInTheDocument();
  });

  it('should pass correct texts to navigation-bar', () => {
    (useScrollDirection as jest.Mock).mockReturnValue('up');
    render(<Header />);
    const nav = screen.getByTestId('navigation-bar');
    expect(nav.textContent).toContain('Liatoshynsky');
    expect(nav.textContent).toContain('Biography');
    expect(nav.textContent).toContain('Artistry');
    expect(nav.textContent).toContain('Research');
    expect(nav.textContent).toContain('Foundation');
    expect(nav.textContent).toContain('Home');
    expect(nav.textContent).toContain('News');
    expect(nav.textContent).toContain('Media');
    expect(nav.textContent).toContain('Archive');
    expect(nav.textContent).toContain('Collaboration');
  });

  it('should hide navigation-bar when scrollDirection = "down"', () => {
    (useScrollDirection as jest.Mock).mockReturnValue('down');
    render(<Header />);
    const navBox = screen.getByTestId('navigation-bar').parentElement;
    expect(navBox).toHaveStyle('transform: translateY(-150%)');
  });

  it('should show navigation-bar when scrollDirection = "down"', () => {
    (useScrollDirection as jest.Mock).mockReturnValue('up');
    render(<Header />);
    const navBox = screen.getByTestId('navigation-bar').parentElement;
    expect(navBox).toHaveStyle('transform: translateY(0)');
  });

  it('should pass the correct text to right-actions (support button)', () => {
    (useScrollDirection as jest.Mock).mockReturnValue('up');
    render(<Header />);
    expect(screen.getByTestId('right-actions').textContent).toContain('Support');
  });
});

import { render, screen } from '@testing-library/react';
import React from 'react';

import Header from './Header';

import { useHideHeader } from '~/shared/hooks/use-hide-header/useHideHeader';
import { useScrollDirection } from '~/shared/hooks/use-scroll-direction/useScrollDirection';

jest.mock('~/shared/hooks/use-scroll-direction/useScrollDirection', () => ({
  useScrollDirection: jest.fn()
}));

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

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => (key === 'supportButton' ? 'Support' : key)
}));

jest.mock('~/shared/hooks/use-hide-header/useHideHeader', () => ({
  useHideHeader: jest.fn()
}));

const mockHeaderData = {
  navigation: {
    liatoshynsky: 'Liatoshynsky',
    biography: 'Biography',
    artistry: 'Artistry',
    research: 'Research',
    foundation: 'Foundation',
    foundationHome: 'Home',
    news: 'News',
    mediaAboutUs: 'Media',
    archive: 'Archive',
    collaboration: 'Collaboration'
  },
  specialNavigation: [],
  supportButtonLink: '/support'
};

const mockContacts = ['contact1'];
const mockSocialLinks = ['fb'];

const renderHeader = () =>
  render(<Header headerData={mockHeaderData} contacts={mockContacts} socialLinks={mockSocialLinks} />);

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useScrollDirection as jest.Mock).mockReturnValue('up');
    (useHideHeader as jest.Mock).mockReturnValue(false);
  });

  it('should render logo, navigation-bar and right-actions', () => {
    renderHeader();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument();
    expect(screen.getByTestId('right-actions')).toBeInTheDocument();
  });

  it('should pass correct texts to navigation-bar', () => {
    renderHeader();
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
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('transform: translateY(-200%)');
  });

  it('should show navigation-bar when scrollDirection = "up"', () => {
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('transform: translateY(0)');
  });

  it('should hide header when footer is intersecting', () => {
    (useHideHeader as jest.Mock).mockReturnValue(true);
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('transform: translateY(-200%)');
  });

  it('should show header when footer is not intersecting', () => {
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('transform: translateY(0)');
  });

  it('should pass the correct text to right-actions (support button)', () => {
    renderHeader();
    expect(screen.getByTestId('right-actions').textContent).toContain('Support');
  });
});

import { fireEvent, render, screen } from '@testing-library/react';

import MobileNav from './MobileNav';
import { contactsData, LinkIcon } from '~/types/types/common.types';

import { NavigationDTO } from '~/domain/dto/navigation.dto';
import { usePathname } from '~/i18n/navigation';

jest.mock('~/i18n/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() })
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => () => ({
  isMobile: true
}));

jest.mock('./mobile-overlay/MobileOverlay', () => ({
  __esModule: true,
  default: () => <div data-testid="mobile-menu-overlay" />
}));

describe('MobileNav', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/initial');
  });

  const mockNavLabels: NavigationDTO[] = [];
  const mockContacts: contactsData = {} as any;
  const mockSocialLinks: LinkIcon[] = [];

  it('should render menu button', () => {
    render(<MobileNav navLabels={mockNavLabels} contacts={mockContacts} socialLinks={mockSocialLinks} />);

    const button = screen.getByRole('button', { name: /main menu/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('menu');
    expect(button).not.toHaveClass('opened');
  });

  it('should toggle menu on click', () => {
    render(<MobileNav navLabels={mockNavLabels} contacts={mockContacts} socialLinks={mockSocialLinks} />);

    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(button).toHaveClass('opened');

    fireEvent.click(button);
    expect(button).not.toHaveClass('opened');
  });

  it('should close menu when pathname changes', () => {
    const { rerender } = render(
      <MobileNav navLabels={mockNavLabels} contacts={mockContacts} socialLinks={mockSocialLinks} />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toHaveClass('opened');

    (usePathname as jest.Mock).mockReturnValue('/new-route');
    rerender(<MobileNav navLabels={mockNavLabels} contacts={mockContacts} socialLinks={mockSocialLinks} />);
    expect(button).not.toHaveClass('opened');
  });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import MobileMenuOverlay from './MobileOverlay';

jest.mock('@mui/material/Slide', () => {
  const MockSlide = (props: any) => <div>{props.children}</div>;
  MockSlide.displayName = 'Slide';
  return MockSlide;
});

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isMobile: false }))
}));
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
const mockUseBreakpoints = useBreakpoints as jest.Mock;

jest.mock('../nav-contacts-section/NavContacts', () => ({
  __esModule: true,
  ContactsSection: (props: any) => (
    <div data-testid="mock-contacts-section">{props.isMobile ? 'Mobile' : 'Desktop'}</div>
  )
}));

jest.mock('../../../menu-title/NavAccordion', () => ({
  __esModule: true,
  NavAccordion: ({ items }: any) => (
    <div data-testid="mock-nav-accordion">
      {items.map((i: any) => (
        <div key={i.label}>{i.label}</div>
      ))}
    </div>
  )
}));

jest.mock('~/shared/components/column-guides/ColumnGuides', () => ({
  __esModule: true,
  ColumnGuides: () => <div data-testid="mock-column-guides" />
}));

const navLabels = [
  {
    title: 'Section 1',
    links: [
      { label: 'Page A', href: '/a', visibility: true },
      { label: 'Page B', href: '/b', visibility: true }
    ]
  }
];

const contacts = {
  foundationName: 'Test Foundation',
  address: 'Test Address 12',
  phone: '+380990000000',
  email: 'test@example.com'
};

const socialLinks = [{ link: 'https://instagram.com', icon: 'inst.svg' }];

describe('MobileMenuOverlay', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
    mockUseBreakpoints.mockReturnValue({ isMobile: false }); // default desktop
  });

  test('should render closed overlay when open=false', () => {
    render(<MobileMenuOverlay open={false} navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);
    expect(screen.getByTestId('MobileMenuOverlay--closed')).toBeInTheDocument();
  });

  test('should render open overlay when open=true', () => {
    render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);
    expect(screen.getByTestId('MobileMenuOverlay--open')).toBeInTheDocument();
  });

  test('should disable body scroll when open', () => {
    render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('should restore body scroll when closed', () => {
    render(<MobileMenuOverlay open={false} navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);
    expect(document.body.style.overflow).toBe('');
  });

  test('should render left column (contacts) on desktop', () => {
    mockUseBreakpoints.mockReturnValue({ isMobile: false });
    render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);
    expect(screen.getByTestId('MobileMenuOverlay-leftColumn')).toBeInTheDocument();
    expect(screen.getByText('Desktop')).toBeInTheDocument();
  });

  test('should render mobile contacts section only when isMobile=true', () => {
    mockUseBreakpoints.mockReturnValue({ isMobile: true });
    render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);
    expect(screen.getByTestId('MobileMenuOverlay-contacts')).toBeInTheDocument();
    expect(screen.queryByTestId('MobileMenuOverlay-leftColumn')).not.toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
  });
});

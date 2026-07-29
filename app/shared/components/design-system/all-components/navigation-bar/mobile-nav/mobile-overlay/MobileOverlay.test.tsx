import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import MobileMenuOverlay from './MobileOverlay';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface MockProps {
  children?: React.ReactNode;
}

interface ContactProps {
  isMobile: boolean;
}

interface AccordionItem {
  label: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

jest.mock('@mui/material/Slide', () => {
  const MockSlide = (props: MockProps) => <div>{props.children}</div>;
  MockSlide.displayName = 'Slide';
  return MockSlide;
});

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isMobile: false }))
}));

const mockUseBreakpoints = useBreakpoints as jest.Mock;

jest.mock(
  '~/shared/components/design-system/all-components/navigation-bar/mobile-nav/mobile-overlay/nav-contacts/NavContactsSection',
  () => ({
    __esModule: true,
    ContactsSection: (props: ContactProps) => (
      <div data-testid="mock-contacts-section">{props.isMobile ? 'Mobile' : 'Desktop'}</div>
    )
  })
);

jest.mock('~/shared/components/design-system/all-components/navigation-accordion/NavAccordion', () => ({
  __esModule: true,
  NavAccordion: ({ items }: AccordionProps) => (
    <div data-testid="mock-nav-accordion">
      {items.map((i: AccordionItem) => (
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
    mockUseBreakpoints.mockReturnValue({ isMobile: false });
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

  test('should correctly map nav labels when a group has exactly one link', () => {
    const singleLinkNav = [
      {
        title: 'Single Link Section',
        links: [{ label: 'Only Page', href: '/only', visibility: true }]
      }
    ];

    render(<MobileMenuOverlay open navLabels={singleLinkNav} contacts={contacts} socialLinks={socialLinks} />);
    expect(screen.getByText('Single Link Section')).toBeInTheDocument();
    expect(screen.getByTestId('mock-nav-accordion')).toBeInTheDocument();
  });

  describe('Focus Trap keyboard navigation', () => {
    it('should ignore non-Tab keys', () => {
      render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    it('should trap Tab focus from last element to first element', () => {
      document.body.innerHTML = `
        <header>
          <button id="btn1">First</button>
          <button id="btn2">Last</button>
        </header>
      `;

      render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);

      const btn1 = document.getElementById('btn1') as HTMLElement;
      const btn2 = document.getElementById('btn2') as HTMLElement;

      btn2.focus();
      expect(document.activeElement).toBe(btn2);

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
      expect(document.activeElement).toBe(btn1);
    });

    it('should trap Shift+Tab focus from first element to last element', () => {
      document.body.innerHTML = `
        <header>
          <button id="btn1">First</button>
          <button id="btn2">Last</button>
        </header>
      `;

      render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);

      const btn1 = document.getElementById('btn1') as HTMLElement;
      const btn2 = document.getElementById('btn2') as HTMLElement;

      btn1.focus();
      expect(document.activeElement).toBe(btn1);

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(btn2);
    });

    it('should return early when no focusable elements are present in header', () => {
      document.body.innerHTML = '<header></header>';

      render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });

      expect(document.body).toBeInTheDocument();
    });
  });
});

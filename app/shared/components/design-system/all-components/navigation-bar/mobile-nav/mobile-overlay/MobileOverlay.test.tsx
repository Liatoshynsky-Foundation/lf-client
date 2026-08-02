import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
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
      <div data-testid="mock-contacts-section">
        <a href="#test-link">{props.isMobile ? 'Mobile Link' : 'Desktop Link'}</a>
      </div>
    )
  })
);

jest.mock('~/shared/components/design-system/all-components/navigation-accordion/NavAccordion', () => ({
  __esModule: true,
  NavAccordion: ({ items }: AccordionProps) => (
    <div data-testid="mock-nav-accordion">
      {items.map((i: AccordionItem) => (
        <button key={i.label}>{i.label}</button>
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
  },
  {
    title: 'Single Link Section',
    links: [{ label: 'Only Page', href: '/only', visibility: true }]
  }
];

const contacts = {
  foundationName: 'Test Foundation',
  address: 'Test Address 12',
  phone: '+380990000000',
  email: 'test@example.com'
};

const socialLinks = [{ link: 'https://instagram.com', icon: 'inst.svg' }];

const getOverlayFocusables = () => {
  const overlay = screen.getByTestId('MobileMenuOverlay--open');
  return Array.from(overlay.querySelectorAll<HTMLElement>('a[href], button'));
};

describe('MobileMenuOverlay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.style.overflow = '';
    mockUseBreakpoints.mockReturnValue({ isMobile: false });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should render closed overlay when open=false', () => {
    render(<MobileMenuOverlay open={false} navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);
    expect(screen.getByTestId('MobileMenuOverlay--closed')).toBeInTheDocument();
  });

  test('should render open overlay when open=true and set initial focus', () => {
    render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);
    expect(screen.getByTestId('MobileMenuOverlay--open')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(50);
    });

    const focusables = getOverlayFocusables();
    expect(document.activeElement).toBe(focusables[0]);
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
    expect(screen.getByText('Desktop Link')).toBeInTheDocument();
  });

  test('should render mobile contacts section only when isMobile=true', () => {
    mockUseBreakpoints.mockReturnValue({ isMobile: true });
    render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);
    expect(screen.getByTestId('MobileMenuOverlay-contacts')).toBeInTheDocument();
    expect(screen.queryByTestId('MobileMenuOverlay-leftColumn')).not.toBeInTheDocument();
    expect(screen.getByText('Mobile Link')).toBeInTheDocument();
  });

  describe('Focus Trap keyboard navigation', () => {
    it('should trigger onClose when Escape key is pressed', () => {
      const onCloseMock = jest.fn();
      render(
        <MobileMenuOverlay
          open
          onClose={onCloseMock}
          navLabels={navLabels}
          contacts={contacts}
          socialLinks={socialLinks}
        />
      );

      fireEvent.keyDown(window, { key: 'Escape' });
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should ignore non-Tab keys like Enter', () => {
      render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);
      fireEvent.keyDown(window, { key: 'Enter' });
      expect(screen.getByTestId('MobileMenuOverlay--open')).toBeInTheDocument();
    });

    it('should trap Tab focus from last element to first element', () => {
      render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);

      const focusables = getOverlayFocusables();
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      last.focus();
      expect(document.activeElement).toBe(last);

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
      expect(document.activeElement).toBe(first);
    });

    it('should trap Shift+Tab focus from first element to last element', () => {
      render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);

      const focusables = getOverlayFocusables();
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      first.focus();
      expect(document.activeElement).toBe(first);

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(last);
    });

    it('should allow normal Tab navigation when focus is on a middle element', () => {
      render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);

      const focusables = getOverlayFocusables();
      const middle = focusables[1];

      middle.focus();
      expect(document.activeElement).toBe(middle);

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
      expect(document.activeElement).toBe(middle);
    });

    it('should return early when no focusable elements are present', () => {
      render(<MobileMenuOverlay open navLabels={[]} contacts={contacts} socialLinks={[]} />);

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
      expect(screen.getByTestId('MobileMenuOverlay--open')).toBeInTheDocument();
    });

    it('should allow normal Shift+Tab navigation when focus is not on the first element', () => {
      render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);

      const focusables = getOverlayFocusables();
      const last = focusables[focusables.length - 1];

      last.focus();
      expect(document.activeElement).toBe(last);

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });

      expect(document.activeElement).toBe(last);
    });

    it('should return early when no focusable elements are present in header', () => {
      document.body.innerHTML = '<header></header>';

      render(<MobileMenuOverlay open navLabels={[]} contacts={contacts} socialLinks={[]} />);

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });

      expect(document.body).toBeInTheDocument();
    });

    it('should ignore non-Tab keyboard events', () => {
      render(<MobileMenuOverlay open navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />);

      fireEvent.keyDown(window, { key: 'Enter' });

      expect(screen.getByTestId('MobileMenuOverlay--open')).toBeInTheDocument();
    });

    it('should return early when focusableElements length is 0', () => {
      render(<MobileMenuOverlay open navLabels={[]} contacts={contacts} socialLinks={[]} />);

      const overlay = screen.getByTestId('MobileMenuOverlay--open');
      overlay.innerHTML = '';

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });

      expect(overlay).toBeInTheDocument();
    });
  });
});

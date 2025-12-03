import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { NavAccordion } from './NavAccordion';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/section/page-a')
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid={`mock-link-${href}`}>
      {children}
    </a>
  )
}));

jest.mock('~/shared/components/colored-svg/ColoredSvg', () => ({
  __esModule: true,
  Svg: ({ alt }: { alt?: string }) => <div data-testid="mock-svg">{alt}</div>
}));

jest.mock('~/public/icons/minus.svg', () => ({ __esModule: true, default: 'minus-icon' }));
jest.mock('~/public/icons/plus.svg', () => ({ __esModule: true, default: 'plus-icon' }));

const items = [
  {
    label: 'Section 1',
    href: '/section',
    dropdown: [
      { label: 'Page A', href: '/section/page-a' },
      { label: 'Page B', href: '/section/page-b' }
    ]
  },
  {
    label: 'Single Page',
    href: '/single'
  }
];

describe('NavAccordion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render main container', () => {
    render(<NavAccordion items={items} />);
    expect(screen.getByTestId('NavAccordion')).toBeInTheDocument();
  });

  test('should render both accordion and single-link items', () => {
    render(<NavAccordion items={items} />);
    expect(screen.getByTestId('NavAccordion-item-Section1')).toBeInTheDocument();
    expect(screen.getByTestId('NavAccordion-item-SinglePage')).toBeInTheDocument();
  });

  test('should render correct submenu items when closed (initial state)', () => {
    render(<NavAccordion items={items} />);
    const submenu = screen.getByTestId('NavAccordion-item-Section1-submenu');
    expect(submenu).toBeInTheDocument();
    expect(submenu.querySelectorAll('[data-testid="NavAccordion-item-Section1-submenuItem"]')).toHaveLength(2);
  });

  test('should toggle open/close when title is clicked', () => {
    render(<NavAccordion items={items} />);
    const toggleButton = screen.getByTestId('NavAccordion-item-Section1-toggle');
    expect(screen.queryByTestId('NavAccordion-item-Section1-toggle--open')).not.toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(screen.getByTestId('NavAccordion-item-Section1-toggle--open')).toBeInTheDocument();
    expect(screen.getByText('Collapse list')).toBeInTheDocument();
  });

  test('should render "active" title when pathname matches', () => {
    render(<NavAccordion items={items} />);
    const activeTitle = screen.getByTestId('NavAccordion-item-Section1--title--active');
    expect(activeTitle).toHaveTextContent('Section 1');
  });

  test('should render single link item correctly', () => {
    render(<NavAccordion items={items} />);
    const link = screen.getByTestId('mock-link-/single');
    expect(link).toHaveAttribute('href', '/single');
    expect(screen.getByText('Single Page')).toBeInTheDocument();
  });

  test('submenu links should have correct hrefs', () => {
    render(<NavAccordion items={items} />);
    const submenuLinks = screen.getAllByTestId('mock-link-/section/page-a')[0];
    expect(submenuLinks).toHaveAttribute('href', '/section/page-a');
  });

  test('marks dropdown as active for localized nested path', () => {
    (usePathname as jest.Mock).mockReturnValue('/uk/section/page-a');

    render(<NavAccordion items={items} />);

    const activeTitle = screen.getByTestId('NavAccordion-item-Section1--title--active');
    expect(activeTitle).toHaveTextContent('Section 1');
  });
});

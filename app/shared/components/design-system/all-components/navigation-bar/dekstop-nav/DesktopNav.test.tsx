import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { SVGProps } from 'react';

import DesktopNav from './DesktopNav';

import type { NavigationDTO } from '~/domain/dto/navigation.dto';

jest.mock('~/i18n/navigation', () => ({
  usePathname: jest.fn(() => '/')
}));

jest.mock('~/shared/components/colored-svg/ColoredSvg.tsx', () => ({
  Svg: (props: SVGProps<SVGSVGElement>) => <svg data-testid="svg-icon" {...props} />
}));

jest.mock('~/public/icons/chevron-down.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="chevron-down-icon" />
}));

jest.mock('~/public/icons/chevron-up.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="chevron-up-icon" />
}));

const navLabels: NavigationDTO[] = [
  {
    title: 'Фундація',
    links: [
      { label: 'Про Фундацію', href: '/about', visibility: true },
      { label: 'Новини', href: '/news', visibility: true },
      { label: 'Медіа про нас', href: '/media', visibility: true }
    ]
  },
  {
    title: 'Кабінет-Архів',
    links: [{ label: 'Кабінет-Архів', href: '/archive', visibility: true }]
  },
  {
    title: 'Співпраця',
    links: [{ label: 'Співпраця', href: '/collaboration', visibility: true }]
  }
];

describe('DesktopNav', () => {
  let originalResizeObserver: typeof global.ResizeObserver;

  beforeAll(() => {
    originalResizeObserver = global.ResizeObserver;

    global.ResizeObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }));
  });

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
  });

  it('should render all top-level navigation labels', () => {
    render(<DesktopNav navLabels={navLabels} />);

    expect(screen.getByText('Фундація')).toBeInTheDocument();
    expect(screen.getByText('Кабінет-Архів')).toBeInTheDocument();
    expect(screen.getByText('Співпраця')).toBeInTheDocument();
  });

  it('should open dropdown when clicking on a group with multiple links', () => {
    render(<DesktopNav navLabels={navLabels} />);

    fireEvent.click(screen.getByText('Фундація'));

    expect(screen.getByText('Про Фундацію')).toBeInTheDocument();
    expect(screen.getByText('Новини')).toBeInTheDocument();
    expect(screen.getByText('Медіа про нас')).toBeInTheDocument();
  });

  it('should close dropdown when clicking on a dropdown item', async () => {
    render(<DesktopNav navLabels={navLabels} />);
    fireEvent.click(screen.getByText('Фундація'));

    fireEvent.click(screen.getByText('Про Фундацію'));

    await waitFor(() => {
      expect(screen.queryByText('Про Фундацію')).not.toBeInTheDocument();
    });
  });

  it('should assign correct href to single-link navigation items', () => {
    render(<DesktopNav navLabels={navLabels} />);

    const archiveLink = screen.getByText('Кабінет-Архів').closest('a');
    const collabLink = screen.getByText('Співпраця').closest('a');

    expect(archiveLink).toHaveAttribute('href', '/archive');
    expect(collabLink).toHaveAttribute('href', '/collaboration');
  });

  it('dropdown items have correct hrefs', () => {
    render(<DesktopNav navLabels={navLabels} />);
    fireEvent.click(screen.getByText('Фундація'));

    expect(screen.getByText('Новини').closest('a')).toHaveAttribute('href', '/news');
    expect(screen.getByText('Медіа про нас').closest('a')).toHaveAttribute('href', '/media');
  });
});

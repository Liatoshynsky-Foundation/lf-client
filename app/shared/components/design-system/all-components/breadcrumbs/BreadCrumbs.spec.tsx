import { render, screen } from '@testing-library/react';
import * as nextNavigation from 'next/navigation';

import CustomBreadcrumbs from './CustomBreadCrumbs';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: jest.fn()
}));

describe('CustomBreadcrumbs', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render Custom Breadcrumbs component', () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue('/');

    render(<CustomBreadcrumbs />);
    const breadcrumbNav = screen.getByRole('navigation');
    expect(breadcrumbNav).toBeInTheDocument();
  });

  it('should render Home page link', () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue('/');

    render(<CustomBreadcrumbs />);
    expect(screen.getByRole('link', { name: /home page/i })).toBeInTheDocument();
  });

  it('should render 3-levels breadcrumb page link', () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue('/level1/level2/level3');
    render(<CustomBreadcrumbs />);

    expect(screen.getByRole('link', { name: /home page/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /level1/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /level2/i })).toBeInTheDocument();

    expect(screen.queryByRole('link', { name: /level3/i })).not.toBeInTheDocument();
  });
  it('should render Typography  if the element is the last in the breadcrumb', () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue('/about-us');
    render(<CustomBreadcrumbs />);
    expect(screen.getByRole('link', { name: /home page/i })).toBeInTheDocument();
    const typography = screen.getByText('about-us');
    expect(typography.tagName.toLowerCase()).toBe('p');
  });

  it('should renders nothing for just base path', () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue('/');

    render(<CustomBreadcrumbs />);
    expect(screen.queryByText('not exisitng breadcrumb1')).not.toBeInTheDocument();
    expect(screen.queryByText('not existing breadcrumb2')).not.toBeInTheDocument();
  });
});

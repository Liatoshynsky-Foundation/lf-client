import { render, screen } from '@testing-library/react';
import CustomBreadcrumbs from './BreadCrumbs';
import * as nextNavigation from 'next/navigation';

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    usePathname: jest.fn(),
}));

describe('CustomBreadcrumbs', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('renders Custom Breadcrumbs component', () => {
        (nextNavigation.usePathname as jest.Mock).mockReturnValue('/');

        render(<CustomBreadcrumbs />);
        const breadcrumbNav = screen.getByRole('navigation');
        expect(breadcrumbNav).toBeInTheDocument();
    });

    test('renders Home page link', () => {
        (nextNavigation.usePathname as jest.Mock).mockReturnValue('/');

        render(<CustomBreadcrumbs />);
        expect(screen.getByRole('link', { name: /home page/i })).toBeInTheDocument();
    });

    test('renders 3-levels breadcrumb page link', () => {
        (nextNavigation.usePathname as jest.Mock).mockReturnValue('/level1/level2/level3');
        render(<CustomBreadcrumbs />);

        expect(screen.getByRole('link', { name: /home page/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /level1/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /level2/i })).toBeInTheDocument();

        expect(screen.queryByRole('link', { name: /level3/i })).not.toBeInTheDocument();
    });
    test('renders Typography  if the element is the last in the breadcrumb', () => {
        (nextNavigation.usePathname as jest.Mock).mockReturnValue('/about-us');
        render(<CustomBreadcrumbs />);
        expect(screen.getByRole('link', { name: /home page/i })).toBeInTheDocument();
        const typography = screen.getByText('about-us');
        expect(typography.tagName.toLowerCase()).toBe('p');
    });

    test('renders nothing for just base path', () => {
        (nextNavigation.usePathname as jest.Mock).mockReturnValue('/');

        render(<CustomBreadcrumbs />);
        expect(screen.queryByText('not exisitng breadcrumb1')).not.toBeInTheDocument();
        expect(screen.queryByText('not existing breadcrumb2')).not.toBeInTheDocument();
    });
});

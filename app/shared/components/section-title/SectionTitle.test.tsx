import { render, screen } from '@testing-library/react';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import SectionTitle from './SectionTitle';

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints');

const mockUseBreakpoints = (overrides = {}) => {
  (useBreakpoints as jest.Mock).mockReturnValue({
    isDesktop: false,
    isLaptopAndAbove: false,
    isLaptop: false,
    isTablet: false,
    isMobile: false,
    ...overrides
  });
};

describe('SectionTitle', () => {
  it('should render title with icon on laptopAndAbove', () => {
    mockUseBreakpoints({ isLaptopAndAbove: true });
    render(<SectionTitle title="Test title" />);

    const title = screen.getByText('Test title');
    const icon = screen.getByAltText('ellipse');
    expect(title).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '30');
  });

  it('should render title with icon on tablet and mobile', () => {
    mockUseBreakpoints({ isTablet: true });
    render(<SectionTitle title="Test title" />);

    const title = screen.getByText('Test title');
    const icon = screen.getByAltText('ellipse');
    expect(title).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('width', '22');
    expect(icon).toHaveAttribute('height', '20');
  });

  it('should render title without icon', () => {
    render(<SectionTitle icon={false} title="Test title" />);

    const title = screen.getByText('Test title');
    const icon = screen.queryByAltText('ellipse');
    expect(title).toBeInTheDocument();
    expect(icon).not.toBeInTheDocument();
  });
});

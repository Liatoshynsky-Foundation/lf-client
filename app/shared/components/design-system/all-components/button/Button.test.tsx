import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Button from './Button';

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

const mockedUseBreakpoints = jest.fn();

mockedUseBreakpoints.mockReturnValue({
  isMobile: false
});

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => () => mockedUseBreakpoints());

describe('Button Component', () => {
  const startIcon = <span data-testid="start-icon">start</span>;
  const endIcon = <span data-testid="end-icon">end</span>;

  it('should display icons when provided and not loading', () => {
    render(<Button startIcon={startIcon} endIcon={endIcon} label="Icons" />);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('should not display icons when loading', () => {
    render(
      <Button startIcon={startIcon} endIcon={endIcon} label="Icons" loading>
        Loading
      </Button>
    );
    expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();
  });

  it('should disable interaction and show loader when loading', () => {
    const handleClick = jest.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading
      </Button>
    );

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render as a link when link prop is provided', () => {
    render(<Button link="/test-link" label="Go" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-link');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should display children if label not provided', () => {
    render(
      <Button>
        <span data-testid="child">Child Content</span>
      </Button>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should use shortLabel on mobile', () => {
    mockedUseBreakpoints.mockReturnValue({
      isMobile: true
    });
    render(<Button label="Long Label" shortLabel="Short" />);
    expect(screen.getByText('Short')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import React from 'react';

import ButtonCard from './ButtonCard';

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  )
}));

describe('ButtonCard', () => {
  const defaultProps = {
    text: 'Test Button'
  };

  it('should render with text', () => {
    render(<ButtonCard {...defaultProps} />);

    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should render without link', () => {
    render(<ButtonCard {...defaultProps} />);

    expect(screen.queryByTestId('mock-link')).not.toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should render with link', () => {
    render(<ButtonCard {...defaultProps} link="/test-link" />);

    expect(screen.getByTestId('mock-link')).toBeInTheDocument();
    expect(screen.getByTestId('mock-link')).toHaveAttribute('href', '/test-link');
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should render background element with correct className', () => {
    const { container } = render(<ButtonCard {...defaultProps} />);

    expect(container.querySelector('.background')).toBeInTheDocument();
  });
});

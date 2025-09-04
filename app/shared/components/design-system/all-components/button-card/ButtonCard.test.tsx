import { render, screen } from '@testing-library/react';
import React, { ComponentType } from 'react';

import ButtonCard from './ButtonCard';

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  )
}));

jest.mock('~/public/icons/arrow-down-right.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="arrow-down-right" />
}));

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ Component, alt }: { Component: ComponentType; alt?: string }) => (
    <div data-testid="svg-wrapper">
      <Component />
      {alt}
    </div>
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

  it('should render the arrow-down-right icon', () => {
    render(<ButtonCard {...defaultProps} />);

    expect(screen.getByTestId('svg-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-down-right')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import React from 'react';

import MessageBadge from './MessageBadge';

describe('MessageBadge', () => {
  it('should render the SVG icon', () => {
    render(<MessageBadge />);
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
  });

  it('should display the correct badge content when variant is standard', () => {
    render(<MessageBadge content={3} color="primary" />);
    expect(screen.getByText('3')).toBeVisible();
  });

  it('should apply pointer cursor when onClick is provided', () => {
    render(<MessageBadge onClick={() => {}} />);
    const icon = screen.getByRole('img');
    const parent = icon.parentElement;

    expect(parent).toHaveStyle('cursor: pointer');
  });
});

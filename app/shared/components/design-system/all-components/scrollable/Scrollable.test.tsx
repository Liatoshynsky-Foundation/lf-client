import { render, screen } from '@testing-library/react';
import React from 'react';

import Scrollable from './Scrollable';

describe('Scrollable wrapper', () => {
  beforeEach(() => {
    render(
      <Scrollable data-testid="scrollable">
        <div>Test Content</div>
        <div>Some content</div>
        <div data-testid="child">Test Content</div>
      </Scrollable>
    );
  });

  it('renders children', () => {
    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Test Content');
  });

  it('applies native scrolling styles', () => {
    const scrollableEl = screen.getByTestId('scrollable');
    const overflowY = getComputedStyle(scrollableEl).overflowY;
    expect(overflowY).toBe('auto');
  });
});

import { render, screen } from '@testing-library/react';
import React from 'react';

import { SkewedBlock } from './SkewedBlock';

describe('SkewedBlock', () => {
  beforeEach(() => {
    render(
      <SkewedBlock image="/image.svg" backgroundSize="cover" height={{ xs: 200 }} sx={{ backgroundPosition: 'center' }}>
        <div data-testid="child">Test content</div>
      </SkewedBlock>
    );
  });
  it('should render with basic props', () => {
    expect(screen.getByTestId('skewed-block')).toBeInTheDocument();
  });
  it('should apply correct background image', () => {
    expect(screen.getByTestId('skewed-block')).toHaveStyle('background-image: url(/image.svg)');
  });
  it('should apply custom styles from sx prop', () => {
    expect(screen.getByTestId('skewed-block')).toHaveStyle('background-position: center');
  });
  it('should apply correct background size', () => {
    expect(screen.getByTestId('skewed-block')).toHaveStyle('background-size: cover');
  });
  it('should render children correctly', () => {
    expect(screen.getByTestId('child')).toHaveTextContent('Test content');
  });
});

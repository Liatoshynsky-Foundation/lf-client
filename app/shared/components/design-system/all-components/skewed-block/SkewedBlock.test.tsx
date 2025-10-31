import { render, screen } from '@testing-library/react';
import React from 'react';

import { SkewedBlock } from './SkewedBlock';

jest.mock('next/image');

describe('SkewedBlock', () => {
  it('should render with basic props', () => {
    render(<SkewedBlock image="/image.svg" backgroundSize="cover" height={{ xs: 200 }} />);
    expect(screen.getByTestId('skewed-block')).toBeInTheDocument();
  });
  it('should apply correct background image', () => {
    render(<SkewedBlock image="/image.svg" isBackground backgroundSize="cover" height={{ xs: 200 }} />);
    expect(screen.getByTestId('skewed-block')).toHaveStyle('background-image: url(/image.svg)');
  });
  it('should apply custom styles from sx prop', () => {
    render(
      <SkewedBlock
        image="/image.svg"
        isBackground
        backgroundSize="cover"
        height={{ xs: 200 }}
        sx={{ backgroundPosition: 'center' }}
      />
    );
    expect(screen.getByTestId('skewed-block')).toHaveStyle('background-position: center');
  });
  it('should apply correct background size', () => {
    render(<SkewedBlock image="/image.svg" backgroundSize="contain" sx={{ objectFit: 'contain' }} />);
    const img = screen.queryByLabelText('image-with-caption');
    expect(img).toHaveStyle('object-fit: contain');
  });
  it('should render children correctly', () => {
    render(
      <SkewedBlock image="/image.svg" backgroundSize="cover" height={{ xs: 200 }}>
        <div data-testid="child">Test content</div>
      </SkewedBlock>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Test content');
  });
  it('should render the caption if the caption prop is passed', () => {
    render(<SkewedBlock image="/image.svg" backgroundSize="contain" caption="Some caption" />);
    expect(screen.getByText(/Some caption/)).toBeInTheDocument();
  });
});

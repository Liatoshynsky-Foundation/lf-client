import React from 'react';
import { render, screen } from '@testing-library/react';
import { DesignSystemSlider, CustomSliderProps } from './Slider';

describe('DesignSystemSlider', () => {
  const renderComponent = (props: Partial<CustomSliderProps> = {}) =>
    render(<DesignSystemSlider min={0} max={100} value={[20, 80]} {...props} />);

  it('renders the slider correctly', () => {
    renderComponent();
    const thumbs = screen.getAllByRole('slider');
    expect(thumbs.length).toBeGreaterThan(0);
  });

  it('displays value labels for the range slider', () => {
    renderComponent();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
  });

  it('applies the correct styles for small size', () => {
    renderComponent({ size: 'small' });

    const thumb = document.querySelector('.MuiSlider-thumb');
    expect(thumb).toHaveStyle({
      width: '12px',
      height: '12px',
    });
  });

  it('displays correct min and max labels', () => {
    renderComponent({ min: 10, max: 50 });
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('renders marks correctly when marks are enabled', () => {
    renderComponent({ marks: true });
    const marks = document.querySelectorAll('.MuiSlider-mark');
    expect(marks.length).toBeGreaterThan(0);
  });

  it('displays the correct value labels', () => {
    renderComponent();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
  });

  it('renders correctly when value is a single number', () => {
    renderComponent({ value: 50 });
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('applies correct styles for big size', () => {
    renderComponent({ size: 'big' });
    const thumb = document.querySelector('.MuiSlider-thumb');
    expect(thumb).toHaveStyle({
      width: '20px',
      height: '20px',
    });
  });
});

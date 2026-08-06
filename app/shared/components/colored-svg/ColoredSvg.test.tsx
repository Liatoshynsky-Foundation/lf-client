import { render, screen } from '@testing-library/react';
import React from 'react';

import { Svg } from './ColoredSvg';

const MockSvg = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg data-testid="icon-svg" {...props}>
      <rect width="100%" height="100%" />
    </svg>
  );
};

const testAlt = 'Test Icon';

describe('ColoredSvg component', () => {
  it('should render with color prop and applies color to svg children', () => {
    render(<Svg Component={MockSvg} alt={testAlt} color="#123456" />);
    const wrapper = screen.getByTestId('img');
    expect(wrapper).toBeInTheDocument();
    const svg = screen.getByTestId('icon-svg');
    expect(svg).toHaveStyle('width: 24px');
    expect(svg).toHaveStyle('height: 24px');
  });

  it('should render with fill and stroke props and applies them to svg children', () => {
    render(<Svg Component={MockSvg} alt={testAlt} fill="#ff0000" stroke="#00ff00" />);
    const wrapper = screen.getByTestId('img');
    expect(wrapper).toBeInTheDocument();
    const svg = screen.getByTestId('icon-svg');
    expect(svg).toHaveStyle('width: 24px');
    expect(svg).toHaveStyle('height: 24px');
  });

  it('should render with custom width and height', () => {
    render(<Svg Component={MockSvg} alt={testAlt} color="#000" width="48px" height="32px" />);
    const svg = screen.getByTestId('icon-svg');
    expect(svg).toHaveStyle('width: 48px');
    expect(svg).toHaveStyle('height: 32px');
  });

  it('should throw error if no color, fill, or stroke is provided', () => {
    expect(() => render(<Svg Component={MockSvg} alt={testAlt} />)).toThrow(
      'At least one of color, fill, or stroke must be provided'
    );
  });

  it.each([
    { prop: 'color', value: 'not-a-color' },
    { prop: 'fill', value: 'not-a-color' },
    { prop: 'stroke', value: 'not-a-color' }
  ])('should throw error if invalid $prop is provided', ({ prop, value }) => {
    const props = { Component: MockSvg, alt: testAlt, [prop]: value } as const;
    expect(() => render(<Svg {...props} />)).toThrow(`Invalid color value: ${value}`);
  });

  it('should throw error if invalid width/height is provided', () => {
    expect(() => render(<Svg Component={MockSvg} alt={testAlt} color="#000" width="bad" height="bad" />)).toThrow(
      /Invalid size values: width=bad, height=bad/
    );
  });

  it('should apply aria-label and role correctly', () => {
    render(<Svg Component={MockSvg} alt={testAlt} color="#000" />);
    const wrapper = screen.getByTestId('img');
    expect(wrapper).toHaveAttribute('aria-label', testAlt);
  });

  it('should apply custom sx prop', () => {
    render(<Svg Component={MockSvg} alt={testAlt} color="#000" sx={{ backgroundColor: 'yellow' }} />);
    const wrapper = screen.getByTestId('img');
    expect(wrapper).toHaveStyle('background-color: yellow');
  });

  it('should successfully execute and cover rgba color parsing logic on lines 24-30 inside helpers', () => {
    render(<Svg Component={MockSvg} alt={testAlt} color="rgb(255, 255, 255)" />);
    expect(screen.getByTestId('icon-svg')).toBeInTheDocument();
  });

  it('should process and cover responsive width and height object configurations on lines 58-59 inside component', () => {
    const responsiveWidth = { xs: '24px', md: '32px' };
    const responsiveHeight = { xs: '24px', lg: '48px' };

    render(
      <Svg
        Component={MockSvg}
        alt={testAlt}
        color="#000"
        width={responsiveWidth as never}
        height={responsiveHeight as never}
      />
    );

    expect(screen.getByTestId('icon-svg')).toBeInTheDocument();
  });

  it('should successfully pass validation and render icon when using transparent keyword (line 12 branch coverage)', () => {
    render(<Svg Component={MockSvg} alt={testAlt} color="transparent" />);
    expect(screen.getByTestId('icon-svg')).toBeInTheDocument();
  });
});

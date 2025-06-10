import { render, screen } from '@testing-library/react';
import React from 'react';

import { Svg } from './ColoredSvg';
import { validateSvgColor, validateSvgSize } from './ColoredSvg.validations';

jest.mock('@public/check-icon.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="icon-svg" />
}));

const iconSrc = 'check-icon';
const testColor = '#FF0000';
const testWidth = '100px';
const testHeight = '100px';
const testAlt = 'Test Icon';

describe('Full Colored Svg Suite', () => {
  describe('Valid Svg (ColoredSvg component)', () => {
    beforeEach(() => {
      render(<Svg src={iconSrc} color={testColor} alt={testAlt} width={testWidth} height={testHeight} />);
    });

    it('should render the svg icon with alt', () => {
      const svgElement = screen.getByTestId('icon-svg');
      expect(svgElement).toBeInTheDocument();
    });

    it('should apply the correct color to the wrapping element', () => {
      const wrapper = screen.getByTestId('icon-svg').parentElement;
      expect(wrapper).toHaveStyle(`color: ${testColor}`);
    });

    it('should render wrapper with all provided attributes', () => {
      const wrapper = screen.getByTestId('icon-svg').parentElement;
      expect(wrapper).toHaveRole('img');
      expect(wrapper).toHaveAttribute('aria-label', testAlt);
    });

    it('should pass width and height styles to the svg element via the wrapping Box', () => {
      const svgElement = screen.getByTestId('icon-svg');

      expect(svgElement).toHaveStyle(`width: ${testWidth}`);
      expect(svgElement).toHaveStyle(`height: ${testHeight}`);
    });
  });

  describe('Valid SVG with default params', () => {
    beforeEach(() => {
      render(<Svg src={iconSrc} alt={testAlt} color={testColor} />);
    });

    it('should render the svg icon with default width and height', () => {
      const svgElement = screen.getByTestId('icon-svg');
      expect(svgElement).toBeInTheDocument();
      expect(svgElement).toHaveStyle('width: 24px');
      expect(svgElement).toHaveStyle('height: 24px');
    });

    it('should apply the correct color to the wrapping element', () => {
      const wrapper = screen.getByTestId('icon-svg').parentElement;
      expect(wrapper).toHaveStyle(`color: ${testColor}`);
    });
  });

  describe('Invalid Svg', () => {
    it('should throw an error if an invalid color is provided', () => {
      expect(() =>
        render(<Svg src={iconSrc} color="not-a-color" alt={testAlt} width={testWidth} height={testHeight} />)
      ).toThrow('Invalid color value: not-a-color');
    });

    it('should throw an error if invalid width/height is provided', () => {
      expect(() =>
        render(<Svg src={iconSrc} color={testColor} alt={testAlt} width="200pixels" height="200pixels" />)
      ).toThrow(/Invalid size values: width=200pixels, height=200pixels/);
    });
  });

  describe('Validation tests', () => {
    describe('validateSvgColor', () => {
      it('should return true for valid hex colors', () => {
        expect(validateSvgColor('#fff')).toBe(true);
        expect(validateSvgColor('#ffffff')).toBe(true);
        expect(validateSvgColor('#ABCDEF')).toBe(true);
      });

      it('should return true for valid rgb/rgba color functions', () => {
        expect(validateSvgColor('rgb(255, 0, 0)')).toBe(true);
        expect(validateSvgColor('rgba(255, 0, 0, 0.5)')).toBe(true);
      });

      it('should return false for invalid colors', () => {
        expect(validateSvgColor('notacolor')).toBe(false);
        expect(validateSvgColor('#1234')).toBe(false);
        expect(validateSvgColor('rgb(300,0,0)')).toBe(false);
      });
    });

    describe('validateSvgSize', () => {
      it('should return true for valid size values', () => {
        expect(validateSvgSize('100px', '50px')).toBe(true);
        expect(validateSvgSize('1.5em', '2.75em')).toBe(true);
        expect(validateSvgSize('200%', '100%')).toBe(true);
      });

      it('should return false for invalid size values', () => {
        expect(validateSvgSize('100', '50px')).toBe(false);
        expect(validateSvgSize('10.555px', '20px')).toBe(false);
        expect(validateSvgSize('100px', 'abc')).toBe(false);
      });
    });
  });
});

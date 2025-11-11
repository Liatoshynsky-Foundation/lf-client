import { ResponsiveSize } from './ColoredSvg';

export const validateSvgColor = (color: string) => {
  if (color === 'none') {
    return true;
  }

  const wslessColor = color.replace(/\s+/g, '');

  const rgbaPattern = /^rgba?\((\d{1,3},){2}\d{1,3}(,0?\.?\d+)?\)$/;
  const hexPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

  if (rgbaPattern.test(wslessColor)) {
    const rgbaValues = rgbaPattern.exec(wslessColor);
    if (rgbaValues) {
      const rgbParts = rgbaValues[0]
        .replace(/rgba?\(|\)/g, '')
        .split(',')
        .map(Number);
      return rgbParts.every((value) => value >= 0 && value <= 255);
    }
  }

  return hexPattern.test(wslessColor);
};

const VALID_BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'ultra'] as const;

export const validateSvgSize = (width: ResponsiveSize, height: ResponsiveSize): boolean => {
  const validate = (val: ResponsiveSize): boolean => {
    const sizePattern = /^\d{1,5}(\.\d{1,2})?(px|em|rem|%)$/;

    if (typeof val === 'string') {
      return sizePattern.test(val);
    }

    if (val && typeof val === 'object') {
      return Object.entries(val).every(
        ([key, value]) =>
          VALID_BREAKPOINTS.includes(key as (typeof VALID_BREAKPOINTS)[number]) && sizePattern.test(value)
      );
    }

    return false;
  };

  return validate(width) && validate(height);
};

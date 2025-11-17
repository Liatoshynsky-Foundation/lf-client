import { ResponsiveSize } from './ColoredSvg';
import { isColor, isSize } from './ColoredSvg.helpers';

export const validateSvgColor = (color: string) => {
  if (color === 'none') {
    return true;
  }

  return isColor(color);
};

export const VALID_BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'ultra'] as const;

export const validateSvgSize = (width: ResponsiveSize, height: ResponsiveSize): boolean => {
  const validate = (val: ResponsiveSize): boolean => {
    if (typeof val === 'string') {
      return isSize(val);
    }

    if (val && typeof val === 'object') {
      return Object.entries(val).every(
        ([key, value]) => VALID_BREAKPOINTS.includes(key as (typeof VALID_BREAKPOINTS)[number]) && isSize(value)
      );
    }

    return false;
  };

  return validate(width) && validate(height);
};

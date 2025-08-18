import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

import { styles } from './ColoredSvg.styles';
import { validateSvgColor, validateSvgSize } from './ColoredSvg.validations';

type SvgProps = {
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  alt: string;
  color?: string;
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
  sx?: SxProps<Theme>;
};

/**
 * Attention!!! This is actually documentation so you don't message me
 *
 * To begin using this component you need:
 * - Svg file imported in direct parent component to pass it to `Component` prop
 * - Svg file you import must have `fill` and `stroke` properties on all tags EXCEPT `<svg>` set to `currentColor`
 * this will allow to control color of the svg
 * - If you need to fill svg but property doesn't exist, add it and set to `currentColor`
 * - In `<svg>` tag you must delete `width` and `height` properties (this will allow to control size of the svg)
 * - The `color` prop will override `fill` if it isn't passed to component
 * - The `color` prop will override `stroke` if it isn't passed to component
 * - The `color` prop defaults to `'none'` if `fill` or `stroke` is provided.
 *
 * @example
 * import MyIcon from './MyIcon.svg';
 *
 * <Svg
 *     Component={MyIcon}
 *     alt="My icon"
 *     color="#FF0000"
 *     width="48px"
 *     height="48px"
 * />
 */
export const Svg = ({ Component, alt, color, fill, stroke, width, height, sx }: SvgProps) => {
  if (!color && !fill && !stroke) {
    throw new Error('At least one of color, fill, or stroke must be provided');
  } else if (!color && (fill || stroke)) {
    color = 'none';
  }

  const colorSettings = { color, fill, stroke };

  for (const [key, value] of Object.entries(colorSettings)) {
    if (value && !validateSvgColor(value)) {
      throw new Error(`Invalid color value for ${key}: ${value}`);
    }
  }

  if (width && height && !validateSvgSize(width, height)) {
    throw new Error(`Invalid size values: width=${width}, height=${height}`);
  }

  const dynamicStyles = {
    '& svg': {
      width: width ?? '24px',
      height: height ?? '24px'
    },
    '& svg *': {
      fill: fill ?? color,
      stroke: stroke ?? color
    }
  };

  return (
    <Box sx={{ ...styles, ...sx, ...dynamicStyles }} data-testid="img" aria-label={alt}>
      <Component />
    </Box>
  );
};

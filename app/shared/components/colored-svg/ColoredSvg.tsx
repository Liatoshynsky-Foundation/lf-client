import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

import { styles } from './ColoredSvg.styles';
import { validateSvgColor, validateSvgSize } from './ColoredSvg.validations';

interface SvgProps {
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  alt: string;
  width?: string;
  height?: string;
  sx?: SxProps<Theme>;
}

export const Svg = ({ Component, color, alt, width, height, sx }: SvgProps) => {
  if (!validateSvgColor(color)) {
    throw new Error(`Invalid color value: ${color}`);
  }

  if (width && height && !validateSvgSize(width, height)) {
    throw new Error(`Invalid size values: width=${width}, height=${height}`);
  }

  const dynamicStyles = {
    color: color,
    '& svg': {
      width: width ?? '24px',
      height: height ?? '24px'
    },
    ...sx
  };

  return (
    <Box sx={{ ...styles, ...dynamicStyles }} role="img" aria-label={alt}>
      <Component />
    </Box>
  );
};

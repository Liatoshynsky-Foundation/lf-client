import dynamic from 'next/dynamic';
import { styles } from './ColoredSvg.styles';
import { Box } from '@mui/material';
import { validateSvgColor, validateSvgSize } from './ColoredSvg.validations';
import React from 'react';

interface SvgProps {
  src: string;
  color: string;
  alt: string;
  width?: string;
  height?: string;
}

export const Svg = ({ src, color, alt, width, height }: SvgProps) => {
  const IconComponent = dynamic(() => import(`~/public/${src}.svg`));

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
    }
  };

  return (
    <Box sx={{ ...styles, ...dynamicStyles }} role="img" aria-label={alt}>
      <IconComponent />
    </Box>
  );
};

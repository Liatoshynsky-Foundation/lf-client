import dynamic from 'next/dynamic';
import { styles } from './ColoredSvg.styles';
import { Box } from '@mui/material';
import { validateSvgColor, validateSvgSize } from './ColoredSvg.validations';

interface SvgProps {
  name: string;
  color: string;
  width?: string;
  height?: string;
}

export const Svg = ({ name, color, width, height }: SvgProps) => {
  const IconComponent = dynamic(() => import(`@public/${name}.svg`));

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
    <Box sx={{ ...styles, ...dynamicStyles }}>
      <IconComponent />
    </Box>
  );
};

import dynamic from 'next/dynamic';
import { styles } from './ColoredSvg.styles';
import { Box } from '@mui/material';

interface SvgProps {
  name: string;
  color: string;
  width?: string | number;
  height?: string | number;
}

export const Svg = ({ name, color, width, height }: SvgProps) => {
  const IconComponent = dynamic(() => import(`@public/${name}.svg`));

  return (
    <Box sx={{ ...styles, color: color, '& svg': { width, height } }}>
      <IconComponent />
    </Box>
  );
};

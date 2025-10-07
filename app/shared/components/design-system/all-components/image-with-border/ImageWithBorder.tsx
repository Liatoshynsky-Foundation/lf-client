import { Box } from '@mui/material';
import Image from 'next/image';

import { styles } from './ImageWithBorder.styles';

export interface BorderParams {
  width: number;
  height: number;
}

interface ImageWithBorderProps {
  image: string;
  width: number;
  height: number;
  border: BorderParams;
  alt: string;
}

export default function ImageWithBorder({ image, width, height, border, alt }: ImageWithBorderProps) {
  return (
    <Box sx={styles.container(width, height)}>
      <Box sx={styles.border(border)} />
      <Image width={width} height={height} alt={alt} src={image} />
    </Box>
  );
}

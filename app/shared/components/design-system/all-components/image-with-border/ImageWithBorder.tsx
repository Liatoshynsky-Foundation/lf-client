import { Box } from '@mui/material';
import Image from 'next/image';

import { styles } from './ImageWithBorder.styles';

interface ImageWithBorderProps {
  image: string;
  width?: number;
  height?: number;
  borderWidth?: number;
  alt: string;
}

export default function ImageWithBorder({
  image,
  width,
  height,
  borderWidth = 8,
  alt
}: Readonly<ImageWithBorderProps>) {
  const useFillMode = !width || !height;

  return (
    <Box sx={styles.container(width, height)}>
      <Box sx={styles.border(borderWidth, height)} />
      {useFillMode ? (
        <Image alt={alt} src={image} fill style={{ objectFit: 'cover' }} />
      ) : (
        <Image width={width} height={height} alt={alt} src={image} />
      )}
    </Box>
  );
}

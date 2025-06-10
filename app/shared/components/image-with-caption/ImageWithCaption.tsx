import { Box, BoxProps, Breakpoint, Typography, TypographyProps } from '@mui/material';
import Image from 'next/image';

import { styles } from './ImageWithCaption.styles';
import { ElementSizes } from '~/types/types/common.types';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';

export interface BorderProps {
  sizes: ElementSizes;
  top: Partial<Record<Breakpoint, number>>;
  left: Partial<Record<Breakpoint, number>>;
}

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption: string;
  sizes: ElementSizes;
  border?: BorderProps;
  containerSx?: BoxProps['sx'];
  captionSx?: TypographyProps['sx'];
}

const ImageWithCaption: React.FC<ImageWithCaptionProps> = ({
  src,
  alt,
  sizes,
  caption,
  border,
  containerSx = {},
  captionSx = {}
}) => {
  const sizesAttribute = generateSizesAttribute(sizes);

  return (
    <Box sx={{ ...containerSx, ...styles.container } as BoxProps['sx']}>
      {border && <Box sx={styles.border(border)} data-testid="img-border" />}
      <Box sx={styles.imageContainer(sizes)}>
        <Image style={styles.image as React.CSSProperties} src={src} fill alt={alt} sizes={sizesAttribute} />
      </Box>
      <Typography sx={{ ...captionSx, ...styles.caption(sizes) } as TypographyProps['sx']}>{caption}</Typography>
    </Box>
  );
};

export default ImageWithCaption;

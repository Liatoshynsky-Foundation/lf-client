import { Box, BoxProps, Breakpoint, Typography, TypographyProps } from '@mui/material';
import Image from 'next/image';

import { styles } from './ImageWithCaption.styles';
import { ElementSizes } from '~/types/types/common.types';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';

export interface BorderProps {
  sizes: ElementSizes;
  top: Partial<Record<Breakpoint, number>>;
  left: Partial<Record<Breakpoint, number>>;
  color?: string;
}

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption: string;
  sizes: ElementSizes;
  border?: BorderProps;
  align?: 'left' | 'right';
  containerSx?: BoxProps['sx'];
  imageSx?: BoxProps['sx'];
  captionSx?: TypographyProps['sx'];
  dataTestId?: string;
}

const ImageWithCaption: React.FC<ImageWithCaptionProps> = ({
  src,
  alt,
  sizes,
  caption,
  border,
  align = 'right',
  containerSx = {},
  imageSx = {},
  captionSx = {},
  dataTestId
}) => {
  const sizesAttribute = generateSizesAttribute(sizes);

  console.log(src);

  return (
    <Box sx={{ ...styles.container, ...containerSx } as BoxProps['sx']} data-testid={dataTestId}>
      <Box sx={{ ...styles.imageContainer(sizes), ...imageSx } as BoxProps['sx']}>
        {border && <Box sx={styles.border(border)} data-testid="img-border" />}
        <Image style={styles.image as React.CSSProperties} src={src} fill alt={alt} sizes={sizesAttribute} />
      </Box>
      <Typography sx={{ ...styles.caption(sizes, align), ...captionSx } as TypographyProps['sx']}>{caption}</Typography>
    </Box>
  );
};

export default ImageWithCaption;

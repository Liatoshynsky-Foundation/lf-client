import { Box, BoxProps, Breakpoint, Typography, TypographyProps } from '@mui/material';
import Image from 'next/image';
import { Locale, useLocale } from 'next-intl';

import { styles } from './ImageWithCaption.styles';
import { ElementSizes } from '~/types/types/common.types';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';

export interface BorderProps {
  sizes: ElementSizes;
  top: Partial<Record<Breakpoint, number>>;
  left: Partial<Record<Breakpoint, number>>;
  color?: string;
}

type LocalizedString = Record<Locale, string>;

interface ImageWithCaptionProps {
  src: string;
  alt: string | LocalizedString;
  caption: string | LocalizedString | null;
  sizes: ElementSizes;
  border?: BorderProps;
  align?: 'left' | 'right';
  containerSx?: BoxProps['sx'];
  imageSx?: BoxProps['sx'];
  captionSx?: TypographyProps['sx'];
  captionClassName?: string;
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
  captionClassName,
  dataTestId
}) => {
  const sizesAttribute = generateSizesAttribute(sizes);
  const locale = useLocale();
  return (
    <Box sx={{ ...styles.container, ...containerSx } as BoxProps['sx']} data-testid={dataTestId}>
      <Box sx={{ ...styles.imageContainer(sizes), ...imageSx } as BoxProps['sx']}>
        {border && <Box sx={styles.border(border)} data-testid="img-border" />}
        <Image
          style={styles.image as React.CSSProperties}
          src={src}
          fill
          alt={typeof alt === 'string' ? alt : alt[locale]}
          sizes={sizesAttribute}
        />
      </Box>
      {caption && (
        <Typography
          className={captionClassName}
          sx={[styles.caption(sizes, align), captionSx].flat() as TypographyProps['sx']}
        >
          {typeof caption === 'string' ? caption : caption[locale]}
        </Typography>
      )}
    </Box>
  );
};

export default ImageWithCaption;

'use client';

import { Box, BoxProps, Breakpoint, Typography, TypographyProps } from '@mui/material';
import { JSONContent } from '@tiptap/react';
import Image from 'next/image';
import { Locale, useLocale } from 'next-intl';
import React, { useMemo } from 'react';

import TipTapContent from '~/components/tip-tap-content/TipTapContent';

import { styles } from './ImageWithCaption.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { ElementSizes } from '~/types/types/common.types';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';
import { extractTextFromTipTap, getPlainString, isTipTapDoc } from '~/lib/utils/tiptapHelpers';

export interface BorderProps {
  sizes: ElementSizes;
  top: Partial<Record<Breakpoint, number>>;
  left: Partial<Record<Breakpoint, number>>;
  color?: string;
}

type LocalizedString = Record<Locale, string>;

interface ImageWithCaptionProps {
  src: string;
  alt: string | LocalizedString | JSONContent;
  caption: string | LocalizedString | JSONContent | null;
  sizes: ElementSizes;
  border?: BorderProps;
  align?: 'left' | 'right';
  containerSx?: BoxProps['sx'];
  imageSx?: BoxProps['sx'];
  captionSx?: TypographyProps['sx'];
  captionClassName?: string;
  dataTestId?: string;
}

interface CaptionConfig {
  sizes: ElementSizes;
  align: 'left' | 'right';
  sx: TypographyProps['sx'];
  className?: string;
}

const createCaptionRenderer = (config: CaptionConfig) => {
  const Caption = (children: React.ReactNode) => (
    <Typography
      className={config.className}
      sx={[styles.caption(config.sizes, config.align), config.sx].flat() as TypographyProps['sx']}
    >
      {children}
    </Typography>
  );
  return Caption;
};

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
  const locale = useLocale() as Locale;

  const paragraphRenderer = useMemo(() => {
    return createCaptionRenderer({
      sizes,
      align,
      sx: captionSx,
      className: captionClassName
    });
  }, [sizes, align, captionSx, captionClassName]);

  const resolvedAltText = isTipTapDoc(alt)
    ? extractTextFromTipTap(alt, locale)
    : getPlainString(alt as string | LocalizedString, locale);

  return (
    <Box sx={{ ...styles.container, ...containerSx } as BoxProps['sx']} data-testid={dataTestId}>
      <Box sx={{ ...styles.imageContainer(sizes), ...imageSx } as BoxProps['sx']}>
        {border && <Box sx={styles.border(border)} data-testid="img-border" />}
        <Image
          style={styles.image as React.CSSProperties}
          src={src}
          fill
          alt={resolvedAltText}
          sizes={sizesAttribute}
        />
      </Box>

      {caption &&
        (isTipTapDoc(caption) ? (
          <TipTapContent
            data={caption}
            nodeRenderers={{
              [TipTapNodeTypes.paragraph]: paragraphRenderer
            }}
          />
        ) : (
          <Typography
            className={captionClassName}
            sx={[styles.caption(sizes, align), captionSx].flat() as TypographyProps['sx']}
          >
            {getPlainString(caption as string | LocalizedString, locale)}
          </Typography>
        ))}
    </Box>
  );
};

export default ImageWithCaption;

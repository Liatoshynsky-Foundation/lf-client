'use client';

import { Box, SxProps, Theme, Typography } from '@mui/material';
import Image from 'next/image';
import { Locale, useLocale } from 'next-intl';
import React from 'react';

import TipTapContent from '../tip-tap-content/TipTapContent';
import { imageSizes, styles } from './SectionTitle.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';
import { sxToArray } from '~/utils/sxToArray';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';
import { getPlainString, isTipTapDoc } from '~/lib/utils/tiptapHelpers';

type LocalizedString = Record<Locale, string>;

interface SectionTitleProps {
  icon?: boolean;
  mb?: number | string;
  gridColumn?: object;
  title: string | LocalizedString | TipTapDoc;
  sx?: SxProps<Theme>;
  dataTestId?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon = true, mb, title, gridColumn, sx, dataTestId }) => {
  const sizesAttribute = generateSizesAttribute(imageSizes);
  const locale = useLocale();

  return (
    <Box sx={[styles.container(mb), ...sxToArray(sx)]} data-testid={dataTestId}>
      {icon && (
        <Box sx={styles.image} {...(dataTestId ? { 'data-testid': `${dataTestId}-icon` } : {})}>
          <Image src="/icons/ellipse.svg" alt="ellipse" fill sizes={sizesAttribute} />
        </Box>
      )}

      {isTipTapDoc(title) ? (
        <TipTapContent
          data={title as unknown as TipTapDoc}
          nodeRenderers={{
            [TipTapNodeTypes.paragraph]: (children) => (
              <Typography
                sx={styles.title(gridColumn)}
                component="h2"
                {...(dataTestId ? { 'data-testid': `${dataTestId}-title` } : {})}
              >
                {children}
              </Typography>
            )
          }}
        />
      ) : (
        <Typography
          sx={styles.title(gridColumn)}
          component="h2"
          {...(dataTestId ? { 'data-testid': `${dataTestId}-title` } : {})}
        >
          {getPlainString(title, locale)}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;

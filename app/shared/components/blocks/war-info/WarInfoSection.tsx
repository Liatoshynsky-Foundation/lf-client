'use client';

import { Box, type BoxProps, Typography } from '@mui/material';
import React from 'react';

import ContentBlock from '~/components/design-system/all-components/content-block/ContentBlock';

import { style } from './WarInfoSection.style';
import { TipTapDoc } from '~/types/types/tiptap.types';
import { sxToArray } from '~/utils/sxToArray';

export type WarInfoSectionProps = BoxProps & {
  data?: {
    title?: string;
    description?: TipTapDoc | string;
  };
};

const WarInfoSection: React.FC<WarInfoSectionProps> = ({ sx, data, ...props }) => {
  if (!data) return null;

  return (
    <Box sx={[style.gridContainer, ...sxToArray(sx)]} {...props}>
      <Box sx={style.titleSection}>
        <Typography variant="h1" sx={style.titleText}>
          {data.title}
        </Typography>
      </Box>
      <ContentBlock description={data.description} textSx={style.contentText} containerSx={style.textBlockContainer} />
    </Box>
  );
};

export default WarInfoSection;

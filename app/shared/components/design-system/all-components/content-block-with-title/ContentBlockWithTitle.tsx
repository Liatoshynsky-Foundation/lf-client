import { Box, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

import { styles } from './ContentBlockWithTitle.styles';
import { TipTapDoc } from '~/types/types/common.types';
import { sxToArray } from '~/utils/sxToArray';

import TipTapContent from '~/shared/components/tip-tap-content/TipTapContent';

interface ContentBlockWithTitleProps {
  title: string;
  content?: TipTapDoc;
  mb?: number | string;
  gridColumn?: object;
  sx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  contentSx: SxProps<Theme>;
}

const ContentBlockWithTitle: React.FC<ContentBlockWithTitleProps> = ({
  title,
  content,
  mb,
  gridColumn,
  sx,
  titleSx,
  contentSx
}) => {
  return (
    <Box sx={[styles.container(mb), ...sxToArray(sx)]}>
      <Typography
        sx={[styles.title(gridColumn), ...(Array.isArray(titleSx) ? titleSx : [titleSx ?? {}])]}
        variant="customUppercase20Bold"
        component="h2"
      >
        {title}
      </Typography>
      {content && (
        <Box sx={[styles.content, ...sxToArray(contentSx)]} data-testid="leading-typography">
          <TipTapContent data={content} />
        </Box>
      )}
    </Box>
  );
};

export default ContentBlockWithTitle;

'use client';

import { Box, SxProps } from '@mui/material';
import React from 'react';

import { IconButton } from '~/ds-components/icon-button/IconButton';

import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import Delete from '~/public/icons/trash-2.svg';

interface FilterPanelProps {
  children?: React.ReactNode;
  isAnyFilterActive?: boolean;
  onClearAllFilters?: () => void;
  sx?: SxProps;
}

export function FilterPanel({
  children,
  isAnyFilterActive = false,
  onClearAllFilters,
  sx
}: Readonly<FilterPanelProps>) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        ...((sx as any) || {})
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>{children}</Box>

      {isAnyFilterActive && onClearAllFilters && (
        <IconButton
          type={IconButtonVariant.outlined}
          variant={IconButtonColorVariant.Secondary}
          size="medium"
          onClick={onClearAllFilters}
        >
          <Delete />
        </IconButton>
      )}
    </Box>
  );
}

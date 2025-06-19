'use client';

import type { TypographyProps } from '@mui/material';
import { Box, SxProps, TableCell, Theme, Typography } from '@mui/material';

import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import Button from '~/shared/components/design-system/all-components/button/Button';
import { IconButton } from '~/shared/components/design-system/all-components/icon-button/IconButton';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export function TypographyCell({
  value,
  variant = 'customMedium16',
  color,
  sx
}: {
  value?: string;
  variant?: TypographyProps['variant'];
  color?: string;
  sx?: SxProps<Theme>;
}) {
  return (
    <Typography variant={variant} color={color} sx={sx}>
      {value}
    </Typography>
  );
}

export function TableCellWithTypography({ value, colSpan }: { value?: string; colSpan?: number }) {
  return (
    <TableCell colSpan={colSpan} sx={{ px: 0, py: 0, borderBottom: 'none' }}>
      <Typography variant="customBold16" fontWeight={600}>
        {value}
      </Typography>
    </TableCell>
  );
}

export function HoverPlayIcon() {
  return (
    <Box
      sx={{
        visibility: 'hidden',
        opacity: 0,
        transition: 'opacity 0.2s ease',
        '.MuiTableRow-root:hover &': {
          visibility: 'visible',
          opacity: 1
        }
      }}
    >
      <IconButton size="small" type={IconButtonVariant.icon}>
        <SvgImage src="/icons/play.svg" alt="play" width={24} height={24} />
      </IconButton>
    </Box>
  );
}

export function ActionsButtons() {
  return (
    <Box display="flex" justifyContent="flex-end" gap={2} pr={5}>
      <Button variant="outlined">Переглянути ноти</Button>
      <IconButton size="small" variant={IconButtonColorVariant.Secondary}>
        <SvgImage src="/icons/ellipsis-vertical.svg" alt="menu" width={24} height={24} />
      </IconButton>
    </Box>
  );
}

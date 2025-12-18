'use client';

import { Box, MenuItem, type SxProps, Theme, Typography } from '@mui/material';

import { overflowMenuItemSx } from './OverflowMenu.styles';
import type { IconPosition, OverflowMenuItemConfig } from '~/types/types/menu.types';

import { sxToArray } from '~/lib/utils/sxToArray';

type OverflowMenuItemProps = Omit<OverflowMenuItemConfig, 'id' | 'hidden'> & {
  iconPosition?: IconPosition;
  containerSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
};

export function OverflowMenuItem({
  label,
  icon,
  iconPosition = 'left',
  containerSx,
  labelSx,
  disabled,
  onClick
}: Readonly<OverflowMenuItemProps>) {
  return (
    <MenuItem disabled={disabled} onClick={disabled ? undefined : onClick}>
      <Box sx={[overflowMenuItemSx.menuItemContainerSx, ...sxToArray(containerSx)]}>
        {icon && iconPosition === 'left' ? icon : null}

        {typeof label === 'string' ? (
          <Typography component="span" sx={labelSx}>
            {label}
          </Typography>
        ) : (
          <Box sx={[overflowMenuItemSx.menuLabelItemSx, ...sxToArray(labelSx)]}>{label}</Box>
        )}

        {icon && iconPosition === 'right' ? icon : null}
      </Box>
    </MenuItem>
  );
}

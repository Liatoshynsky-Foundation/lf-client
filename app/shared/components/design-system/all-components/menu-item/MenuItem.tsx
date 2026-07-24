import { MenuItem, MenuItemProps } from '@mui/material';
import { ElementType } from 'react';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export type CustomMenuItemProps<C extends ElementType = 'li'> = MenuItemProps<C, { component?: C }> & {
  children: React.ReactNode;
  selected?: boolean;
};

export default function CustomMenuItem<C extends ElementType = 'li'>({
  children,
  selected = false,
  disabled,
  onClick,
  ...props
}: CustomMenuItemProps<C>) {
  return (
    <MenuItem selected={selected} disabled={disabled} onClick={onClick} {...props}>
      {children}
      {selected && <SvgImage src="/icons/check-icon.svg" alt="Item selected" width={20} height={20} />}
    </MenuItem>
  );
}

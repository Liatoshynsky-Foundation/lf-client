import { MenuItem, MenuItemProps } from '@mui/material';
import type { ElementType } from 'react';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

interface CustomMenuItemProps extends MenuItemProps {
  children: React.ReactNode;
  selected?: boolean;
  component?: ElementType;
  href?: string;
}

type ReadonlyCustomMenuItemProps = Readonly<CustomMenuItemProps>;

export default function CustomMenuItem({
  children,
  selected = false,
  disabled,
  onClick,
  ...props
}: ReadonlyCustomMenuItemProps) {
  return (
    <MenuItem selected={selected} disabled={disabled} onClick={onClick} {...props}>
      {children}
      {selected && <SvgImage src="/icons/check-icon.svg" alt="Item selected" width={20} height={20} />}
    </MenuItem>
  );
}
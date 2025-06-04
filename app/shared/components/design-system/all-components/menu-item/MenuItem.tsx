import { MenuItem, MenuItemProps } from '@mui/material';
import { menuItemStyles } from './MenuItem.styles';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

interface CustomMenuItemProps extends MenuItemProps {
  children: React.ReactNode;
  selected?: boolean;
}

export default function CustomMenuItem({
  children,
  selected = false,
  disabled,
  onClick,
  ...props
}: CustomMenuItemProps) {
  return (
    <MenuItem sx={menuItemStyles} selected={selected} disabled={disabled} onClick={onClick} {...props}>
      {children}
      {selected && <SvgImage src="/icons/check-icon.svg" alt="Item selected" width={20} height={20} />}
    </MenuItem>
  );
}

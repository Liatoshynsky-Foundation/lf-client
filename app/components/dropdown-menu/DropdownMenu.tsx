'use client';
import Menu, { type MenuProps } from '@mui/material/Menu';
import { styles } from './DropdownMenu.style';
import { ReactNode } from 'react';

interface DropdownMenuProps extends MenuProps {
  maxHeight?: number;
  menuList: ReactNode
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  maxHeight,
  menuList,
  sx,
  ...props
}) => {
  return (
    <Menu
      PaperProps={{
        style: {
          maxHeight,
        },
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{ ...styles.menu, ...sx }}
      {...props}
    >
      {menuList}
    </Menu>
  );
};

export default DropdownMenu;

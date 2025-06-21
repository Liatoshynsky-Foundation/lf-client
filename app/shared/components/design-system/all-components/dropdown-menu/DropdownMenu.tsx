'use client';
import Menu, { type MenuProps } from '@mui/material/Menu';
import { ReactNode } from 'react';

import { PositionEnum } from '~/types/enums/common.enums';

interface DropdownMenuProps extends MenuProps {
  maxHeight?: number;
  menuList: ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  maxHeight,
  menuList,
  sx,
  anchorOrigin = {
    vertical: PositionEnum.Bottom,
    horizontal: PositionEnum.Center
  },
  transformOrigin = {
    vertical: PositionEnum.Top,
    horizontal: PositionEnum.Center
  },
  ...props
}) => {
  return (
    <Menu
      PaperProps={{
        style: {
          maxHeight
        }
      }}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      sx={{ ...sx }}
      {...props}
    >
      {menuList}
    </Menu>
  );
};

export default DropdownMenu;

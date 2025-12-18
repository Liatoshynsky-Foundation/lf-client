'use client';

import { Menu, type SxProps, Theme } from '@mui/material';
import React, { useId, useMemo, useState } from 'react';

import { overflowMenuSx } from './OverflowMenu.styles';
import { OverflowMenuItem } from './OverflowMenuItem';
import type { OverflowMenuItemConfig, TriggerProps } from '~/types/types/menu.types';

import { sxToArray } from '~/lib/utils/sxToArray';

interface OverflowMenuProps {
  items: OverflowMenuItemConfig[];
  trigger: React.ReactElement<TriggerProps>;
  menuContainerSx?: SxProps<Theme>;
  menuListSx?: SxProps<Theme>;
  dataTestId?: string;
}

export default function OverflowMenu({
  items,
  trigger,
  menuContainerSx,
  menuListSx,
  dataTestId
}: Readonly<OverflowMenuProps>) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(menuAnchor);
  const menuId = useId();

  const visibleItems = useMemo(() => items.filter((item) => !item.hidden), [items]);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget);
  const handleClose = () => setMenuAnchor(null);

  const triggerEl = React.cloneElement(trigger, {
    ...trigger.props,
    'aria-haspopup': 'menu',
    'aria-controls': open ? menuId : undefined,
    'aria-expanded': open ? 'true' : undefined,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      trigger.props.onClick?.(e);
      handleOpen(e);
    }
  });

  return (
    <React.Fragment>
      {triggerEl}

      <Menu
        id={menuId}
        anchorEl={menuAnchor}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: menuContainerSx,
          'data-testid': dataTestId
        }}
        MenuListProps={{
          sx: [overflowMenuSx.menuListSx, ...sxToArray(menuListSx)]
        }}
      >
        {visibleItems.map((item) => (
          <OverflowMenuItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            iconPosition={item.iconPosition}
            containerSx={item.containerSx}
            labelSx={item.labelSx}
            disabled={item.disabled}
            onClick={() => {
              handleClose();
              item.onClick();
            }}
          />
        ))}
      </Menu>
    </React.Fragment>
  );
}

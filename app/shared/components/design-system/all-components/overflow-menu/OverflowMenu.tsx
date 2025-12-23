'use client';

import { Menu, type SxProps, Theme } from '@mui/material';
import type { MouseEvent, ReactElement } from 'react';
import { cloneElement, Fragment, useId, useMemo, useState } from 'react';

import { overflowMenuSx } from './OverflowMenu.styles';
import { OverflowMenuItem } from './OverflowMenuItem';
import type { OverflowMenuItemConfig, TriggerProps } from '~/types/types/menu.types';

import { sxToArray } from '~/lib/utils/sxToArray';

interface OverflowMenuProps {
  items: OverflowMenuItemConfig[];
  trigger: ReactElement<TriggerProps>;
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

  const handleOpen = (e: MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget);
  const handleClose = () => setMenuAnchor(null);

  const triggerEl = cloneElement(trigger, {
    ...trigger.props,
    'aria-haspopup': 'menu',
    'aria-controls': open ? menuId : undefined,
    'aria-expanded': open ? 'true' : undefined,
    onClick: (e: MouseEvent<HTMLElement>) => {
      trigger.props.onClick?.(e);
      handleOpen(e);
    }
  });

  return (
    <Fragment>
      {triggerEl}

      <Menu
        id={menuId}
        anchorEl={menuAnchor}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: [overflowMenuSx.menuContainerSx, ...sxToArray(menuContainerSx)],
          'data-testid': dataTestId
        }}
        MenuListProps={{
          sx: menuListSx
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
    </Fragment>
  );
}

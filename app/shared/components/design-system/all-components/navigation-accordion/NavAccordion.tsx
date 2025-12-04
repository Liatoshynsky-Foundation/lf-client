'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

import { styles } from './NavAccordion.styles';
import { AccordionItem } from './NavAccordionItem';

import { normalizePath } from '~/lib/utils/navPath';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface NavDropdownItem {
  label: string;
  dropdown: NavLinkItem[];
}

export type NavItem = NavLinkItem | NavDropdownItem;

interface NavAccordionProps {
  items: NavItem[];
  sx?: object;
}

export function NavAccordion({ items, sx }: Readonly<NavAccordionProps>) {
  const pathname = normalizePath(usePathname());
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = useCallback((label: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  }, []);

  return (
    <Box data-testid="NavAccordion" sx={{ ...styles.container, ...sx }}>
      {items.map((item) => (
        <AccordionItem
          key={item.label}
          item={item}
          pathname={pathname}
          isOpen={!!openItems[item.label]}
          onToggle={() => toggle(item.label)}
        />
      ))}
    </Box>
  );
}

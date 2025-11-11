'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { mainHexPallete } from '../theme/colors';
import { styles } from './NavAccordion.styles';

import MinusIconSvg from '~/public/icons/minus.svg';
import PlusIconSvg from '~/public/icons/plus.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';

interface NavItem {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
}

export function NavAccordion({ items, sx }: { items: NavItem[]; sx?: object }) {
  const pathname = usePathname().replace(/^\/[a-z]{2}(?=\/)/, '');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (label: string) => setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <Box data-testid="NavAccordion" sx={{ ...styles.container, ...sx }}>
      {items.map((item) => (
        <AccordionItem
          key={item.label}
          item={item}
          pathname={pathname}
          isOpen={openItems[item.label]}
          onToggle={() => toggle(item.label)}
        />
      ))}
    </Box>
  );
}

function AccordionItem({
  item,
  pathname,
  isOpen,
  onToggle
}: {
  item: NavItem;
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const isActive =
    (item.href && pathname.startsWith(item.href)) || item.dropdown?.some((child) => pathname.startsWith(child.href));

  const iconColor = isActive ? mainHexPallete.burgundy[700] : mainHexPallete.brown[900];
  const hasDropdown = item.dropdown && item.dropdown.length > 1;

  const baseTestId = `NavAccordion-item-${item.label.replace(/\s+/g, '')}`;

  if (!hasDropdown) {
    return (
      <Link href={item.href!} style={{ textDecoration: 'none' }}>
        <Box data-testid={`${baseTestId}`} sx={styles.itemWrapper}>
          <Typography
            data-testid={`${baseTestId}--title${isActive ? '--active' : ''}`}
            sx={{ ...styles.title, ...(isActive && styles.activeTitle) }}
          >
            {item.label}
          </Typography>
        </Box>
      </Link>
    );
  }

  return (
    <Box data-testid={baseTestId} sx={styles.itemWrapper}>
      <Box
        data-testid={`${baseTestId}-toggle${isOpen ? '--open' : ''}`}
        sx={styles.titleButton}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <Typography
          data-testid={`${baseTestId}--title${isActive ? '--active' : ''}`}
          sx={{ ...styles.title, ...(isActive && styles.activeTitle) }}
        >
          {item.label}
        </Typography>

        <Svg
          Component={isOpen ? MinusIconSvg : PlusIconSvg}
          stroke={iconColor}
          alt={isOpen ? 'Open list' : 'Close list'}
          height={{ xs: '24px', md: '32px' }}
          width={{ xs: '24px', md: '32px' }}
        />
      </Box>

      <Box data-testid={`${baseTestId}-submenu${isOpen ? '--open' : ''}`} sx={styles.dropdownBox(isOpen)}>
        {item.dropdown!.map((child) => (
          <Link key={child.label} href={child.href} style={{ textDecoration: 'none' }}>
            <Typography data-testid={`${baseTestId}-submenuItem`} sx={styles.submenuItem}>
              {child.label}
            </Typography>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

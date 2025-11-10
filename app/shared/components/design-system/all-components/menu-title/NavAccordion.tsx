'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { /* useEffect,*/ useMemo, useRef, useState } from 'react';

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
    <Box sx={{ ...styles.container, ...sx }}>
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
  // const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (contentRef.current) {
  //     setContentHeight(contentRef.current.scrollHeight);
  //   }
  // }, [item.dropdown]);

  const isActive = useMemo(() => {
    if (item.href && pathname.startsWith(item.href)) return true;
    return item.dropdown?.some((child) => pathname.startsWith(child.href)) ?? false;
  }, [pathname, item]);

  const iconColor = isActive ? mainHexPallete.burgundy[700] : mainHexPallete.brown[900];
  const hasDropdown = item.dropdown && item.dropdown.length > 1;

  if (!hasDropdown) {
    return (
      <Link href={item.href!} style={{ textDecoration: 'none' }}>
        <Box sx={styles.itemWrapper}>
          <Typography sx={{ ...styles.title, ...(isActive && styles.activeTitle) }}>{item.label}</Typography>
        </Box>
      </Link>
    );
  }

  return (
    <Box sx={styles.itemWrapper}>
      <Box sx={styles.titleButton} onClick={onToggle} aria-expanded={isOpen}>
        <Typography sx={{ ...styles.title, ...(isActive && styles.activeTitle) }}>{item.label}</Typography>
        <Svg
          Component={isOpen ? MinusIconSvg : PlusIconSvg}
          stroke={iconColor}
          sx={styles.icon}
          alt={isOpen ? 'Open list' : 'Close list'}
        />
      </Box>

      <Box
        ref={contentRef}
        sx={{
          overflow: 'hidden',
          maxHeight: isOpen ? '160px' : 0,

          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',

          transition: isOpen
            ? `
        max-height 700ms cubic-bezier(0.215, 0.610, 0.355, 1.000),
        opacity 500ms ease-out,
        transform 700ms cubic-bezier(0.215, 0.610, 0.355, 1.000),
        padding 500ms ease-out
      `
            : `
        max-height 500ms cubic-bezier(0.445, 0.050, 0.550, 0.950),
        opacity 400ms ease-in,
        transform 500ms cubic-bezier(0.445, 0.050, 0.550, 0.950),
        padding 400ms ease-in
      `,

          py: isOpen ? '12px' : 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {item.dropdown!.map((child) => (
          <Link key={child.label} href={child.href} style={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                ...styles.submenuItem
              }}
            >
              {child.label}
            </Typography>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

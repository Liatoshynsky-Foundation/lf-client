'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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

interface NavAccordionProps {
  navLabels: NavItem[];
  sx?: object;
}

export function NavAccordion({ navLabels, sx }: NavAccordionProps) {
  const pathnameRaw = usePathname();

  const pathname = pathnameRaw.replace(/^\/[a-z]{2}(?=\/)/, '');

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newOpenItems: Record<string, boolean> = {};
    navLabels.forEach((item) => {
      if (item.dropdown?.some((child) => pathname.startsWith(child.href))) {
        newOpenItems[item.label] = true;
      }
    });
    setOpenItems(newOpenItems);
  }, [pathname, navLabels]);

  const toggleDropdown = (label: string) => {
    setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Box sx={{ ...styles.container, ...sx }}>
      {navLabels.map((item) => {
        const hasDropdown = item.dropdown && item.dropdown.length > 1;
        const isSingleLink = !hasDropdown && item.href;

        const isActive =
          (item.href && pathname.startsWith(item.href)) ||
          item.dropdown?.some((child) => pathname.startsWith(child.href));

        const isOpen = openItems[item.label] === true;
        const iconColor = isActive ? mainHexPallete.burgundy[700] : mainHexPallete.brown[900];

        return (
          <Box key={item.label} sx={{ ...styles.itemWrapper, ...(isActive && styles.activeTitle) }}>
            {!hasDropdown && isSingleLink && (
              <Link href={item.href!} style={{ textDecoration: 'none' }}>
                <Box sx={styles.titleButton}>
                  <Typography
                    sx={{
                      ...styles.title,
                      ...(isActive && styles.activeTitle)
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              </Link>
            )}

            {hasDropdown && (
              <>
                <Box sx={styles.titleButton} onClick={() => toggleDropdown(item.label)} aria-expanded={isOpen}>
                  <Typography
                    sx={{
                      ...styles.title,
                      ...(isActive && styles.activeTitle)
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Svg
                    Component={isOpen ? MinusIconSvg : PlusIconSvg}
                    alt="toggle"
                    stroke={iconColor}
                    sx={styles.icon}
                  />
                </Box>

                <Box sx={styles.submenuWrapper(isOpen)}>
                  {item.dropdown!.map((child) => {
                    return (
                      <Link key={child.label} href={child.href} style={{ textDecoration: 'none' }}>
                        <Typography
                          sx={{
                            ...styles.submenuItem
                          }}
                        >
                          {child.label}
                        </Typography>
                      </Link>
                    );
                  })}
                </Box>
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

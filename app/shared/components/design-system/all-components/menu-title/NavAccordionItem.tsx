import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import { mainHexPallete } from '../theme/colors';
import { NavDropdownItem, NavItem, NavLinkItem } from './NavAccordion';
import { styles } from './NavAccordion.styles';

import MinusIconSvg from '~/public/icons/minus.svg';
import PlusIconSvg from '~/public/icons/plus.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';

interface AccordionItemProps {
  item: NavItem;
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
}

function isDropdownItem(item: NavItem): item is NavDropdownItem {
  return 'dropdown' in item;
}

function isLinkItem(item: NavItem): item is NavLinkItem {
  return 'href' in item && !('dropdown' in item);
}

function normalizePath(path: string) {
  return path.replace(/\/+$/, '');
}

export function AccordionItem({ item, pathname, isOpen, onToggle }: Readonly<AccordionItemProps>) {
  const normalizedPath = normalizePath(pathname);

  const isLinkActive = isLinkItem(item) && normalizePath(item.href) === normalizedPath;
  const isDropdownActive =
    isDropdownItem(item) && item.dropdown.some((child) => normalizePath(child.href) === normalizedPath);

  const isActive = isLinkActive || isDropdownActive;
  const iconColor = isActive ? mainHexPallete.burgundy[700] : mainHexPallete.brown[900];

  const hasDropdown = isDropdownItem(item);
  const baseTestId = `NavAccordion-item-${item.label.replaceAll(' ', '')}`;

  if (!hasDropdown && isLinkItem(item)) {
    return (
      <Link href={item.href} style={{ textDecoration: 'none' }}>
        <Box data-testid={baseTestId} sx={styles.titleButton}>
          <Typography data-testid={`${baseTestId}--title${isActive ? '--active' : ''}`} sx={styles.title(isActive)}>
            {item.label}
          </Typography>
        </Box>
      </Link>
    );
  }

  if (!hasDropdown) {
    return null;
  }

  return (
    <Box data-testid={baseTestId} sx={styles.itemWrapper}>
      <Box
        data-testid={`${baseTestId}-toggle${isOpen ? '--open' : ''}`}
        sx={styles.titleButton}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <Typography data-testid={`${baseTestId}--title${isActive ? '--active' : ''}`} sx={styles.title(isActive)}>
          {item.label}
        </Typography>

        <Svg
          Component={isOpen ? MinusIconSvg : PlusIconSvg}
          stroke={iconColor}
          alt={isOpen ? 'Collapse list' : 'Expand list'}
          height={{ xs: '24px', md: '32px' }}
          width={{ xs: '24px', md: '32px' }}
        />
      </Box>

      <Box data-testid={`${baseTestId}-submenu${isOpen ? '--open' : ''}`} sx={styles.dropdownBox(isOpen)}>
        {item.dropdown.map((child) => (
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

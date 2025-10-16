import { Box } from '@mui/material';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import Button from '~/ds-components/button/Button';
import ButtonGroup from '~/ds-components/button-group/ButtonGroup';
import DropdownMenu from '~/ds-components/dropdown-menu/DropdownMenu';
import { IconButton } from '~/ds-components/icon-button/IconButton';
import CustomMenuItem from '~/ds-components/menu-item/MenuItem';
import { mainHexPallete } from '~/ds-components/theme/colors';

import { styles } from './DesktopNav.styles';

import { NavigationDTO } from '~/domain/dto/navigation.dto';
import { usePathname } from '~/i18n/navigation';
import ChevronDown from '~/public/icons/chevron-down.svg';
import ChevronUp from '~/public/icons/chevron-up.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';

export interface DropdownItem {
  label: string;
  href: string;
}

const DesktopNav = ({ navLabels }: { navLabels: NavigationDTO[] }) => {
  const specialNavItem = navLabels.find((group) => ['Війна в Україні', 'War in Ukraine'].includes(group.title));

  navLabels = navLabels.filter((group) => !['Війна в Україні', 'War in Ukraine'].includes(group.title));

  const NAV_ITEMS = useMemo(() => {
    return navLabels.map((group) => {
      const dropdown = group.links.map((link) => ({
        label: link.label,
        href: link.href
      }));

      return {
        label: group.title,
        dropdown: dropdown.length > 1 ? dropdown : undefined,
        href: dropdown.length === 1 ? dropdown[0].href : undefined
      };
    });
  }, [navLabels]);

  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [temporaryActiveIndex, setTemporaryActiveIndex] = useState<number | null>(null);
  const [openDropdownState, setOpenDropdownState] = useState<{ label: string; items: DropdownItem[] } | null>(null);
  const [activeButton, setActiveButton] = useState<number | undefined>();

  useEffect(() => {
    setTemporaryActiveIndex(null);
  }, [pathname]);

  useEffect(() => {
    const index = NAV_ITEMS.findIndex(
      (item) => item.href === pathname || item.dropdown?.some((dropdownItem) => dropdownItem.href === pathname)
    );

    if (index !== -1) {
      setActiveButton(index);
    } else if (pathname === '/') {
      setActiveButton(1);
    } else {
      setActiveButton(undefined);
    }
  }, [pathname, navLabels]);

  const effectiveActiveIndex = temporaryActiveIndex ?? activeButton;

  const handleDropdownOpen = (
    event: React.MouseEvent<HTMLElement>,
    label: string,
    items: DropdownItem[],
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenDropdownState({ label, items });
    setTemporaryActiveIndex(index);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
    setOpenDropdownState(null);
  };

  const renderedNavButtons = NAV_ITEMS.map((item, index) => {
    const isOpen = openDropdownState?.label === item.label && Boolean(anchorEl);
    const isActive = index === effectiveActiveIndex;

    const ChevronIcon = isOpen ? ChevronUp : ChevronDown;
    const iconColor = isActive ? mainHexPallete.white : mainHexPallete.black;

    if (item.dropdown) {
      const dropdownItems = item.dropdown;

      return (
        <IconButton
          disableRipple
          key={`${item.label}-${index}`}
          onClick={(e) => handleDropdownOpen(e, item.label, dropdownItems, index)}
          sx={styles.iconButtonSx}
          style={styles.iconButtonInline}
        >
          {item.label}
          <Svg
            Component={ChevronIcon}
            alt="chevron"
            stroke={iconColor}
            width="20px"
            height="22px"
            sx={{ display: 'flex' }}
          />
        </IconButton>
      );
    }

    if (item.href) {
      return (
        <Button disableRipple key={`${item.href}-${index}`} link={item.href} sx={styles.iconButtonSx}>
          {item.label}
        </Button>
      );
    }

    return null;
  });

  const renderedDropdownItems = openDropdownState?.items.map((item, index) => (
    <Link href={item.href} key={`${item.href}-${index}`} passHref>
      <CustomMenuItem sx={styles.menuItem} onClick={handleDropdownClose}>
        {item.label}
      </CustomMenuItem>
    </Link>
  ));

  return (
    <>
      <Box sx={styles.buttonGroupBackground}>
        <ButtonGroup
          sx={styles.buttonGroup}
          activeButton={effectiveActiveIndex}
          buttons={renderedNavButtons}
          size="big"
        />
        {specialNavItem && specialNavItem.links.length > 0 && specialNavItem.links[0].visibility && (
          <Button label={specialNavItem.title} link={specialNavItem.links[0].href} sx={styles.warInUkraineButton} />
        )}
      </Box>

      {openDropdownState && (
        <DropdownMenu
          disableScrollLock
          style={styles.dropdownMenu}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleDropdownClose}
          menuList={renderedDropdownItems}
        />
      )}
    </>
  );
};

export default DesktopNav;

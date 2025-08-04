import { Box } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Button from '~/ds-components/button/Button';
import ButtonGroup from '~/ds-components/button-group/ButtonGroup';
import DropdownMenu from '~/ds-components/dropdown-menu/DropdownMenu';
import { IconButton } from '~/ds-components/icon-button/IconButton';
import CustomMenuItem from '~/ds-components/menu-item/MenuItem';
import { mainHexPallete } from '~/ds-components/theme/colors';

import { styles } from './DesktopNav.styles';
import { PageRoutes } from '~/constants/routes/page-routes';
import { NavLabels } from '~/types/types/navLabels';

import { usePathname } from '~/i18n/navigation';
import ChevronDown from '~/public/icons/chevron-down.svg';
import ChevronUp from '~/public/icons/chevron-up.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';

export interface DropdownItem {
  label: string;
  href: string;
}

const DesktopNav = ({ navLabels }: { navLabels: NavLabels }) => {
  const NAV_ITEMS = [
    {
      label: navLabels.liatoshynsky,
      dropdown: [
        { label: navLabels.biography, href: PageRoutes.BIOGRAPHY },
        { label: navLabels.artistry, href: PageRoutes.ARTISTRY },
        { label: navLabels.research, href: PageRoutes.RESEARCH }
      ]
    },
    {
      label: navLabels.foundation,
      dropdown: [
        { label: navLabels.about, href: PageRoutes.FOUNDATION_HOME },
        { label: navLabels.news, href: PageRoutes.NEWS },
        { label: navLabels.media, href: PageRoutes.MEDIA_ABOUT_US }
      ]
    },
    { label: navLabels.archive, href: PageRoutes.ARCHIVE },
    { label: navLabels.collaboration, href: PageRoutes.COLLABORATION }
  ];

  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [temporaryActiveIndex, setTemporaryActiveIndex] = useState<number | null>(null);
  const [openDropdownState, setOpenDropdownState] = useState<{ label: string; items: DropdownItem[] } | null>(null);

  useEffect(() => {
    setTemporaryActiveIndex(null);
  }, [pathname]);

  const getActiveIndex = () =>
    NAV_ITEMS.findIndex((item) => {
      if (item.href) {
        return item.href === pathname;
      }

      if (item.dropdown) {
        return item.dropdown.some((dropdownItem) => dropdownItem.href === pathname);
      }
      return false;
    });

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

  const staticActiveIndex = getActiveIndex();
  const activeButton = staticActiveIndex !== -1 ? staticActiveIndex : undefined;
  const effectiveActiveIndex = temporaryActiveIndex ?? activeButton;

  const renderedNavButtons = NAV_ITEMS.map((item, index) => {
    const isOpen = openDropdownState?.label === item.label && Boolean(anchorEl);
    const isActive = index === effectiveActiveIndex;

    const ChevronIcon = isOpen ? ChevronUp : ChevronDown;
    const iconColor = isActive ? mainHexPallete.white : mainHexPallete.black;

    return item.dropdown ? (
      <IconButton
        disableRipple
        key={`${item.label}-${index}`}
        onClick={(e) => handleDropdownOpen(e, item.label, item.dropdown, index)}
        sx={styles.iconButtonSx}
        style={styles.iconButtonInline}
      >
        {item.label}

        <Svg
          Component={ChevronIcon}
          alt="chevron"
          color={iconColor}
          width="20px"
          height="22px"
          sx={{ display: 'flex' }}
        />
      </IconButton>
    ) : (
      <Button disableRipple key={`${item.href}-${index}`} sx={styles.iconButtonSx}>
        <Link href={item.href}>{item.label}</Link>
      </Button>
    );
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
          defaultActiveButton={activeButton}
          buttons={renderedNavButtons}
          size="big"
        />
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

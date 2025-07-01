import Link from 'next/link';
import { useEffect, useState } from 'react';

import Button from '~/ds-components/button/Button';
import ButtonGroup from '~/ds-components/button-group/ButtonGroup';
import DropdownMenu from '~/ds-components/dropdown-menu/DropdownMenu';
import CustomMenuItem from '~/ds-components/menu-item/MenuItem';

import { IconButton } from '../../icon-button/IconButton';
import { styles } from './DesktopNav.styles';
import { ROUTES } from '~/constants/routes';

import { usePathname } from '~/i18n/navigation';
import ChevronDown from '~/public/icons/chevron-down.svg';
import ChevronUp from '~/public/icons/chevron-up.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';

export interface DropdownItem {
  label: string;
  href: string;
}

const NAV_ITEMS = [
  {
    label: 'Борис Лятошинський',
    dropdown: [
      { label: 'Життєпис', href: ROUTES.BIOGRAPHY },
      { label: 'Творчість', href: ROUTES.ARTISTRY },
      { label: 'Дослідження та наукові роботи', href: ROUTES.RESEARCH }
    ]
  },
  {
    label: 'Фундація',
    dropdown: [
      { label: 'Про фундацію', href: ROUTES.FOUNDATION_HOME },
      { label: 'Новини', href: ROUTES.NEWS },
      { label: 'ЗМІ про нас', href: ROUTES.MEDIA_ABOUT_US }
    ]
  },
  { label: 'Кабінет-Архів', href: ROUTES.ARCHIVE },
  { label: 'Співпраця', href: ROUTES.COLLABORATION }
];

const DesktopNav = () => {
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
    const iconColor = isActive ? '#fff' : '#000';

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
      <ButtonGroup sx={styles.buttonGroup} defaultActiveButton={activeButton} buttons={renderedNavButtons} size="big" />

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

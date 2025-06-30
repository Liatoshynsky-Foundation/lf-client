import Link from 'next/link';
import { useState } from 'react';

import Button from '~/ds-components/button/Button';
import ButtonGroup from '~/ds-components/button-group/ButtonGroup';
import DropdownMenu from '~/ds-components/dropdown-menu/DropdownMenu';
import CustomMenuItem from '~/ds-components/menu-item/MenuItem';

import { IconButton } from '../../icon-button/IconButton';
import { styles } from './DesktopNav.styles';
import { ROUTES } from '~/constants/routes';

import { usePathname } from '~/i18n/navigation';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export interface DropdownItem {
  label: string;
  href: string;
}

const navItems = [
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
  { label: 'Кабінет-Архів', href: ROUTES.RESEARCH },
  { label: 'Співпраця', href: ROUTES.COLLABORATION }
];

const DesktopNav = () => {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentDropdown, setCurrentDropdown] = useState<{ label: string; items: DropdownItem[] } | null>(null);

  const activeIndex = navItems.findIndex((item) => {
    if (item.href) {
      return item.href === pathname;
    }

    if (item.dropdown) {
      return item.dropdown.some((dropdownItem) => dropdownItem.href === pathname);
    }
    return false;
  });

  const openDropdown = (event: React.MouseEvent<HTMLElement>, label: string, items: DropdownItem[]) => {
    setAnchorEl(event.currentTarget);
    setCurrentDropdown({ label, items });
  };

  const closeDropdown = () => {
    setAnchorEl(null);
    setCurrentDropdown(null);
  };

  const navButtons = navItems.map((item, index) =>
    item.dropdown ? (
      <IconButton
        key={`${index}-${item.label}`}
        onClick={(e) => openDropdown(e, item.label, item.dropdown)}
        sx={styles.iconButtonSx}
        style={styles.iconButtonInline}
      >
        {item.label}
        <SvgImage
          src={currentDropdown?.label === item.label ? '/icons/chevron-up-white.svg' : '/icons/chevron-down-white.svg'}
          alt="Chevron"
          width={20}
          height={22}
        />
      </IconButton>
    ) : (
      <Button key={`${index}-${item.href}`} sx={styles.iconButtonSx}>
        <Link href={item.href}>{item.label}</Link>
      </Button>
    )
  );

  const activeButton = activeIndex !== -1 ? activeIndex : undefined;

  const menuItems = currentDropdown?.items.map((item, index) => (
    <Link href={item.href} key={`${index}-${item.href}`} passHref>
      <CustomMenuItem sx={styles.menuItem} onClick={closeDropdown}>
        {item.label}
      </CustomMenuItem>
    </Link>
  ));

  return (
    <>
      <ButtonGroup defaultActiveButton={activeButton} buttons={navButtons} size="big" />

      {currentDropdown && (
        <DropdownMenu
          style={styles.dropdownMenu}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeDropdown}
          menuList={menuItems}
        />
      )}
    </>
  );
};

export default DesktopNav;

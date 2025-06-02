'use client';

import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import { IconButton } from '../icon-button/IconButton';
import Button from '../button/Button';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../../../../../../i18n/navigation';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import { styles } from './LanguageSwitcher.styles';
import { IconButtonColorVariant, IconButtonVariant, PositionEnum } from '~/types/enums/common.enums';

const locales = ['uk', 'en'] as const;
type Locale = (typeof locales)[number];

export interface LanguageSwitcherProps {
  variant: 'icon' | 'toggle';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLanguageChange = (newLocale: Locale) => {
    router.push(pathname, { locale: newLocale });
    handleClose();
  };

  const toggleLocale = () => {
    const newLocale = currentLocale === 'uk' ? 'en' : 'uk';
    router.push(pathname, { locale: newLocale });
  };

  const menuItems = locales.map((locale) => (
    <MenuItem
      key={locale}
      selected={locale === currentLocale}
      onClick={() => handleLanguageChange(locale)}
      sx={styles.menuItem}
    >
      {locale === 'en' ? 'English' : 'Українська'}
      {locale === currentLocale && <SvgImage src="/icons/check.svg" alt="selected locale" width={20} height={20} />}
    </MenuItem>
  ));

  if (variant === 'toggle') {
    return (
      <Button
        onClick={toggleLocale}
        size="medium"
        variant="outlined"
        color="primary"
        startIcon={<SvgImage src="/icons/planet.svg" alt="switch language" width={20} height={20} />}
      >
        {currentLocale === 'uk' ? 'In English' : 'Українською'}
      </Button>
    );
  }

  return (
    <>
      <IconButton
        variant={IconButtonColorVariant.Primary}
        type={IconButtonVariant.icon}
        size="medium"
        onClick={handleClick}
      >
        <SvgImage src="/icons/planet.svg" alt="select language" width={40} height={40} />
      </IconButton>

      <DropdownMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        menuList={menuItems}
        anchorOrigin={{ vertical: PositionEnum.Bottom, horizontal: PositionEnum.Left }}
        transformOrigin={{ vertical: PositionEnum.Top, horizontal: PositionEnum.Left }}
        sx={styles.dropdownMenu}
      />
    </>
  );
};

export default LanguageSwitcher;

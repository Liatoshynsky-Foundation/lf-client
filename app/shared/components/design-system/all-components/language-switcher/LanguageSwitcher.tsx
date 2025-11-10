'use client';

import { MenuItem } from '@mui/material';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';

import Button from '../button/Button';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import { IconButton } from '../icon-button/IconButton';
import { styles } from './LanguageSwitcher.styles';
import { IconButtonColorVariant, IconButtonVariant, PositionEnum } from '~/types/enums/common.enums';
import type { ScrollDirection } from '~/types/types/common.types';

import { usePathname, useRouter } from '~/../i18n/navigation';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

const locales = ['uk', 'en'] as const;
type Locale = (typeof locales)[number];

export interface LanguageSwitcherProps {
  variant: 'icon' | 'toggle' | 'mobile';
  scrollDirection?: ScrollDirection;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant, scrollDirection }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (scrollDirection === 'down' && anchorEl) {
      handleClose();
    }
  }, [scrollDirection, anchorEl]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    router.replace(pathname, { locale: newLocale, scroll: false });
    handleClose();
  };

  const toggleLocale = () => {
    const newLocale = currentLocale === 'uk' ? 'en' : 'uk';
    if (newLocale === currentLocale) return;
    router.replace(pathname, { locale: newLocale, scroll: false });
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

  if (variant === 'mobile') {
    return (
      <div style={styles.mobileWrapper}>
        <span style={styles.item(currentLocale === 'en')} onClick={() => handleLanguageChange('en')}>
          EN
        </span>

        <span style={styles.item(false)}>/</span>

        <span style={styles.item(currentLocale === 'uk')} onClick={() => handleLanguageChange('uk')}>
          UA
        </span>
      </div>
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
        <SvgImage src="/icons/planet.svg" alt="select language" width={24} height={24} />
      </IconButton>

      <DropdownMenu
        disableScrollLock
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

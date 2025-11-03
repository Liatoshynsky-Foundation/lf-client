'use client';

import { Badge, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import { mainHexPallete } from '~/ds-components//theme/colors';
import Button from '~/ds-components/button/Button';
import { IconButton } from '~/ds-components/icon-button/IconButton';

import { ControlPanelStyles } from './ControlPanel.styles';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import Filter from '~/public/icons/filter.svg';
import SearchIcon from '~/public/icons/search.svg';

interface ControlPanelProps {
  readonly Search: ReactNode;
  readonly Filters: ReactNode;
  readonly tableName: string;
  readonly activeFiltersCount: number;
}

export default function ControlPanel({ tableName, Search, Filters, activeFiltersCount }: Readonly<ControlPanelProps>) {
  const t = useTranslations('table');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const isLessThan405 = useMediaQuery('(max-width:405px)', { noSsr: true });

  const [searchActive, setSearchActive] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setSearchActive(false);
      setFiltersActive(false);
    }
  }, [isMobile]);

  const toggleSearch = useCallback(() => setSearchActive((v) => !v), []);
  const toggleFilters = useCallback(() => setFiltersActive((v) => !v), []);

  const searchIconButton = (
    <IconButton
      type={searchActive ? IconButtonVariant.icon : IconButtonVariant.outlined}
      variant={searchActive ? IconButtonColorVariant.Secondary : IconButtonColorVariant.Primary}
      onClick={toggleSearch}
      size="medium"
      customStyles={ControlPanelStyles.iconButton(searchActive)}
    >
      <Svg
        Component={SearchIcon}
        alt="search"
        fill="none"
        width="24px"
        height="24px"
        stroke={searchActive ? mainHexPallete.white : mainHexPallete.black}
      />
    </IconButton>
  );

  const filtersIconButton = (
    <Badge
      badgeContent={activeFiltersCount}
      color="primary"
      invisible={activeFiltersCount === 0}
      sx={ControlPanelStyles.filtersBadge}
    >
      <IconButton
        type={filtersActive ? IconButtonVariant.icon : IconButtonVariant.outlined}
        variant={filtersActive ? IconButtonColorVariant.Secondary : IconButtonColorVariant.Primary}
        onClick={toggleFilters}
        size="medium"
        customStyles={ControlPanelStyles.iconButton(filtersActive)}
        aria-label={t('controls.filters')}
      >
        <Svg
          Component={Filter}
          alt="filters"
          fill="none"
          width="24px"
          height="24px"
          stroke={filtersActive ? mainHexPallete.white : mainHexPallete.black}
        />
      </IconButton>
    </Badge>
  );

  const filtersDesktop = (
    <Badge
      badgeContent={activeFiltersCount}
      color="primary"
      invisible={activeFiltersCount === 0}
      sx={ControlPanelStyles.filtersBadge}
    >
      <Button
        variant="outlined"
        size="medium"
        onClick={toggleFilters}
        startIcon={<Filter width="28px" height="28px" />}
        sx={ControlPanelStyles.filterButton}
      >
        <span className="filtersLabel">{t('controls.filters')}</span>
      </Button>
    </Badge>
  );

  return (
    <Box sx={ControlPanelStyles.root}>
      <Box sx={ControlPanelStyles.header}>
        <Typography variant={isLessThan405 ? 'customBold25' : 'customBold32'}>{tableName}</Typography>
        <Box sx={ControlPanelStyles.headerRight}>
          {isMobile ? searchIconButton : Search}
          {isMobile ? filtersIconButton : filtersDesktop}
        </Box>
      </Box>
      <Box sx={ControlPanelStyles.controlsColumn}>
        {isMobile && searchActive ? <Box>{Search}</Box> : null}
        {filtersActive ? <Box sx={ControlPanelStyles.filtersContainer}>{Filters}</Box> : null}
      </Box>
    </Box>
  );
}

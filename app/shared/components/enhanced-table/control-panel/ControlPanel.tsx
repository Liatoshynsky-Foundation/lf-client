'use client';

import { Badge, Box, Collapse, Typography } from '@mui/material';
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
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface ControlPanelProps {
  readonly Search: ReactNode;
  readonly Filters: ReactNode;
  readonly tableName: string;
  readonly activeFiltersCount: number;
  readonly sx?: object;
}

export default function ControlPanel({
  tableName,
  Search,
  Filters,
  activeFiltersCount,
  sx
}: Readonly<ControlPanelProps>) {
  const t = useTranslations('table');
  const { isMobile } = useBreakpoints();
  const hasFilters = Boolean(Filters);

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
        startIcon={<Filter width="20px" height="20px" />}
        sx={ControlPanelStyles.filterButton}
      >
        <span className="filtersLabel">{t('controls.filters')}</span>
      </Button>
    </Badge>
  );

  return (
    <Box sx={{ ...ControlPanelStyles.root, ...sx }} data-testid="ControlPanel">
      <Box sx={ControlPanelStyles.header} data-testid="ControlPanel-header">
        <Typography
          variant="customBold25"
          data-testid="ControlPanel-tableName"
          sx={{
            fontSize: {
              xs: '24px',
              md: '32px'
            }
          }}
        >
          {tableName}
        </Typography>
        <Box sx={ControlPanelStyles.headerRight} data-testid="ControlPanel-header--right">
          {isMobile ? searchIconButton : Search}
          {isMobile && hasFilters ? filtersIconButton : null}
          {!isMobile && hasFilters ? filtersDesktop : null}
        </Box>
      </Box>
      <Box sx={ControlPanelStyles.controlsColumn} data-testid="ControlPanel-controlsColumn">
        {isMobile && searchActive ? <Box>{Search}</Box> : null}
        <Collapse
          in={filtersActive}
          timeout={{ enter: 300, exit: 600 }}
          sx={{
            transitionTimingFunction: filtersActive ? 'ease-in' : 'ease-out'
          }}
          unmountOnExit
        >
          <Box sx={ControlPanelStyles.filtersContainer}>{Filters}</Box>
        </Collapse>
      </Box>
    </Box>
  );
}

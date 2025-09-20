'use client';
import { Badge, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { ReactNode, useEffect, useState } from 'react';

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
  const isExtraSmall = useMediaQuery('(max-width:400px)', { noSsr: true });
  const [searchActive, setSearchActive] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);
  useEffect(() => {
    if (!isMobile) {
      setSearchActive(false);
      setFiltersActive(false);
    }
  }, [isMobile]);

  return (
    <Box sx={ControlPanelStyles.root(theme)}>
      <Box sx={ControlPanelStyles.header}>
        <Typography variant="customBold32">{tableName}</Typography>

        <Box sx={ControlPanelStyles.headerRight}>
          {isMobile ? (
            <Box sx={ControlPanelStyles.mobileSearchBox}>
              <IconButton
                sx={ControlPanelStyles.searchIconButton}
                type={searchActive ? IconButtonVariant.filled : IconButtonVariant.outlined}
                variant={IconButtonColorVariant.Primary}
                onClick={() => setSearchActive((prev) => !prev)}
                size={isExtraSmall ? 'small' : 'medium'}
              >
                <Svg
                  Component={SearchIcon}
                  alt="search"
                  color={searchActive ? mainHexPallete.white : mainHexPallete.black}
                  width="28px"
                  height="28px"
                />
              </IconButton>
            </Box>
          ) : (
            Search
          )}

          <Badge
            badgeContent={activeFiltersCount}
            color="primary"
            invisible={activeFiltersCount === 0}
            sx={ControlPanelStyles.filtersBadge}
          >
            <Button
              variant="outlined"
              size="medium"
              onClick={() => setFiltersActive((prev) => !prev)}
              startIcon={<Filter />}
            >
              {t('controls.filters')}
            </Button>
          </Badge>
        </Box>
      </Box>

      <Box sx={ControlPanelStyles.controlsColumn}>
        {searchActive && isMobile ? <Box>{Search}</Box> : null}
        {filtersActive && <Box sx={ControlPanelStyles.filtersContainer}>{Filters}</Box>}
      </Box>
    </Box>
  );
}

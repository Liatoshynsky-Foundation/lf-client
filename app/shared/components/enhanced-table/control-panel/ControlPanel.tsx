'use client';
import { Badge, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import { mainHexPallete } from '~/ds-components//theme/colors';
import Button from '~/ds-components/button/Button';
import { IconButton } from '~/ds-components/icon-button/IconButton';

import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import Filter from '~/public/icons/filter.svg';
import Search from '~/public/icons/search.svg';

type CompositionsControlPanelProps = {
  MusicSearch: ReactNode;
  Filters?: ReactNode;
  tableName: string;
  activeFiltersCount?: number;
};

export const ControlPanel = ({
  MusicSearch,
  Filters,
  tableName,
  activeFiltersCount
}: CompositionsControlPanelProps) => {
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
    <Box
      display="column"
      gap={8}
      pl={3}
      sx={{
        [theme.breakpoints.up('xs')]: {
          pl: '24px'
        },
        [theme.breakpoints.up('sm')]: {
          pr: '30px',
          pl: '56px'
        },
        [theme.breakpoints.up('md')]: {
          pr: '60px',
          pl: '72px'
        }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%', mb: 2 }}>
        <Typography variant={isExtraSmall ? 'customBold25' : 'customBold32'}>{tableName}</Typography>
        {isMobile ? (
          <Box sx={{ marginRight: '30px' }}>
            <IconButton
              type={searchActive ? IconButtonVariant.filled : IconButtonVariant.outlined}
              variant={IconButtonColorVariant.Primary}
              onClick={() => setSearchActive((prev) => !prev)}
              size={isExtraSmall ? 'small' : 'medium'}
            >
              <Svg Component={Search} alt="search" color={searchActive ? mainHexPallete.white : mainHexPallete.black} />
            </IconButton>
          </Box>
        ) : (
          MusicSearch
        )}
        {Filters && (
          <Badge
            badgeContent={activeFiltersCount}
            color="primary"
            invisible={activeFiltersCount === 0}
            sx={{
              '& .MuiBadge-badge': { top: '5px', right: '5px', borderRadius: '50%', minWidth: '18px', height: '18px' }
            }}
          >
            <Button
              variant="outlined"
              size="medium"
              onClick={() => setFiltersActive((prev) => !prev)}
              startIcon={<Filter />}
            >
              Фільтри
            </Button>
          </Badge>
        )}
      </Box>
      <>{searchActive && isMobile ? <Box>{MusicSearch}</Box> : <></>}</>
      {filtersActive && <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', gap: 2 }}>{Filters}</Box>}
      <Box></Box>
    </Box>
  );
};

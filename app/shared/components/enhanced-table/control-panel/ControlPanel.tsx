'use client';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';

import { Svg } from '../../colored-svg/ColoredSvg';
import { IconButton } from '../../design-system/all-components/icon-button/IconButton';
import { mainHexPallete } from '../../design-system/all-components/theme/colors';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import Search from '~/public/icons/search.svg';
type CompositionsControlPanelProps = {
  MusicSearch: ReactNode;
  tableName: string;
};
const CompositionsControlPanel = ({ MusicSearch, tableName }: CompositionsControlPanelProps) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'), { noSsr: true });
  const [searchActive, setSearchActive] = useState(false);
  useEffect(() => {
    if (!isMobile) {
      setSearchActive(false);
    }
  }, [isMobile]);
  return (
    <Box display="column" gap={8} pl={9}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%', mb: 2 }}>
        <Typography variant="customBold32">{tableName}</Typography>
        {isMobile ? (
          <IconButton
            type={searchActive ? IconButtonVariant.filled : IconButtonVariant.outlined}
            variant={searchActive ? IconButtonColorVariant.Primary : IconButtonColorVariant.Primary}
            onClick={() => setSearchActive((prev) => !prev)}
          >
            <Svg Component={Search} alt="search" color={searchActive ? mainHexPallete.white : mainHexPallete.black} />
          </IconButton>
        ) : (
          MusicSearch
        )}
      </Box>
      <>{searchActive && isMobile ? MusicSearch : <></>}</>
    </Box>
  );
};

export default CompositionsControlPanel;

'use client';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React, { ReactNode, useState } from 'react';

import { Svg } from '../../colored-svg/ColoredSvg';
import { IconButton } from '../../design-system/all-components/icon-button/IconButton';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import Search from '~/public/icons/search.svg';
type CompositionsControlPanelProps = {
  MusicSearch: ReactNode;
  tableName: string;
};
const CompositionsControlPanel = ({ MusicSearch, tableName }: CompositionsControlPanelProps) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'), { noSsr: true });

  const [searchActive, setSearchActive] = useState(false);
  return (
    <Box display="column" gap={8} pl={9}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%', mb: 2 }}>
        <Typography variant="customBold32">{tableName}</Typography>
        {isMobile ? (
          <IconButton
            type={searchActive ? IconButtonVariant.icon : IconButtonVariant.outlined}
            variant={searchActive ? IconButtonColorVariant.Secondary : IconButtonColorVariant.Primary}
            onClick={() => setSearchActive((prev) => !prev)}
          >
            <Svg Component={Search} alt="search" color="#ffffff" />
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

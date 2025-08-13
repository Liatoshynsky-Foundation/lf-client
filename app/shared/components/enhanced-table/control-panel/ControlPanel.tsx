'use client';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const isExtraSmall = useMediaQuery('(max-width:400px)', { noSsr: true });
  const [searchActive, setSearchActive] = useState(false);
  useEffect(() => {
    if (!isMobile) {
      setSearchActive(false);
    }
  }, [isMobile]);
  return (
    <Box display="column" gap={8} pl={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%', mb: 2 }}>
        <Typography variant={isExtraSmall ? 'customBold30' : 'customBold32'}>{tableName}</Typography>
        {isMobile ? (
          <Box sx={{ marginRight: '30px' }}>
            <IconButton
              type={searchActive ? IconButtonVariant.filled : IconButtonVariant.outlined}
              variant={IconButtonColorVariant.Primary}
              onClick={() => setSearchActive((prev) => !prev)}
              size={isExtraSmall ? 'small' : 'meduim'}
            >
              <Svg Component={Search} alt="search" color={searchActive ? mainHexPallete.white : mainHexPallete.black} />
            </IconButton>
          </Box>
        ) : (
          MusicSearch
        )}
      </Box>
      <>{searchActive && isMobile ? <Box>{MusicSearch}</Box> : <></>}</>
    </Box>
  );
};

export default CompositionsControlPanel;

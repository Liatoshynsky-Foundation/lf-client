'use client';

import { Box, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';

import { styles } from './ArchiveHeader.styles';

import SearchIcon from '~/public/icons/search-static.svg';
import { theme } from '~/shared/components/design-system/all-components/theme/Theme';

export interface ArchiveHeaderProps {
  onSearch?: (query: string) => void;
  dataTestId?: string;
}

export default function ArchiveHeader({ onSearch, dataTestId = 'ArchiveHeader' }: Readonly<ArchiveHeaderProps>) {
  const t = useTranslations('archivePage');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <Box sx={styles(theme).headerContainer} data-testid={dataTestId}>
      <Box sx={styles(theme).contentWrapper} data-testid={`${dataTestId}-content`}>
        <Typography
          variant="h1"
          sx={{
            ...styles(theme).title
          }}
          data-testid={`${dataTestId}-title`}
        >
          {t('title')}
        </Typography>

        <Typography
          sx={{
            ...styles(theme).description
          }}
          data-testid={`${dataTestId}-description`}
        >
          {t('description')}
        </Typography>
      </Box>

      <Box sx={styles(theme).searchWrapper} data-testid={`${dataTestId}-searchWrapper`}>
        <TextField
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            ...styles(theme).searchInput
          }}
          data-testid={`${dataTestId}-searchInput`}
          InputProps={{
            startAdornment: (
              <Svg
                Component={SearchIcon}
                alt="search"
                fill="none"
                width="24px"
                height="24px"
                stroke="#63666E"
                sx={{ marginRight: '8px' }}
              />
            )
          }}
          inputProps={{
            'aria-label': t('searchPlaceholder')
          }}
        />
      </Box>
    </Box>
  );
}

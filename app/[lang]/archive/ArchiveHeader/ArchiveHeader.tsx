'use client';

import { Box, TextField, Typography } from '@mui/material';
import debounce from 'lodash.debounce';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';

import { styles } from './ArchiveHeader.styles';
import type { TipTapDoc } from '~/types/types/tiptap.types';

import SearchIcon from '~/public/icons/search-static.svg';
import { renderData } from '~/shared/components/tip-tap-content/nodes';

export interface ArchiveHeaderProps {
  onSearch?: (query: string) => void;
  dataTestId?: string;
}

const hasDescriptionContent = (description: string | TipTapDoc) => {
  if (typeof description === 'string') return description.trim().length > 0;

  return description.content.some((node) =>
    node.content?.some((content) => 'text' in content && typeof content.text === 'string' && content.text.trim())
  );
};

const renderDescriptionParagraph = (children: React.ReactNode) => (
  <Typography sx={styles.descriptionParagraph}>{children}</Typography>
);

export default function ArchiveHeader({ onSearch, dataTestId = 'ArchiveHeader' }: Readonly<ArchiveHeaderProps>) {
  const t = useTranslations('archivePage');
  const locale = useLocale();
  const [description, setDescription] = useState<string | TipTapDoc | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadDescription = async () => {
      try {
        const response = await fetch(`/api/page?pageName=archive&lang=${locale}`);
        if (!response.ok) return;

        const result = await response.json();
        if (result.ok) {
          setDescription(result.value?.blocks?.PageCaption?.description ?? null);
        }
      } catch {
        setDescription(null);
      }
    };

    void loadDescription();
  }, [locale]);

  const debouncedOnSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch?.(value);
      }, 400),
    [onSearch]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedOnSearch(value);
  };

  return (
    <Box sx={styles.headerContainer} data-testid={dataTestId}>
      <Box sx={styles.contentWrapper} data-testid={`${dataTestId}-content`}>
        <Typography
          variant="h1"
          sx={{
            ...styles.title
          }}
          data-testid={`${dataTestId}-title`}
        >
          {t('title')}
        </Typography>

        {description && hasDescriptionContent(description) && (
          <Box sx={styles.description} data-testid={`${dataTestId}-description`}>
            <TipTapContent
              data={renderData(description)}
              locale={locale}
              nodeRenderers={{ paragraph: renderDescriptionParagraph }}
            />
          </Box>
        )}
      </Box>

      <Box sx={styles.searchWrapper} data-testid={`${dataTestId}-searchWrapper`}>
        <TextField
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            ...styles.searchInput
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

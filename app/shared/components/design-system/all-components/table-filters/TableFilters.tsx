'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import { IconButton } from '~/ds-components/icon-button/IconButton';

import { styles } from './TableFilters.styles';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import Delete from '~/public/icons/trash-2.svg';
import TooltipCustom from '~/shared/components/design-system/all-components/tooltip/Tooltip';

interface TableFilterItem {
  id: string;
  element: React.ReactNode;
  isActive?: boolean;
  isStatic?: boolean;
}

interface TableFiltersProps {
  filters: TableFilterItem[];
  onClearAllFilters?: () => void;
  isAnyFilterActive: boolean;
}

export function TableFilters({ filters, onClearAllFilters, isAnyFilterActive }: Readonly<TableFiltersProps>) {
  const t = useTranslations('filtering');

  const orderedFilters = (() => {
    const movable = filters.filter((f) => !f.isStatic);

    const sortedMovable = [...movable].sort((a, b) => Number(Boolean(b.isActive)) - Number(Boolean(a.isActive)));

    let i = 0;
    return filters.map((f) => (f.isStatic ? f : sortedMovable[i++]));
  })();

  return (
    <Box sx={styles.container} data-testid="TableFilters">
      <Box sx={styles.row} data-testid="TableFilters-row">
        {orderedFilters.map((filter) => (
          <Box key={filter.id} data-testid={`TableFilters-filter-${filter.id}`}>
            {filter.element}
          </Box>
        ))}

        {onClearAllFilters && isAnyFilterActive && (
          <Box sx={{ alignSelf: 'center' }} data-testid="TableFilters-clearButtonWrapper">
            <TooltipCustom title={t('clearAll')} placement="top">
              <IconButton
                data-testid="TableFilters-clearButton"
                type={IconButtonVariant.outlined}
                variant={IconButtonColorVariant.Secondary}
                size="medium"
                onClick={onClearAllFilters}
                sx={{ border: 'none', padding: 0 }}
                aria-label={t('clearAll')}
              >
                <Delete />
              </IconButton>
            </TooltipCustom>
          </Box>
        )}
      </Box>
    </Box>
  );
}

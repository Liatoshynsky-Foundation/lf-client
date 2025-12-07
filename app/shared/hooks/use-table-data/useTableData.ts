'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import { tableClientService } from '~/services/client/tableService';
import type { TableParams } from '~/shared/hooks/use-table-filters/useTableFilters';

export function useTableData<T, P extends TableParams>(endpoint: string, params: P) {
  const locale = useLocale();

  const queryKey: readonly ['table-data', string, string, P] = ['table-data', endpoint, locale, params];

  const query = useQuery({
    queryKey,
    queryFn: () => tableClientService.getTableData<T>(endpoint, locale, params),
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });

  return {
    data: (query.data ?? []) as T[],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error
  };
}

'use client';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { tableParams } from '~/types/types/tableParams.types';

import { tableClientService } from '~/services/client/tableService';
import useQuery from '~/shared/hooks/query/useQuery';

interface UseSearchableTitlesOptions {
  titlesEndpoint?: string;
  dataEndpoint: string;
}

export function useSearch<T>({ dataEndpoint }: Readonly<UseSearchableTitlesOptions>) {
  const searchParams = useSearchParams();
  const locale = useLocale();

  const [search, setSearch] = useState(searchParams.get('search') || '');

  const [extraParams, setExtraParams] = useState<tableParams>({});
  const setFilterParam = useCallback((params: Record<string, string | number | string[] | null>) => {
    const urlParams = new URLSearchParams(globalThis.location.search);
    const nextExtraParams: Record<string, string | number | string[] | number[]> = {};
    for (const [key, value] of Object.entries(params)) {
      urlParams.delete(key);

      if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        continue;
      }

      if (Array.isArray(value)) {
        const uniqueValues = [...new Set(value)];
        uniqueValues.forEach((val) => urlParams.append(key, String(val)));
        nextExtraParams[key] = uniqueValues;
      } else {
        urlParams.set(key, String(value));
        nextExtraParams[key] = value;
      }
    }
    setExtraParams(nextExtraParams);

    const newUrl = `${globalThis.location.pathname}?${urlParams.toString()}`;
    globalThis.history.pushState({}, '', newUrl);
  }, []);

  const debouncedSetFilterParam = useMemo(() => {
    return debounce((key: string, value: string | string[] | number | null) => setFilterParam({ [key]: value }), 750);
  }, [setFilterParam]);

  const { data = [], isLoading: loadingData } = useQuery({
    queryKey: ['table-data', dataEndpoint, locale, search, JSON.stringify(extraParams)],
    queryFn: async () => {
      JSON.stringify(extraParams);
      const params: tableParams = extraParams;
      if (search) params.search = search;
      return dataEndpoint ? tableClientService.getTableData<T>(dataEndpoint, locale, params) : Promise.resolve([]);
    },
    options: {
      staleTime: Infinity
    }
  });

  return {
    search,
    setSearch,
    data,
    loadingData,
    setFilterParam,
    debouncedSetFilterParam,
    extraParams
  };
}

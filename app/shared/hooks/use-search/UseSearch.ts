'use client';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

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

  const [extraParams, setExtraParams] = useState<Record<string, any>>({});
  const urlParams = new URLSearchParams(window.location.search);

  const setFilterParam = useCallback(
    (params: Record<string, string | number | string[] | null>) => {
      for (const [key, value] of Object.entries(params)) {
        if ((!Array.isArray(value) && typeof value === 'string') || typeof value === 'number') {
          urlParams.set(key, String(value));
          setExtraParams((prev) => ({ ...prev, [key]: value }));
        } else if (Array.isArray(value)) {
          value.forEach((val) => {
            urlParams.append(key, String(val));
            setExtraParams((prev) => ({ ...prev, [key]: val }));
          });
        }
        if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          urlParams.delete(key);
          console.log('deleted');
          setExtraParams((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
          });
        }
        if (search) {
          urlParams.set('search', search);
        }
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, '', newUrl);
      }
    },
    [search, urlParams]
  );
  const debouncedSetFilterParam = useMemo(() => {
    return debounce((key: string, value: string | string[] | number | null) => setFilterParam({ [key]: value }), 750);
  }, [setFilterParam]);

  const { data = [], isLoading: loadingData } = useQuery({
    queryKey: ['table-data', dataEndpoint, locale, search, JSON.stringify(extraParams)],
    queryFn: async () => {
      JSON.stringify(extraParams);
      const params: Record<string, any> = { ...(extraParams || {}) };
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

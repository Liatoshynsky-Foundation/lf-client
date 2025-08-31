import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import { tableClientService } from '~/services/client/tableService';
import useQuery from '~/shared/hooks/query/useQuery';

interface UseSearchableTitlesOptions {
  titlesEndpoint?: string;
  dataEndpoint: string;
}

export function useSearch<T>({ dataEndpoint }: Readonly<UseSearchableTitlesOptions>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const [search, setSearch] = useState(searchParams.get('search') || '');

  const [extraParams, setExtraParams] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const sp = searchParams as any;
    if (!sp) return initial;
    for (const key of sp.keys()) {
      if (key === 'search') continue;
      const values = typeof sp.getAll === 'function' ? sp.getAll(key) : [sp.get(key)];
      initial[key] = values.length > 1 ? values : values[0];
    }

    return initial;
  });

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams as any);

    if (search) {
      newParams.set('search', search);
    } else {
      newParams.delete('search');
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
    router.refresh();
  }, [router, search, searchParams, setSearch]);

  function setFilterParam(key: string, value: string | string[] | number | null) {
    setExtraParams((prev) => {
      const next = { ...prev };
      if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });

    const newParams = new URLSearchParams(searchParams as any);
    newParams.delete(key);

    if (Array.isArray(value)) {
      value.forEach((v) => newParams.append(key, String(v)));
    } else {
      newParams.set(key, String(value));
    }

    router.replace(`?${newParams.toString()}`, { scroll: false });
    router.refresh();
  }

  const { data = [], isLoading: loadingData } = useQuery({
    queryKey: ['table-data', dataEndpoint, locale, search, JSON.stringify(extraParams)],
    queryFn: async () => {
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
    extraParams
  };
}

import { ColumnFiltersState } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import { TitlesDTO } from '~/domain/dto/table.dto';
import { tableClientService } from '~/services/client/tableService';
import useQuery from '~/shared/hooks/query/useQuery';

interface UseSearchableTitlesOptions {
  titlesEndpoint?: string;
  dataEndpoint: string;
  /*
   * Optional filters state to be included in data fetch
   */
  filters?: ColumnFiltersState;
  /**
   * Convert ColumnFiltersState into a record of query params (key -> value).
   * If not provided, use default converter that understands `author`, `year`, `name` ids.
   */
  mapFiltersToParams?: (filters: ColumnFiltersState) => Record<string, string | string[]>;
}

export function useSearch<T>({
  titlesEndpoint,
  dataEndpoint,
  filters,
  mapFiltersToParams
}: Readonly<UseSearchableTitlesOptions>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams as any);

    if (search) {
      newParams.set('search', search);
    } else {
      newParams.delete('search');
    }

    router.replace(`?${newParams.toString()}`, { scroll: false });
    router.refresh();
  }, [router, search, searchParams]);

  // titles query (optional)
  const { data: titles = [], isLoading: loadingTitles } = useQuery({
    queryKey: ['titles', titlesEndpoint, locale],
    queryFn: () =>
      titlesEndpoint ? tableClientService.getTableTitles<TitlesDTO>(titlesEndpoint, locale) : Promise.resolve([]),
    options: {
      staleTime: Infinity
    }
  });

  // prepare filters -> params
  const defaultMap = (f?: ColumnFiltersState) => {
    const params: Record<string, string | string[]> = {};
    if (!f) return params;
    const author = (f.find((x) => x.id === 'author')?.value as string[]) || [];
    const year = (f.find((x) => x.id === 'year')?.value as [number, number]) || [];
    const name = (f.find((x) => x.id === 'name')?.value as string) || '';
    if (author.length) params['authorIds'] = author;
    if (year.length === 2) params['years'] = `${year[0]},${year[1]}`;
    if (name) params['title'] = name;
    return params;
  };

  const paramsRecord = mapFiltersToParams ? mapFiltersToParams(filters || []) : defaultMap(filters);

  const filtersKey = JSON.stringify(paramsRecord);

  const { data = [], isLoading: loadingData } = useQuery({
    queryKey: ['table-data', dataEndpoint, locale, search, filtersKey],
    queryFn: async () => {
      // construct url with locale, search and params
      const params = new URLSearchParams();
      if (locale) params.set('lang', String(locale));
      if (search) params.set('search', search);

      // append paramsRecord entries
      Object.entries(paramsRecord || {}).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          v.forEach((val) => params.append(k, String(val)));
        } else {
          params.set(k, String(v));
        }
      });

      const url = `${dataEndpoint}?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }
      return (await res.json()) as T[];
    },
    options: {
      staleTime: Infinity
    }
  });

  return {
    search,
    setSearch,
    titles,
    loadingTitles,
    data,
    loadingData
  };
}

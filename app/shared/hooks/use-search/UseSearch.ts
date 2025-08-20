import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import { tableClientService } from '~/services/client/tableService';
import useQuery from '~/shared/hooks/query/useQuery';

interface UseSearchableTitlesOptions<T> {
  titlesEndpoint: string;
  dataEndpoint: string;
}

export function useSearch<T = unknown>({ titlesEndpoint, dataEndpoint }: UseSearchableTitlesOptions<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (search) {
      newParams.set('search', search);
    } else {
      newParams.delete('search');
    }

    router.replace(`?${newParams.toString()}`, { scroll: false });
    router.refresh();
  }, [router, search, searchParams]);

  const { data: titles = [], isLoading: loadingTitles } = useQuery({
    queryKey: ['titles', titlesEndpoint, locale],
    queryFn: () => tableClientService.getTableTitles<T>(titlesEndpoint, locale),
    options: {
      staleTime: Infinity
    }
  });

  const { data = [], isLoading: loadingData } = useQuery({
    queryKey: ['table-data', dataEndpoint, locale, search],
    queryFn: () => tableClientService.getTableData<T>(dataEndpoint, locale, search),
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

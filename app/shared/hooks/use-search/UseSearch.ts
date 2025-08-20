import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CompositionTitlesDTO } from '~/domain/dto/composition.dto';
import { tableClientService } from '~/services/client/tableService';
import useQuery from '~/shared/hooks/query/useQuery';

interface UseSearchableTitlesOptions<T> {
  titlesEndpoint: string;
  dataEndpointBuilder: (search: string) => string;
  lang?: string;
}

export function useSearch<T = unknown>({ titlesEndpoint, dataEndpointBuilder }: UseSearchableTitlesOptions<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    queryKey: ['titles', titlesEndpoint, search],
    queryFn: () => tableClientService.getTableData<CompositionTitlesDTO>(titlesEndpoint),
    options: {
      staleTime: Infinity
    }
  });

  const { data = [], isLoading: loadingData } = useQuery({
    queryKey: ['table-data', dataEndpointBuilder(search), search],
    queryFn: () => tableClientService.getTableData<T>(dataEndpointBuilder(search)),
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

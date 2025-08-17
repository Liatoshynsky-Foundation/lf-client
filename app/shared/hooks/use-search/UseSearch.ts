import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Music } from '~/types/types/enhancedTable';

import { CompositionTitlesDTO } from '~/domain/dto/composition.dto';

interface UseSearchableTitlesOptions {
  titlesEndpoint: string;
  dataEndpointBuilder: (search: string) => string;
  lang?: string;
}

export function useSearch({ titlesEndpoint, dataEndpointBuilder }: UseSearchableTitlesOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [titles, setTitles] = useState<CompositionTitlesDTO[]>([]);
  const [data, setData] = useState<Music[]>([]);
  const [loadingTitles, setLoadingTitles] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

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

  useEffect(() => {
    const fetchTitles = async () => {
      setLoadingTitles(true);
      try {
        const res = await fetch(titlesEndpoint);
        const json = await res.json();
        setTitles(json);
      } finally {
        setLoadingTitles(false);
      }
    };

    fetchTitles();
  }, [titlesEndpoint, search]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const endpoint = dataEndpointBuilder(search);
        const res = await fetch(endpoint);
        const json = await res.json();
        setData(json);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [search]);

  return {
    search,
    setSearch,
    titles,
    loadingTitles,
    data,
    loadingData
  };
}

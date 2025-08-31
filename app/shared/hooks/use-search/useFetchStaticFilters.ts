import { useLocale } from 'next-intl';

import { tableClientService } from '~/services/client/tableService';
import useQuery from '~/shared/hooks/query/useQuery';

export type Selector<T> = (response: any) => T;

export function useFetchStaticFilters<T = unknown>(endpoint: string | null) {
  const locale = useLocale();

  const { data } = useQuery<T | null>({
    queryKey: ['static-filters', endpoint ?? 'none', locale],
    queryFn: async (): Promise<T | null> => {
      if (!endpoint) return null;
      const resp = await tableClientService.getTableStaticData<any>(endpoint, locale);
      return resp as T;
    },
    options: {
      staleTime: Infinity
    }
  });

  return {
    data
  } as const;
}

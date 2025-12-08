import { useLocale } from 'next-intl';

import { tableClientService } from '~/services/client/tableService';
import useQuery from '~/shared/hooks/query/useQuery';

export type Selector<TResponse, R = TResponse> = (response: TResponse) => R;

export function useFetchStaticFilters<T = unknown>(endpoint: string | null) {
  const locale = useLocale();

  const { data } = useQuery<T | null>({
    queryKey: ['static-filters', endpoint ?? 'none', locale],
    queryFn: async (): Promise<T | null> => {
      if (!endpoint) return null;
      return await tableClientService.getTableStaticData<T>(endpoint, locale);
    },
    options: {
      staleTime: Infinity
    }
  });

  return {
    data
  } as const;
}

import { useLocale } from 'next-intl';

import { tableClientService } from '~/services/client/tableService';
import useQuery from '~/shared/hooks/query/useQuery';

export type Selector<T> = (response: any) => T;

export function useFetchStaticFilters(endpoint: string | null) {
  const locale = useLocale();

  const { data } = useQuery({
    queryKey: ['static-filters', endpoint ?? 'none', locale],
    queryFn: async () => {
      if (!endpoint) return null;
      return tableClientService.getTableStaticData(endpoint, locale);
    },
    options: {
      staleTime: Infinity
    }
  });

  return {
    data
  } as const;
}

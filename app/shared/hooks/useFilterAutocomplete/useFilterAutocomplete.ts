'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import { tableClientService } from '~/services/client/tableService';
import type { TableParams } from '~/shared/hooks/use-table-filters/useTableFilters';

type UseFilterAutocompleteConfig<P extends TableParams, O> = {
  /** API endpoint path (e.g. `/api/scientific-works/titles`). */
  endpoint: string;
  /** Query params sent to the endpoint. Keep stable (useMemo) to avoid extra refetches. */
  params: P;
  /** Convert response JSON into options array. Keep stable (useCallback) to avoid extra refetches. */
  select?: (json: unknown) => O[];
  /** Disable fetching when false. @defaultValue true */
  enabled?: boolean;
};

/**
 * Autocomplete data fetcher.
 *
 * Calls `tableClientService.getTableStaticData(endpoint, locale, params)` and returns `{ options, loading }`.
 * On error, `options` becomes `[]`.
 *
 * @example
 * ```ts
 * type TitlesResponse = { titles: string[] };
 *
 * const params = useMemo(() => ({ search, author }), [search, author]);
 * const selectTitles = useCallback((json: unknown) => (json as TitlesResponse).titles, []);
 *
 * const { options, loading } = useFilterAutocomplete<typeof params, string>({
 *   endpoint: ApiRoutes.SCIENTIFIC_WORKS_TITLES,
 *   params,
 *   select: selectTitles
 * });
 * ```
 */
export function useFilterAutocomplete<P extends TableParams, O>({
  endpoint,
  params,
  select,
  enabled = true
}: UseFilterAutocompleteConfig<P, O>) {
  const locale = useLocale();

  const [options, setOptions] = useState<O[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let isCancelled = false;

    const fetchOptions = async () => {
      setLoading(true);
      try {
        const json = await tableClientService.getTableStaticData<unknown>(endpoint, locale, params);
        const nextOptions = select ? select(json) : (json as O[]);

        if (!isCancelled) setOptions(nextOptions);
      } catch {
        if (!isCancelled) setOptions([]);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchOptions();

    return () => {
      isCancelled = true;
    };
  }, [endpoint, locale, enabled, select, params]);

  return { options, loading };
}

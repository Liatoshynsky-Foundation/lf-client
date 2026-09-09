'use client';

import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

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

  const selectRef = useRef(select);
  useEffect(() => {
    selectRef.current = select;
  }, [select]);

  const serializedParams = JSON.stringify(params);

  useEffect(() => {
    if (!enabled) return;

    let isCancelled = false;

    const fetchOptions = async () => {
      setLoading(true);
      try {
        const currentParams = JSON.parse(serializedParams) as P;
        const json = await tableClientService.getTableStaticData<unknown>(endpoint, locale, currentParams);

        const nextOptions = selectRef.current ? selectRef.current(json) : (json as O[]);

        if (!isCancelled) setOptions(nextOptions || []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`[useFilterAutocomplete] Fetching failed for endpoint: ${endpoint}`, error);
        if (!isCancelled) setOptions([]);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchOptions();

    return () => {
      isCancelled = true;
    };
  }, [endpoint, locale, enabled, serializedParams]);

  return { options, loading };
}

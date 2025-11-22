'use client';

import debounce from 'lodash.debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { tableClientService } from '~/services/client/tableService';
import useQuery from '~/shared/hooks/query/useQuery';

/**
 * T — тип елементів таблиці
 * P — тип параметрів (search, фільтри, сортування)
 *
 * Приклад:
 * const { data, params, updateParams, debouncedUpdateParam } = useSearch<
 *   WorkTable,
 *   { search: string; yearFrom?: number; authorIds: string[] }
 * >({
 *   dataEndpoint: '/api/some-api',
 *   initialParams: { search: '', authorIds: [] }
 * });
 */
export function useSearch<T, P extends Record<string, unknown>>({
  dataEndpoint,
  initialParams
}: {
  dataEndpoint: string;
  initialParams: P;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const [params, setParams] = useState<P>(() => {
    const acc = { ...initialParams };

    searchParams.forEach((value, key) => {
      if (!Object.prototype.hasOwnProperty.call(acc, key)) return;

      const typedKey = key as keyof P;
      const current = acc[typedKey];

      if (Array.isArray(current)) {
        acc[typedKey] = value.split(',') as P[typeof typedKey];
      } else {
        acc[typedKey] = value as P[typeof typedKey];
      }
    });

    return acc;
  });

  const updateParams = useCallback(
    (updater: (prev: P) => P) => {
      setParams((prev) => {
        const newState = updater(prev);

        const urlParams = new URLSearchParams();

        Object.entries(newState).forEach(([key, value]) => {
          if (value == null) return;

          if (Array.isArray(value)) {
            if (value.length === 0) return;
            value.forEach((item) => urlParams.append(key, String(item)));
          } else {
            urlParams.set(key, String(value));
          }
        });

        router.replace(`${pathname}?${urlParams.toString()}`, { scroll: false });
        return newState;
      });
    },
    [pathname, router]
  );

  const resetParams = useCallback(() => {
    setParams(initialParams);

    const urlParams = new URLSearchParams();
    Object.entries(initialParams).forEach(([key, value]) => {
      if (value == null) return;
      if (Array.isArray(value)) {
        value.forEach((v) => urlParams.append(key, String(v)));
      } else {
        urlParams.set(key, String(value));
      }
    });

    router.replace(`${pathname}?${urlParams.toString()}`, { scroll: false });
  }, [initialParams, pathname, router]);

  const debouncedUpdateParam = useMemo(
    () =>
      debounce(<K extends keyof P>(key: K, value: P[K]) => {
        updateParams((prev) => ({
          ...prev,
          [key]: value
        }));
      }, 600),
    [updateParams]
  );

  const { data = [], isLoading } = useQuery({
    queryKey: ['table', dataEndpoint, locale, params],
    queryFn: () => tableClientService.getTableData<T>(dataEndpoint, locale, params),
    options: { staleTime: Infinity }
  });

  return {
    data,
    isLoading,
    params,
    updateParams,
    debouncedUpdateParam,
    resetParams
  };
}

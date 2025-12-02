'use client';

import debounce from 'lodash.debounce';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Primitive = string | number | null;
type ParamValue = Primitive | Primitive[];

export type TableParams = Record<string, ParamValue>;

type SetParamType<P extends TableParams> = <K extends keyof P>(key: K, value: P[K]) => void;

export function useTableFilters<P extends TableParams>(initialParams: P) {
  const router = useRouter();
  const pathname = usePathname();

  const [params, setParams] = useState<P>(initialParams);

  useEffect(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const syncUrl = useCallback(
    (nextParams: P) => {
      const urlParams = new URLSearchParams();

      Object.entries(nextParams).forEach(([key, value]) => {
        if (value === null) return;

        if (Array.isArray(value)) {
          if (!value.length) return;
          for (const v of value) {
            urlParams.append(key, String(v));
          }
          return;
        }

        urlParams.set(key, String(value));
      });

      router.replace(`${pathname}?${urlParams.toString()}`, { scroll: false });
    },
    [router, pathname]
  );

  const setParam: SetParamType<P> = useCallback(
    (key, value) => {
      setParams((prev) => {
        const next = { ...prev, [key]: value };
        syncUrl(next);
        return next;
      });
    },
    [syncUrl]
  );

  const debouncedSetParam = useMemo(
    () =>
      debounce(<K extends keyof P>(key: K, value: P[K]) => {
        setParams((prev) => {
          const next = { ...prev, [key]: value };
          syncUrl(next);
          return next;
        });
      }, 400),
    [syncUrl]
  );

  const resetFilters = useCallback(() => {
    setParams(initialParams);
    syncUrl(initialParams);
  }, [initialParams, syncUrl]);

  return {
    params,
    setParam,
    debouncedSetParam,
    resetFilters
  };
}

'use client';

import debounce from 'lodash.debounce';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Primitive = string | number | null;
type ParamValue = Primitive | Primitive[];
export type TableParams = Record<string, ParamValue>;

type SetParamType<P extends TableParams> = <K extends keyof P>(key: K, value: P[K]) => void;

export function useTableFilters<P extends TableParams>(initialParams: P) {
  const router = useRouter();
  const pathname = usePathname();

  const [params, setParams] = useState<P>(initialParams);
  const isFirstRender = useRef(true);

  useEffect(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

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

      const search = urlParams.toString();
      const url = search ? `${pathname}?${search}` : pathname;

      router.replace(url, { scroll: false });
    },
    [router, pathname]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    syncUrl(params);
  }, [params, syncUrl]);

  const setParam: SetParamType<P> = useCallback((key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const debouncedSetParam = useMemo(
    () =>
      debounce(<K extends keyof P>(key: K, value: P[K]) => {
        setParams((prev) => ({
          ...prev,
          [key]: value
        }));
      }, 400),
    []
  );

  const resetFilters = useCallback(() => {
    setParams(initialParams);
  }, [initialParams]);

  return {
    params,
    setParam,
    debouncedSetParam,
    resetFilters
  };
}

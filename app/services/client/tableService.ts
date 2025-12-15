import { Locale } from 'next-intl';

import { getFullUrl } from '~/lib/utils/getFullUrl';
import { baseService } from '~/services/client/baseService';

export type QueryPrimitive = string | number | boolean | null | undefined;
export type QueryValue = QueryPrimitive | QueryPrimitive[];
export type TableParams = Record<string, QueryValue>;

async function getTableStaticData<T>(pathname: string, locale: Locale, params?: TableParams): Promise<T> {
  const url = getFullUrl({
    pathname,
    searchParameters: { locale, ...params }
  });
  return baseService.request<T>({
    method: 'GET',
    url
  });
}

async function getTableData<T>(pathname: string, locale: Locale, params: TableParams): Promise<T[]> {
  const url = getFullUrl({
    pathname,
    searchParameters: {
      locale,
      ...params
    }
  });
  return baseService.request<T[]>({
    method: 'GET',
    url
  });
}

export const tableClientService = {
  getTableStaticData,
  getTableData
};

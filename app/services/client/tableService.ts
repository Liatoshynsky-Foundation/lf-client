import { Locale } from 'next-intl';

import type { tableParams } from '~/types/types/tableParams.types';

import { getFullUrl } from '~/lib/utils/getFullUrl';
import { baseService } from '~/services/client/baseService';

async function getTableStaticData<T>(pathname: string, locale: Locale): Promise<T> {
  const url = getFullUrl({
    pathname,
    searchParameters: { locale }
  });
  return baseService.request<T>({
    method: 'GET',
    url
  });
}

async function getTableData<T>(pathname: string, locale: Locale, params: tableParams): Promise<T[]> {
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

import { Locale } from 'next-intl';

import { getFullUrl } from '~/lib/utils/getFullUrl';
import { baseService } from '~/services/client/baseService';

async function getTableTitles<T>(pathname: string, locale: Locale): Promise<T[]> {
  const url = getFullUrl({
    pathname,
    searchParameters: { locale }
  });
  return baseService.request<T[]>({
    method: 'GET',
    url
  });
}

async function getTableData<T>(pathname: string, locale: Locale, search?: string): Promise<T[]> {
  const url = getFullUrl({
    pathname,
    searchParameters: {
      locale,
      ...(search ? { search } : {})
    }
  });
  console.log('the url', url);
  return baseService.request<T[]>({
    method: 'GET',
    url
  });
}

export const tableClientService = {
  getTableTitles,
  getTableData
};

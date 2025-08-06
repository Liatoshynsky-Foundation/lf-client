import type { Locale } from 'next-intl';

import { ApiRoutes } from '~/constants/routes/api-routes';
import type { HeaderData } from '~/types/types/header.type';

import { getFullUrl } from '~/lib/utils/getFullUrl';
import { baseService } from '~/services/client/baseService';

export const headerClientService = {
  async getHeaderData(locale: Locale): Promise<HeaderData> {
    const url = getFullUrl({
      pathname: ApiRoutes.HEADER,
      searchParameters: {
        locale
      }
    });
    return baseService.request<HeaderData>({
      method: 'GET',
      url: url
    });
  }
};

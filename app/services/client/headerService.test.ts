import { headerClientService } from './headerService';
import type { HeaderData } from '~/types/types/header.type';

import { getFullUrl } from '~/lib/utils/getFullUrl';
import { baseService } from '~/services/client/baseService';

jest.mock('~/services/client/baseService', () => ({
  baseService: {
    request: jest.fn()
  }
}));

jest.mock('~/lib/utils/getFullUrl', () => ({
  getFullUrl: jest.fn()
}));

describe('headerClientService.getHeaderData', () => {
  it('should fetch header data with correct locale', async () => {
    const mockUrl = '/api/header?locale=uk';
    const mockLocale = 'uk';
    const mockHeaderData: HeaderData = {
      navigation: [],
      supportButtonLink: 'https://example.com/support'
    };

    (getFullUrl as jest.Mock).mockReturnValue(mockUrl);
    (baseService.request as jest.Mock).mockResolvedValue(mockHeaderData);

    const result = await headerClientService.getHeaderData(mockLocale);

    expect(getFullUrl).toHaveBeenCalledWith({
      pathname: '/api/header',
      searchParameters: { locale: mockLocale }
    });

    expect(baseService.request).toHaveBeenCalledWith({
      method: 'GET',
      url: mockUrl
    });

    expect(result).toEqual(mockHeaderData);
  });
});

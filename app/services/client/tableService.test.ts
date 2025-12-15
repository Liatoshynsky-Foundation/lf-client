import type { Locale } from 'next-intl';

import { tableClientService } from './tableService';

import { getFullUrl } from '~/lib/utils/getFullUrl';
import { baseService } from '~/services/client/baseService';

jest.mock('~/lib/utils/getFullUrl', () => ({
  getFullUrl: jest.fn()
}));

jest.mock('~/services/client/baseService', () => ({
  baseService: {
    request: jest.fn()
  }
}));

const mockedGetFullUrl = getFullUrl as jest.MockedFunction<typeof getFullUrl>;
const mockedRequest = baseService.request as jest.MockedFunction<typeof baseService.request>;

describe('tableService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTableStaticData', () => {
    it('builds url with locale + params and requests static data', async () => {
      const pathname = '/api/filters';
      const locale = 'uk' as Locale;

      const params = {
        page: 1,
        q: 'test',
        flags: [true, false],
        nullable: null
      };

      const mockUrl = '/api/filters?locale=uk&page=1&q=test&flags=true&flags=false&nullable=null';
      const mockResponse = { items: ['a', 'b'] };

      mockedGetFullUrl.mockReturnValue(mockUrl);
      mockedRequest.mockResolvedValue(mockResponse);

      const result = await tableClientService.getTableStaticData<typeof mockResponse>(pathname, locale, params);

      expect(mockedGetFullUrl).toHaveBeenCalledWith({
        pathname,
        searchParameters: { locale, ...params }
      });

      expect(mockedRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: mockUrl
      });

      expect(result).toBe(mockResponse);
    });

    it('handles params being undefined (only locale should be passed)', async () => {
      const pathname = '/api/filters';
      const locale = 'en' as Locale;

      const mockUrl = '/api/filters?locale=en';
      const mockResponse = { ok: true };

      mockedGetFullUrl.mockReturnValue(mockUrl);
      mockedRequest.mockResolvedValue(mockResponse);

      const result = await tableClientService.getTableStaticData<typeof mockResponse>(pathname, locale);

      expect(mockedGetFullUrl).toHaveBeenCalledWith({
        pathname,
        searchParameters: { locale }
      });

      expect(mockedRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: mockUrl
      });

      expect(result).toBe(mockResponse);
    });

    it('passes through undefined values inside params (does not drop them at service level)', async () => {
      const pathname = '/api/filters';
      const locale = 'uk' as Locale;

      const params = {
        page: 1,
        search: undefined, // important case
        tags: ['a', 'b']
      };

      const mockUrl = '/api/filters?locale=uk&page=1&tags=a&tags=b';
      const mockResponse = { items: [] };

      mockedGetFullUrl.mockReturnValue(mockUrl);
      mockedRequest.mockResolvedValue(mockResponse);

      await tableClientService.getTableStaticData<typeof mockResponse>(pathname, locale, params);

      expect(mockedGetFullUrl).toHaveBeenCalledWith({
        pathname,
        searchParameters: { locale, ...params }
      });
    });
  });

  describe('getTableData', () => {
    it('builds url with locale + params and requests table data array', async () => {
      const pathname = '/api/rows';
      const locale = 'uk' as Locale;

      const params = {
        page: 2,
        pageSize: 25,
        sort: 'title'
      };

      const mockUrl = '/api/rows?locale=uk&page=2&pageSize=25&sort=title';
      const mockResponse = [{ id: 1 }, { id: 2 }];

      mockedGetFullUrl.mockReturnValue(mockUrl);
      mockedRequest.mockResolvedValue(mockResponse);

      const result = await tableClientService.getTableData<{ id: number }>(pathname, locale, params);

      expect(mockedGetFullUrl).toHaveBeenCalledWith({
        pathname,
        searchParameters: { locale, ...params }
      });

      expect(mockedRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: mockUrl
      });

      expect(result).toBe(mockResponse);
    });
  });
});

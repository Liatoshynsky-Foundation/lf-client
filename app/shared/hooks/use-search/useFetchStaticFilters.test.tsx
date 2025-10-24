import { renderHook } from '@testing-library/react';
import { useLocale } from 'next-intl';

import { useFetchStaticFilters } from './useFetchStaticFilters';

import { tableClientService } from '~/services/client/tableService';
import useQuery from '~/shared/hooks/query/useQuery';

jest.mock('next-intl', () => ({
  useLocale: jest.fn()
}));

jest.mock('~/shared/hooks/query/useQuery', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('~/services/client/tableService', () => ({
  tableClientService: {
    getTableStaticData: jest.fn()
  }
}));

describe('useFetchStaticFilters', () => {
  const useQueryMock = useQuery as jest.Mock;
  const useLocaleMock = useLocale as jest.Mock;
  const getTableStaticDataMock = tableClientService.getTableStaticData as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    useLocaleMock.mockReturnValue('en');
    useQueryMock.mockImplementation((opts: any) => ({ data: opts.queryFn() }));
  });

  it('returns null data when endpoint is null', async () => {
    const { result } = renderHook(() => useFetchStaticFilters(null));

    const data = await result.current.data;
    expect(data).toBeNull();
    expect(getTableStaticDataMock).not.toHaveBeenCalled();
  });

  it('calls getTableStaticData when endpoint is provided', async () => {
    const endpoint = '/api/static/filters';
    const mockData = { genres: [{ name: 'rock' }] };
    getTableStaticDataMock.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFetchStaticFilters(endpoint));

    const data = await result.current.data;

    expect(getTableStaticDataMock).toHaveBeenCalledWith(endpoint, 'en');
    expect(data).toEqual(mockData);
  });

  it('includes locale in queryKey', () => {
    const endpoint = '/api/static/filters';
    useQueryMock.mockImplementation(() => ({ data: null }));

    renderHook(() => useFetchStaticFilters(endpoint));

    const callArgs = useQueryMock.mock.calls[0][0];
    expect(callArgs.queryKey).toEqual(['static-filters', endpoint, 'en']);
  });
});

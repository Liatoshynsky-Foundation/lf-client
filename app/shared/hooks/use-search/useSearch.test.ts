import { act, renderHook } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import { useSearch } from './UseSearch';

import { tableClientService } from '~/services/client/tableService';
import useQuery from '~/shared/hooks/query/useQuery';

jest.mock('next-intl', () => ({
  useLocale: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn()
}));

jest.mock('lodash.debounce', () => jest.fn((fn) => fn));

jest.mock('~/shared/hooks/query/useQuery', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('~/services/client/tableService', () => ({
  tableClientService: {
    getTableData: jest.fn()
  }
}));

describe('useSearch', () => {
  const useLocaleMock = useLocale as jest.Mock;
  const useSearchParamsMock = useSearchParams as jest.Mock;
  const useQueryMock = useQuery as jest.Mock;
  const getTableDataMock = tableClientService.getTableData as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    useLocaleMock.mockReturnValue('en');
    useSearchParamsMock.mockReturnValue(new URLSearchParams(''));
    useQueryMock.mockImplementation((opts: any) => ({ data: opts.queryFn(), isLoading: false }));
  });

  it('повертає дефолтні значення при ініціалізації', () => {
    useQueryMock.mockImplementation(() => ({ data: [{ id: 1 }], isLoading: true }));
    const { result } = renderHook(() => useSearch({ dataEndpoint: '/api/items' }));

    expect(result.current.search).toBe('');
    expect(result.current.extraParams).toEqual({});
    expect(result.current.loadingData).toBe(true);
    expect(result.current.data).toEqual([{ id: 1 }]);
  });

  it('оновлює параметри фільтрації та відображає відповідні дані', () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams('search=apple'));
    useQueryMock.mockImplementation(() => ({ data: [{ id: 1 }], isLoading: true }));

    const { result } = renderHook(() => useSearch({ dataEndpoint: '/api/items' }));

    expect(result.current.search).toBe('apple');

    act(() => result.current.setFilterParam({ category: 'books', tags: ['a', 'b'] }));

    expect(result.current.extraParams).toEqual({
      category: 'books',
      tags: ['a', 'b']
    });

    // новий виклик useQueryMock з новим queryKey
    const newCallArgs = useQueryMock.mock.calls[1][0];
    expect(newCallArgs.queryKey).toEqual([
      'table-data',
      '/api/items',
      'en',
      'apple',
      JSON.stringify({ category: 'books', tags: ['a', 'b'] })
    ]);

    expect(result.current.data).toEqual([{ id: 1 }]);
  });

  it('оновлює extraParams через debouncedSetFilterParam', () => {
    const { result } = renderHook(() => useSearch({ dataEndpoint: '/api/items' }));

    act(() => result.current.debouncedSetFilterParam('type', 'fruit'));

    expect(result.current.extraParams).toEqual({ type: 'fruit' });
  });

  it('queryFn формує params правильно та викликає getTableData', async () => {
    const mockData = [{ id: 1 }];
    getTableDataMock.mockResolvedValueOnce(mockData);

    let queryFn: any;
    useQueryMock.mockImplementation((opts: any) => {
      queryFn = opts.queryFn; // зберігаємо queryFn
      return { data: [], isLoading: false };
    });

    const { result } = renderHook(() => useSearch({ dataEndpoint: '/api/items' }));

    // встановлюємо search і extraParams
    act(() => {
      result.current.setSearch('apple');
      result.current.setFilterParam({ category: 'books', tags: ['a', 'b'] });
    });

    // викликаємо queryFn
    const data = await queryFn();

    // перевіряємо, що tableClientService отримав правильні params
    expect(getTableDataMock).toHaveBeenCalledWith('/api/items', 'en', {
      category: 'books',
      tags: ['a', 'b'],
      search: 'apple'
    });

    // перевіряємо результат
    expect(data).toEqual(mockData);
  });
});

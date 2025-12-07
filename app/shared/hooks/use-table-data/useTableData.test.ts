import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import { useTableData } from './useTableData';

const mockGetTableData = jest.fn();

jest.mock('~/services/client/tableService', () => ({
  tableClientService: {
    getTableData: (...args: any[]) => mockGetTableData(...args)
  }
}));

jest.mock('next-intl', () => ({
  useLocale: () => 'uk'
}));

function wrapper({ children }: any) {
  return React.createElement(QueryClientProvider, { client: new QueryClient() }, children);
}

describe('useTableData', () => {
  beforeEach(() => {
    mockGetTableData.mockReset();
  });

  test('fetches data correctly', async () => {
    const mockData = [{ id: 1, name: 'Test' }];
    mockGetTableData.mockResolvedValue(mockData);

    const { result } = renderHook(() => useTableData('/api/test', { search: 'abc' }), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    expect(mockGetTableData).toHaveBeenCalledWith('/api/test', 'uk', { search: 'abc' });
  });

  test('query key changes when params change', async () => {
    mockGetTableData.mockResolvedValue([{ id: 1 }]);

    const { result, rerender } = renderHook(({ params }) => useTableData('/api/test', params), {
      wrapper,
      initialProps: { params: { search: 'a' } }
    });

    await waitFor(() => {
      expect(result.current.data).toEqual([{ id: 1 }]);
    });

    expect(mockGetTableData).toHaveBeenCalledTimes(1);

    mockGetTableData.mockResolvedValue([{ id: 2 }]);
    rerender({ params: { search: 'b' } });

    await waitFor(() => {
      expect(result.current.data).toEqual([{ id: 2 }]);
    });

    expect(mockGetTableData).toHaveBeenCalledTimes(2);
  });

  test('handles empty data gracefully', async () => {
    mockGetTableData.mockResolvedValue(undefined);

    const { result } = renderHook(() => useTableData('/api/test', {}), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });
});

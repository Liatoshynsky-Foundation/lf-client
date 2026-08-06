import { act, renderHook } from '@testing-library/react';

import { useTableFilters } from './useTableFilters';

const replaceMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => '/test',
  useSearchParams: () => new URLSearchParams('search=initial&author=1&author=2')
}));

jest.mock('~/lib/utils/paramsToQuery', () => ({
  tableParamsToQuery: jest.fn((params) => {
    if (!params.search && !params.yearFrom && !params.yearTo) {
      return '';
    }
    const parts: string[] = [];
    if (params.search) parts.push(`search=${params.search}`);
    if (params.yearFrom) parts.push(`yearFrom=${params.yearFrom}`);
    if (params.yearTo) parts.push(`yearTo=${params.yearTo}`);
    return parts.length > 0 ? `?${parts.join('&')}` : '';
  })
}));

jest.useFakeTimers();

describe('useTableFilters', () => {
  const initialParams = {
    search: '',
    author: [] as string[],
    yearFrom: 1900,
    yearTo: 2024
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes params from initialParams (URL is ignored)', () => {
    renderHook(() => useTableFilters(initialParams));

    expect(replaceMock).toHaveBeenLastCalledWith('/test', { scroll: false });
  });

  test('setParam updates params and syncs URL including all fields', () => {
    const { result } = renderHook(() => useTableFilters(initialParams));

    act(() => {
      result.current.setParam('search', 'hello');
    });

    expect(result.current.params.search).toBe('hello');
    expect(replaceMock).toHaveBeenLastCalledWith('/test?search=hello&yearFrom=1900&yearTo=2024', { scroll: false });
  });

  test('debouncedSetParam updates after delay and syncs full URL', () => {
    const { result } = renderHook(() => useTableFilters(initialParams));

    act(() => {
      result.current.debouncedSetParam('search', 'debounced');
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.params.search).toBe('debounced');
    expect(replaceMock).toHaveBeenLastCalledWith('/test?search=debounced&yearFrom=1900&yearTo=2024', { scroll: false });
  });

  test('resetFilters resets to initialParams and syncs full URL', () => {
    const { result } = renderHook(() => useTableFilters(initialParams));

    act(() => {
      result.current.setParam('search', 'temp');
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.params).toEqual(initialParams);
    expect(replaceMock).toHaveBeenLastCalledWith('/test?yearFrom=1900&yearTo=2024', { scroll: false });
  });

  test('should replace pathname without query when query string is empty to cover lines 30-32 branch', () => {
    const { result } = renderHook(() =>
      useTableFilters({
        search: '',
        author: [],
        yearFrom: null,
        yearTo: null
      })
    );

    act(() => {
      result.current.setParam('search', '');
    });

    expect(replaceMock).toHaveBeenLastCalledWith('/test', { scroll: false });
  });
});

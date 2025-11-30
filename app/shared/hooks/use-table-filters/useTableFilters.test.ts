import { act, renderHook } from '@testing-library/react';

import { useTableFilters } from './useTableFilters';

const replaceMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock
  }),
  usePathname: () => '/test',
  useSearchParams: () =>
    new URLSearchParams({
      search: 'initial',
      authorIds: '1,2'
    })
}));

jest.useFakeTimers();

describe('useTableFilters', () => {
  const initialParams = {
    search: '',
    authorIds: [] as string[],
    yearFrom: 1900,
    yearTo: 2024
  };

  beforeEach(() => {
    replaceMock.mockReset();
  });

  test('initializes params from URL correctly', () => {
    const { result } = renderHook(() => useTableFilters(initialParams));

    expect(result.current.params.search).toBe('initial');
    expect(result.current.params.authorIds).toEqual(['1', '2']);
    expect(result.current.params.yearFrom).toBe(1900);
  });

  test('setParam updates params and syncs URL', () => {
    const { result } = renderHook(() => useTableFilters(initialParams));

    act(() => {
      result.current.setParam('search', 'hello');
    });

    expect(result.current.params.search).toBe('hello');
    expect(replaceMock).toHaveBeenCalledWith('/test?search=hello&authorIds=1&authorIds=2&yearFrom=1900&yearTo=2024', {
      scroll: false
    });
  });

  test('debouncedSetParam updates params after delay and syncs URL', () => {
    const { result } = renderHook(() => useTableFilters(initialParams));

    act(() => {
      result.current.debouncedSetParam('search', 'debounced');
    });

    expect(result.current.params.search).not.toBe('debounced');

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.params.search).toBe('debounced');
    expect(replaceMock).toHaveBeenLastCalledWith(
      '/test?search=debounced&authorIds=1&authorIds=2&yearFrom=1900&yearTo=2024',
      { scroll: false }
    );
  });

  test('resetFilters resets params and URL', () => {
    const { result } = renderHook(() => useTableFilters(initialParams));

    act(() => {
      result.current.setParam('search', 'temp');
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.params).toEqual(initialParams);
    expect(replaceMock).toHaveBeenLastCalledWith('/test?search=&yearFrom=1900&yearTo=2024', {
      scroll: false
    });
  });
});

import { act, renderHook } from '@testing-library/react';

import { useTableFilters } from './useTableFilters';

const replaceMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => '/test',
  useSearchParams: () => new URLSearchParams('search=initial&author=1&author=2')
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
    replaceMock.mockReset();
  });

  test('initializes params from initialParams (URL is ignored)', () => {
    renderHook(() => useTableFilters(initialParams));

    expect(replaceMock).toHaveBeenNthCalledWith(1, '/test', { scroll: false });
  });

  test('setParam updates params and syncs URL including all fields', () => {
    const { result } = renderHook(() => useTableFilters(initialParams));

    act(() => {
      result.current.setParam('search', 'hello');
    });

    expect(result.current.params.search).toBe('hello');

    expect(replaceMock).toHaveBeenNthCalledWith(2, '/test?search=hello&yearFrom=1900&yearTo=2024', { scroll: false });
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

    expect(replaceMock).toHaveBeenNthCalledWith(2, '/test?search=debounced&yearFrom=1900&yearTo=2024', {
      scroll: false
    });
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

    expect(replaceMock).toHaveBeenNthCalledWith(4, '/test?search=&yearFrom=1900&yearTo=2024', { scroll: false });
  });
});

import { act, renderHook } from '@testing-library/react';

import { usePagination } from './usePagination';

const mockData = Array.from({ length: 25 }, (_, i) => `item-${i + 1}`);

describe('usePagination', () => {
  it('should initialize correctly', () => {
    const { result } = renderHook(() => usePagination({ data: mockData, itemsPerPage: 10 }));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.visiblePages).toBe(1);
    expect(result.current.paginatedData).toEqual(mockData.slice(0, 10));
    expect(result.current.hasMore).toBe(true);
  });

  it('should load more items when handleLoadMore is called', () => {
    const { result } = renderHook(() => usePagination({ data: mockData, itemsPerPage: 10 }));

    act(() => {
      result.current.handleLoadMore();
    });

    expect(result.current.visiblePages).toBe(2);
    expect(result.current.paginatedData).toEqual(mockData.slice(0, 20));
    expect(result.current.hasMore).toBe(true);
  });

  it('should not exceed total pages when loading more', () => {
    const { result } = renderHook(() => usePagination({ data: mockData, itemsPerPage: 10 }));

    act(() => {
      result.current.handleLoadMore();
      result.current.handleLoadMore();
      result.current.handleLoadMore();
    });

    expect(result.current.visiblePages).toBe(3);
    expect(result.current.paginatedData).toEqual(mockData.slice(0, 30));
    expect(result.current.hasMore).toBe(false);
  });

  it('should change page and reset visiblePages', () => {
    const { result } = renderHook(() => usePagination({ data: mockData, itemsPerPage: 10 }));

    act(() => {
      result.current.handleLoadMore();
    });

    expect(result.current.visiblePages).toBe(2);
    expect(result.current.paginatedData).toEqual(mockData.slice(0, 20));

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.visiblePages).toBe(1);
    expect(result.current.paginatedData).toEqual(mockData.slice(10, 20));
    expect(result.current.hasMore).toBe(true);
  });

  it('should calculate hasMore correctly at the end', () => {
    const { result } = renderHook(() => usePagination({ data: mockData.slice(0, 15), itemsPerPage: 10 }));

    expect(result.current.totalPages).toBe(2);

    act(() => {
      result.current.handleLoadMore();
    });

    expect(result.current.paginatedData).toEqual(mockData.slice(0, 15));
    expect(result.current.hasMore).toBe(false);
  });
});

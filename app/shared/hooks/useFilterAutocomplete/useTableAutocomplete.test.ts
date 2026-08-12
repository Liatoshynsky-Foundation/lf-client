import { renderHook, waitFor } from '@testing-library/react';

import { useFilterAutocomplete } from './useFilterAutocomplete';

import { tableClientService } from '~/services/client/tableService';

jest.mock('next-intl', () => ({
  useLocale: () => 'en'
}));

jest.mock('~/services/client/tableService', () => ({
  tableClientService: {
    getTableStaticData: jest.fn()
  }
}));

const getTableStaticDataMock = tableClientService.getTableStaticData as jest.Mock;

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe('useFilterAutocomplete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not fetch when enabled=false', () => {
    const params = { search: 'a' } as unknown as Record<string, string>;
    const select = () => [];

    renderHook(() =>
      useFilterAutocomplete({
        endpoint: '/api/titles',
        params,
        enabled: false,
        select
      })
    );

    expect(getTableStaticDataMock).not.toHaveBeenCalled();
  });

  it('should fetch via service with locale and params, and sets options', async () => {
    const params = { search: 'abc' } as unknown as Record<string, string>;
    const select = (json: unknown) => (json as { titles: string[] }).titles;

    getTableStaticDataMock.mockResolvedValueOnce({ titles: ['A', 'B'] });

    const { result } = renderHook(() =>
      useFilterAutocomplete({
        endpoint: '/api/titles',
        params,
        select
      })
    );

    await waitFor(() => expect(getTableStaticDataMock).toHaveBeenCalledTimes(1));
    expect(getTableStaticDataMock).toHaveBeenCalledWith('/api/titles', 'en', params);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.options).toEqual(['A', 'B']);
    });
  });

  it('should set empty options on error', async () => {
    const params = { search: 'abc' } as unknown as Record<string, string>;
    const select = () => ['should not happen'];

    getTableStaticDataMock.mockRejectedValueOnce(new Error('boom'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() =>
      useFilterAutocomplete({
        endpoint: '/api/titles',
        params,
        select
      })
    );

    await waitFor(() => expect(getTableStaticDataMock).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.options).toEqual([]);
    });

    consoleErrorSpy.mockRestore();
  });

  it('should not set state after unmount (cancellation)', async () => {
    const params = { search: 'abc' } as unknown as Record<string, string>;

    const select = (json: unknown) => (json as { titles: string[] }).titles;

    const d = deferred<unknown>();
    getTableStaticDataMock.mockReturnValueOnce(d.promise);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { unmount } = renderHook(() =>
      useFilterAutocomplete({
        endpoint: '/api/titles',
        params,
        select
      })
    );

    unmount();
    d.resolve({ titles: ['late'] });

    await Promise.resolve();

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should fall back to raw json array when select function is not provided to cover line 55', async () => {
    const params = { search: 'xyz' } as unknown as Record<string, string>;
    const rawData = ['Raw Option 1', 'Raw Option 2'];

    getTableStaticDataMock.mockResolvedValueOnce(rawData);

    const { result } = renderHook(() =>
      useFilterAutocomplete({
        endpoint: '/api/titles',
        params
      })
    );

    await waitFor(() => expect(getTableStaticDataMock).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.options).toEqual(rawData);
    });
  });
});

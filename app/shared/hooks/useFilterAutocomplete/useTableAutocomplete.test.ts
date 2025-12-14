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

  it('does not fetch when enabled=false', () => {
    const params = { search: 'a' } as any;
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

  it('fetches via service with locale and params, and sets options', async () => {
    const params = { search: 'abc' } as any;
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

  it('sets empty options on error', async () => {
    const params = { search: 'abc' } as any;
    const select = () => ['should not happen'];

    getTableStaticDataMock.mockRejectedValueOnce(new Error('boom'));

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
  });

  it('does not set state after unmount (cancellation)', async () => {
    const params = { search: 'abc' } as any;
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

    // flush microtasks
    await Promise.resolve();

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});

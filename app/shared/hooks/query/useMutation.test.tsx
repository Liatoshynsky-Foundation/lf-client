import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import useMutation from './useMutation';

import { ResponseError } from '~/shared/exceptions/errors/responseError';

const createWrapper = () => {
  const queryClient = new QueryClient();
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'QueryWrapper';
  return Wrapper;
};

describe('useMutation', () => {
  it('should call mutation and onSuccess with queryKey invalidation', async () => {
    const mutateFn = jest.fn(async (data: string) => `mutated-${data}`);
    const onSuccess = jest.fn();

    const { result } = renderHook(
      () =>
        useMutation({
          mutationFn: mutateFn,
          onSuccess,
          queryKey: ['test-key']
        }),
      {
        wrapper: createWrapper()
      }
    );

    await act(async () => {
      await result.current.mutateAsync('input');
    });

    expect(mutateFn).toHaveBeenCalledWith('input');
    expect(onSuccess).toHaveBeenCalled();
  });

  it('should call mutation and invalidates multiple queryKeys', async () => {
    const mutateFn = jest.fn(async (data: string) => `mutated-${data}`);
    const onSuccess = jest.fn();

    const { result } = renderHook(
      () =>
        useMutation({
          mutationFn: mutateFn,
          onSuccess,
          queryKeys: [['key1'], ['key2']]
        }),
      {
        wrapper: createWrapper()
      }
    );

    await act(async () => {
      await result.current.mutateAsync('value');
    });

    expect(mutateFn).toHaveBeenCalledWith('value');
    expect(onSuccess).toHaveBeenCalled();
  });

  it('should handle error correctly', async () => {
    const errorMessage = 'Something failed';
    const mutateFn = jest.fn(async (_: string) => {
      throw new ResponseError({ message: errorMessage, code: '500' });
    });
    const onError = jest.fn();

    const { result } = renderHook(
      () =>
        useMutation({
          mutationFn: mutateFn,
          onError
        }),
      {
        wrapper: createWrapper()
      }
    );

    await act(async () => {
      try {
        await result.current.mutateAsync('data');
      } catch {}
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mutateFn).toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
    expect(result.current.error).toBeInstanceOf(ResponseError);
    expect(result.current.error?.message).toBe(errorMessage);
  });

  it('should not invalidate if no queryKey/queryKeys provided', async () => {
    const mutateFn = jest.fn(async (data: string) => `mutated-${data}`);
    const onSuccess = jest.fn();

    const { result } = renderHook(
      () =>
        useMutation({
          mutationFn: mutateFn,
          onSuccess
        }),
      {
        wrapper: createWrapper()
      }
    );

    await act(async () => {
      await result.current.mutateAsync('data');
    });

    expect(mutateFn).toHaveBeenCalledWith('data');
    expect(onSuccess).toHaveBeenCalled();
  });
});

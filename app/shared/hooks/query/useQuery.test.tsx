import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import useQuery from './useQuery';

import { ResponseError } from '~/shared/exceptions/errors/responseError';

const createWrapper = () => {
  const queryClient = new QueryClient();
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'QueryWrapper';
  return Wrapper;
};

describe('useQuery', () => {
  it('should return data when successful', async () => {
    const queryFn = async () => 'test-data';

    const { result } = renderHook(
      () =>
        useQuery({
          queryKey: ['test-success'],
          queryFn
        }),
      {
        wrapper: createWrapper()
      }
    );

    await waitFor(() => expect(result.current.data).toBe('test-data'));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(typeof result.current.refetch).toBe('function');
  });

  it('should return error when queryFn throws', async () => {
    const errorMessage = 'Failed to fetch';

    const queryFn = async () => {
      throw new ResponseError({
        message: errorMessage,
        code: '500'
      });
    };

    const { result } = renderHook(
      () =>
        useQuery({
          queryKey: ['test-error'],
          queryFn,
          options: {
            retry: false
          }
        }),
      {
        wrapper: createWrapper()
      }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(ResponseError);
    expect(result.current.error?.message).toBe(errorMessage);
    expect(result.current.data).toBeUndefined();
  });

  it('should use initialData correctly', async () => {
    const queryFn = async () => 'final-data';

    const { result } = renderHook(
      () =>
        useQuery({
          queryKey: ['test-initial'],
          queryFn,
          options: {
            initialData: 'initial-data'
          }
        }),
      {
        wrapper: createWrapper()
      }
    );

    expect(result.current.data).toBe('initial-data');
  });

  it('should not call queryFn if enabled is false', async () => {
    const queryFn = jest.fn();

    const { result } = renderHook(
      () =>
        useQuery({
          queryKey: ['disabled-query'],
          queryFn,
          options: {
            enabled: false
          }
        }),
      {
        wrapper: createWrapper()
      }
    );

    expect(queryFn).not.toHaveBeenCalled();
    expect(result.current.isFetching).toBe(false);
  });
});

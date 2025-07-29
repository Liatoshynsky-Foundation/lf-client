import {
  type QueryKey,
  useMutation as useReactMutation,
  type UseMutationOptions,
  type UseMutationResult
} from '@tanstack/react-query';

import { queryClient } from '~/lib/queryClient';
import { type ErrorResponse } from '~/shared/exceptions/errors/responseError';

type InvalidateKeysOptions =
  | {
      queryKey?: QueryKey;
      queryKeys?: never;
    }
  | {
      queryKey?: never;
      queryKeys?: QueryKey[];
    };

type UseMutationProps<TData, TError, TVariables, TContext> = UseMutationOptions<TData, TError, TVariables, TContext> &
  InvalidateKeysOptions;

const useMutation = <TData = unknown, TError = ErrorResponse, TVariables = void, TContext = unknown>({
  queryKey,
  queryKeys,
  ...mutationOptions
}: UseMutationProps<TData, TError, TVariables, TContext>): UseMutationResult<TData, TError, TVariables, TContext> => {
  const mutation = useReactMutation<TData, TError, TVariables, TContext>({
    ...mutationOptions,
    onSuccess: async (...args) => {
      if (mutationOptions.onSuccess) {
        await mutationOptions.onSuccess(...args);
      }
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
      if (queryKeys) {
        await Promise.all(
          queryKeys.map((key) => {
            return queryClient.invalidateQueries({ queryKey: key });
          })
        );
      }
    }
  });

  return mutation;
};

export default useMutation;

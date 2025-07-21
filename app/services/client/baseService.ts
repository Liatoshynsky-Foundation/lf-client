import { errors } from '~/constants/errors';
import type { HttpMethod } from '~/types/types/common.types';

import { type ErrorResponse, ResponseError } from '~/shared/exceptions/errors/responseError';

type RequestParams = {
  data?: unknown;
  headers?: Record<string, string>;
  method: HttpMethod;
  url: string;
  responseType?: 'json' | 'blob';
  timeout?: number;
};

export const baseService = {
  request: async <T = unknown>({
    data,
    headers = {},
    method,
    url,
    responseType = 'json',
    timeout
  }: RequestParams): Promise<T> => {
    const controller = new AbortController();
    const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null;

    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

    let fetchHeaders: HeadersInit;
    if (isFormData) {
      fetchHeaders = headers;
    } else {
      fetchHeaders = {
        'Content-Type': 'application/json',
        ...headers
      };
    }

    let body: BodyInit | undefined;

    if (method !== 'GET' && data) {
      if (isFormData) {
        body = data as FormData;
      } else {
        body = JSON.stringify(data);
      }
    }

    try {
      const response = await fetch(url, {
        method,
        headers: fetchHeaders,
        body,
        signal: controller.signal
      });

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new ResponseError(errorData);
      }

      if (responseType === 'blob') {
        return (await response.blob()) as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ResponseError(errors.REQUEST_TIMEOUT);
      }

      if (error instanceof ResponseError) {
        throw error;
      }

      throw new ResponseError({
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred.'
      });
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  }
};

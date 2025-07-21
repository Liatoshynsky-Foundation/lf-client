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

const getJsonHeaders = (headers: Record<string, string>): HeadersInit => ({
  'Content-Type': 'application/json',
  ...headers
});

const getFormDataHeaders = (headers: Record<string, string>): HeadersInit => headers;

const getHeaders = (headers: Record<string, string>, isFormData: boolean): HeadersInit => {
  return isFormData ? getFormDataHeaders(headers) : getJsonHeaders(headers);
};

const getRequestBody = (method: HttpMethod, data: unknown, isFormData: boolean): BodyInit | undefined => {
  if (method === 'GET' || !data) return undefined;
  return isFormData ? (data as FormData) : (JSON.stringify(data) as BodyInit);
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

    const fetchHeaders: HeadersInit = getHeaders(headers, isFormData);
    const body = getRequestBody(method, data, isFormData);

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

      return responseType === 'blob' ? ((await response.blob()) as T) : ((await response.json()) as T);
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

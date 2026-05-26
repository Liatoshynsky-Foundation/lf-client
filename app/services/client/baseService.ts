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

const getJsonBody = (data: unknown): BodyInit => JSON.stringify(data);
const getFormDataBody = (data: FormData): BodyInit => data;

const getRequestBody = (method: HttpMethod, data: unknown, isFormData: boolean): BodyInit | undefined => {
  if (method === 'GET' || !data) return undefined;
  return isFormData ? getFormDataBody(data as FormData) : getJsonBody(data);
};

const handleHttpError = async (response: Response): Promise<never> => {
  let errorData: ErrorResponse;
  try {
    const text = await response.text();
    errorData = text
      ? (JSON.parse(text) as ErrorResponse)
      : { code: `HTTP_${response.status}`, message: response.statusText || 'Empty error response' };
  } catch {
    // eslint-disable-next-line no-console
    console.error(`[baseService:request] Failed to parse error JSON for status ${response.status}`);
    errorData = {
      code: `HTTP_${response.status}`,
      message: response.statusText || 'Failed to parse error response'
    };
  }
  throw new ResponseError(errorData);
};

const handleFetchError = (error: unknown, url: string): never => {
  if (error instanceof DOMException && error.name === 'AbortError') {
    throw new ResponseError(errors.REQUEST_TIMEOUT);
  }
  if (error instanceof ResponseError) {
    throw error;
  }
  if (error instanceof TypeError) {
    throw new ResponseError({
      code: 'NETWORK_ERROR',
      message: 'Network request failed. Check your internet connection.'
    });
  }
  // eslint-disable-next-line no-console
  console.error(`[baseService:request] Unexpected fetch crash on ${url}:`, error);

  throw new ResponseError({
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred.'
  });
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
    const fetchHeaders = isFormData ? getFormDataHeaders(headers) : getJsonHeaders(headers);
    const body = getRequestBody(method, data, isFormData);

    try {
      const response = await fetch(url, {
        method,
        headers: fetchHeaders,
        body,
        signal: controller.signal
      });

      if (!response.ok) {
        await handleHttpError(response);
      }

      return responseType === 'blob' ? ((await response.blob()) as unknown as T) : ((await response.json()) as T);
    } catch (error) {
      return handleFetchError(error, url);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  }
};

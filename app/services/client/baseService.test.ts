import { errors } from '~/constants/errors';

import { baseService } from '~/services/client/baseService';
import { ResponseError } from '~/shared/exceptions/errors/responseError';

describe('baseService.request', () => {
  let originalFetch: typeof global.fetch;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    originalFetch = global.fetch;
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.useFakeTimers();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should handle finally branch when timeoutId is undefined', async () => {
    global.fetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: true,
          json: async () => ({ data: 'ok' })
        }) as unknown as Response
    );

    const result = await baseService.request({
      method: 'GET',
      url: '/test'
    });

    expect(result).toEqual({ data: 'ok' });
    expect(jest.getTimerCount()).toBe(0);
  });

  it('should handle finally branch when timeoutId exists', async () => {
    global.fetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: true,
          json: async () => ({ data: 'ok' })
        }) as unknown as Response
    );

    await baseService.request({
      method: 'GET',
      url: '/test',
      timeout: 5000
    });

    expect(jest.getTimerCount()).toBe(0);
  });

  it('should throw timeout error and clear timer in finally', async () => {
    const abortError = new DOMException('Aborted', 'AbortError');
    global.fetch = jest.fn().mockImplementation((_, options) => {
      return new Promise((_, reject) => {
        options.signal.addEventListener('abort', () => reject(abortError));
      });
    }) as unknown as typeof global.fetch;

    const promise = baseService.request({
      method: 'GET',
      url: '/timeout',
      timeout: 100
    });

    jest.advanceTimersByTime(150);

    await expect(promise).rejects.toEqual(new ResponseError(errors.REQUEST_TIMEOUT));
    expect(jest.getTimerCount()).toBe(0);
  });

  it('should throw UNKNOWN_ERROR for generic exceptions', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      throw new Error('Unexpected');
    }) as unknown as typeof global.fetch;

    await expect(baseService.request({ method: 'GET', url: '/err', timeout: 100 })).rejects.toEqual(
      new ResponseError({
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred.'
      })
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should handle JSON body', async () => {
    const mockFetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: true,
          json: async () => ({})
        }) as unknown as Response
    );
    global.fetch = mockFetch as unknown as typeof global.fetch;
    await baseService.request({ method: 'POST', url: '/p', data: { x: 1 } });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ body: JSON.stringify({ x: 1 }) })
    );
  });

  it('should handle FormData body', async () => {
    const fd = new FormData();
    const mockFetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: true,
          json: async () => ({})
        }) as unknown as Response
    );
    global.fetch = mockFetch as unknown as typeof global.fetch;
    await baseService.request({ method: 'POST', url: '/u', data: fd });
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ body: fd }));
  });

  it('should handle responseType blob', async () => {
    const b = new Blob();
    global.fetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: true,
          blob: async () => b
        }) as unknown as Response
    );
    const res = await baseService.request({ method: 'GET', url: '/b', responseType: 'blob' });
    expect(res).toBe(b);
  });

  it('should throw known ResponseError', async () => {
    const e = new ResponseError({ code: 'X', message: 'Y' });
    global.fetch = jest.fn().mockImplementation(() => {
      throw e;
    }) as unknown as typeof global.fetch;
    await expect(baseService.request({ method: 'GET', url: '/e' })).rejects.toThrow(e);
  });

  it('should throw error on non-ok response', async () => {
    global.fetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: false,
          status: 404,
          statusText: 'Not Found',
          text: async () => JSON.stringify({ code: 'NOT_FOUND', message: 'err' })
        }) as unknown as Response
    );
    await expect(baseService.request({ method: 'GET', url: '/404' })).rejects.toThrow(ResponseError);
  });

  it('should generate HTTP_ status fallbacks when error payload response text is completely blank', async () => {
    global.fetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: false,
          status: 500,
          statusText: 'Internal Error',
          text: async () => ''
        }) as unknown as Response
    );
    await expect(baseService.request({ method: 'GET', url: '/500' })).rejects.toEqual(
      new ResponseError({
        code: 'HTTP_500',
        message: 'Internal Error'
      })
    );
  });

  it('should handle parse failures cleanly when response text extraction execution crashes inside handleHttpError', async () => {
    global.fetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: false,
          status: 400,
          statusText: 'Bad Request',
          text: async () => {
            throw new Error('Stream crashed');
          }
        }) as unknown as Response
    );

    await expect(baseService.request({ method: 'GET', url: '/400' })).rejects.toEqual(
      new ResponseError({
        code: 'HTTP_400',
        message: 'Bad Request'
      })
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should intercept TypeError fetch failures and throw a dedicated NETWORK_ERROR response exception mapping', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      throw new TypeError('Failed to fetch');
    }) as unknown as typeof global.fetch;

    await expect(baseService.request({ method: 'GET', url: '/network-err' })).rejects.toEqual(
      new ResponseError({
        code: 'NETWORK_ERROR',
        message: 'Network request failed. Check your internet connection.'
      })
    );
  });

  it('should explicitly parse standard json responses when responseType is omitted to satisfy row 96 branch mappings', async () => {
    const mockJsonData = { success: true, payload: 'data' };
    global.fetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: true,
          json: async () => mockJsonData
        }) as unknown as Response
    );

    const result = await baseService.request({
      method: 'GET',
      url: '/json-explicit-branch'
    });

    expect(result).toEqual(mockJsonData);
  });

  it('should parse standard json responses when responseType is explicitly passed as json to cover row 96 completely', async () => {
    const mockJsonData = { success: true, payload: 'explicit-json' };
    global.fetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: true,
          json: async () => mockJsonData
        }) as unknown as Response
    );

    const result = await baseService.request({
      method: 'GET',
      url: '/json-explicit-type',
      responseType: 'json'
    });

    expect(result).toEqual(mockJsonData);
  });

  it('should handle case when response.json throws error to cover the fallback reject branch inside the ternary return statement', async () => {
    global.fetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: true,
          json: async () => {
            throw new Error('Invalid JSON string parsed');
          }
        }) as unknown as Response
    );

    await expect(baseService.request({ method: 'GET', url: '/invalid-json-stream' })).rejects.toEqual(
      new ResponseError({
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred.'
      })
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should handle case when response.blob throws error to cover the alternate fallback reject branch completely', async () => {
    global.fetch = jest.fn().mockImplementation(
      async () =>
        ({
          ok: true,
          blob: async () => {
            throw new Error('Blob stream interrupted');
          }
        }) as unknown as Response
    );

    await expect(
      baseService.request({ method: 'GET', url: '/invalid-blob-stream', responseType: 'blob' })
    ).rejects.toEqual(
      new ResponseError({
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred.'
      })
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

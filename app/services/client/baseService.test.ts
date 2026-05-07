import { errors } from '~/constants/errors';

import { baseService } from '~/services/client/baseService';
import { ResponseError } from '~/shared/exceptions/errors/responseError';

describe('baseService.request', () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    jest.useFakeTimers();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should handle finally branch when timeoutId is undefined', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'ok' })
    } as unknown as Response);

    const result = await baseService.request({
      method: 'GET',
      url: '/test'
    });

    expect(result).toEqual({ data: 'ok' });
    expect(jest.getTimerCount()).toBe(0);
  });

  it('should handle finally branch when timeoutId exists', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'ok' })
    } as unknown as Response);

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
  });

  it('should handle JSON body', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });
    global.fetch = mockFetch as any;
    await baseService.request({ method: 'POST', url: '/p', data: { x: 1 } });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ body: JSON.stringify({ x: 1 }) })
    );
  });

  it('should handle FormData body', async () => {
    const fd = new FormData();
    const mockFetch = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });
    global.fetch = mockFetch as any;
    await baseService.request({ method: 'POST', url: '/u', data: fd });
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ body: fd }));
  });

  it('should handle responseType blob', async () => {
    const b = new Blob();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, blob: () => Promise.resolve(b) }) as any;
    const res = await baseService.request({ method: 'GET', url: '/b', responseType: 'blob' });
    expect(res).toBe(b);
  });

  it('should throw known ResponseError', async () => {
    const e = new ResponseError({ code: 'X', message: 'Y' });
    global.fetch = jest.fn().mockImplementation(() => {
      throw e;
    }) as any;
    await expect(baseService.request({ method: 'GET', url: '/e' })).rejects.toThrow(e);
  });

  it('should throw error on non-ok response', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, json: () => Promise.resolve({ message: 'err' }) }) as any;
    await expect(baseService.request({ method: 'GET', url: '/404' })).rejects.toThrow(ResponseError);
  });
});

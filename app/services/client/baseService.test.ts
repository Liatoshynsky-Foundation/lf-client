import { errors } from '~/constants/errors';

import { baseService } from '~/services/client/baseService';
import { ResponseError } from '~/shared/exceptions/errors/responseError';

describe('baseService.request', () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    jest.useRealTimers();
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it('should return JSON response when successful', async () => {
    const mockData = { message: 'ok' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    } as unknown as Response);

    const result = await baseService.request({
      method: 'GET',
      url: '/test'
    });

    expect(result).toEqual(mockData);
  });

  it('should return blob response when responseType is blob', async () => {
    const mockBlob = new Blob(['data']);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(mockBlob)
    } as unknown as Response);

    const result = await baseService.request({
      method: 'GET',
      url: '/test',
      responseType: 'blob'
    });

    expect(result).toEqual(mockBlob);
  });

  it('should throw ResponseError on non-ok response', async () => {
    const errorResponse = {
      code: 'SOME_ERROR',
      message: 'Something went wrong'
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(errorResponse)
    } as unknown as Response);

    await expect(baseService.request({ method: 'GET', url: '/test' })).rejects.toThrow(ResponseError);
  });

  it('should throw timeout error if request takes too long', async () => {
    jest.useFakeTimers();

    const abortError = new DOMException('Aborted', 'AbortError');

    const rejectLater = (_resolve: unknown, reject: (reason?: unknown) => void) => {
      setTimeout(() => {
        reject(abortError);
      }, 100);
    };

    const mockTimeoutFetch = (): Promise<Response> => new Promise(rejectLater);

    global.fetch = jest.fn(mockTimeoutFetch) as unknown as typeof global.fetch;

    const promise = baseService.request({
      method: 'GET',
      url: '/timeout',
      timeout: 100
    });

    jest.advanceTimersByTime(200);

    await expect(promise).rejects.toEqual(new ResponseError(errors.REQUEST_TIMEOUT));
  });

  it('should throw known ResponseError instance as is', async () => {
    const knownError = new ResponseError({ code: 'TEST_CODE', message: 'Known' });

    global.fetch = jest.fn().mockImplementation(() => {
      throw knownError;
    }) as unknown as typeof global.fetch;

    await expect(baseService.request({ method: 'GET', url: '/test' })).rejects.toThrow(knownError);
  });

  it('should throw generic error as UNKNOWN_ERROR if not a ResponseError', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      throw new Error('Unexpected');
    }) as unknown as typeof global.fetch;

    await expect(baseService.request({ method: 'GET', url: '/test' })).rejects.toEqual(
      new ResponseError({
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred.'
      })
    );
  });

  it('should set JSON body for non-GET requests with non-FormData data', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    } as unknown as Response);

    global.fetch = mockFetch;

    await baseService.request({
      method: 'POST',
      url: '/submit',
      data: { name: 'Test' }
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ name: 'Test' }),
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
  });

  it('should set FormData body and skip Content-Type header', async () => {
    const formData = new FormData();
    formData.append('file', new Blob(['test']));

    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    } as unknown as Response);

    global.fetch = mockFetch;

    await baseService.request({
      method: 'POST',
      url: '/upload',
      data: formData
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: formData,
        headers: {}
      })
    );
  });
});

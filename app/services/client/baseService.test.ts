import { errors } from '~/constants/errors';

import { baseService } from '~/services/client/baseService';
import { ResponseError } from '~/shared/exceptions/errors/responseError';

describe('baseService.request', () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it('returns JSON response when successful', async () => {
    const mockData = { message: 'ok' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const result = await baseService.request({
      method: 'GET',
      url: '/test'
    });

    expect(result).toEqual(mockData);
  });

  it('returns blob response when responseType is blob', async () => {
    const mockBlob = new Blob(['data']);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(mockBlob)
    });

    const result = await baseService.request({
      method: 'GET',
      url: '/test',
      responseType: 'blob'
    });

    expect(result).toEqual(mockBlob);
  });

  it('throws ResponseError on non-ok response', async () => {
    const errorResponse = {
      code: 'SOME_ERROR',
      message: 'Something went wrong'
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(errorResponse)
    });

    await expect(baseService.request({ method: 'GET', url: '/test' })).rejects.toThrow(ResponseError);
  });

  it('throws timeout error if request takes too long', async () => {
    jest.useFakeTimers();

    const abortError = new DOMException('Aborted', 'AbortError');

    global.fetch = jest.fn(
      () =>
        new Promise((_resolve, reject) => {
          setTimeout(() => reject(abortError), 100);
        })
    );

    const promise = baseService.request({
      method: 'GET',
      url: '/timeout',
      timeout: 100
    });

    jest.advanceTimersByTime(200);
    await expect(promise).rejects.toEqual(new ResponseError(errors.REQUEST_TIMEOUT));
  });

  it('throws known ResponseError instance as is', async () => {
    const knownError = new ResponseError({ code: 'TEST_CODE', message: 'Known' });

    global.fetch = jest.fn().mockImplementation(() => {
      throw knownError;
    });

    await expect(baseService.request({ method: 'GET', url: '/test' })).rejects.toThrow(knownError);
  });

  it('throws generic error as UNKNOWN_ERROR if not a ResponseError', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      throw new Error('Unexpected');
    });

    await expect(baseService.request({ method: 'GET', url: '/test' })).rejects.toEqual(
      new ResponseError({
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred.'
      })
    );
  });

  it('sets JSON body for non-GET requests with non-FormData data', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });

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

  it('sets FormData body and skips Content-Type header', async () => {
    const formData = new FormData();
    formData.append('file', new Blob(['test']));

    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });

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

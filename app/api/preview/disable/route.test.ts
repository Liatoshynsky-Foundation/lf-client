import { draftMode } from 'next/headers';

import { GET } from './route';
import { errors } from '~/constants/errors';

const BASE_URL = 'http://localhost';
const ENDPOINT_URL = `${BASE_URL}/api/preview/disable`;

jest.mock('next/headers', () => ({
  draftMode: jest.fn()
}));

jest.mock('~/config', () => ({
  baseUrl: 'http://localhost'
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({
      status: init?.status ?? 200,
      json: async () => body
    })),
    redirect: jest.fn((url: URL) => ({
      status: 307,
      headers: {
        get: (key: string) => (key === 'location' ? url.toString() : null)
      }
    }))
  }
}));

describe('GET /api/preview/disable', () => {
  const disableMock = jest.fn();
  const mockRequest = (url: string) => ({ url }) as Request;

  beforeEach(() => {
    jest.clearAllMocks();
    (draftMode as jest.Mock).mockResolvedValue({
      disable: disableMock
    });
  });

  it('should disable Draft Mode and redirect to the requested page', async () => {
    const request = mockRequest(`${ENDPOINT_URL}?returnTo=%2Fuk`);
    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(`${BASE_URL}/uk`);
    expect(draftMode).toHaveBeenCalledTimes(1);
    expect(disableMock).toHaveBeenCalledTimes(1);
  });

  it('should redirect to the root page when returnTo is missing', async () => {
    const request = mockRequest(ENDPOINT_URL);
    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(`${BASE_URL}/`);
    expect(disableMock).toHaveBeenCalledTimes(1);
  });

  it.each(['https://evil.com', '//evil.com', 'uk/news', '/\\evil.com'])(
    'should reject invalid returnTo: %s',
    async (returnTo) => {
      const request = mockRequest(`${ENDPOINT_URL}?returnTo=${encodeURIComponent(returnTo)}`);
      const response = await GET(request);

      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({
        success: false,
        error: errors.INVALID_RETURN_URL
      });
      expect(draftMode).not.toHaveBeenCalled();
      expect(disableMock).not.toHaveBeenCalled();
    }
  );
});

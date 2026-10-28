/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import middleware from './middleware';

jest.mock('next-intl/middleware', () => ({
  __esModule: true,
  default: jest.fn(() => jest.fn(() => new Response('next-intl middleware')))
}));

jest.mock('~/i18n/routing', () => ({
  routing: {}
}));

const createMiddlewareMock = createMiddleware as jest.Mock;
const intlMiddlewareMock = createMiddlewareMock.mock.results[0]?.value as jest.Mock;

const DRAFT_MODE_COOKIE = '__prerender_bypass';
const BASE_URL = 'http://localhost:3000';

function createRequest(path: string, isDraftModeEnabled = false): NextRequest {
  const headers = new Headers();
  if (isDraftModeEnabled) {
    headers.set('cookie', `${DRAFT_MODE_COOKIE}=preview-token`);
  }

  return new NextRequest(new URL(path, BASE_URL), { headers });
}

describe('middleware Draft Mode handling', () => {
  beforeEach(() => {
    intlMiddlewareMock.mockClear();
  });

  it('should pass the request to next-intl when draftId is present', () => {
    const request = createRequest('/uk/publications?draftId=test-draft-id', true);
    const response = middleware(request);

    expect(intlMiddlewareMock).toHaveBeenCalledWith(request);
    expect(response?.headers.get('location')).toBeNull();
  });

  it('should redirect to disable Preview when draftId is absent', () => {
    const request = createRequest('/uk/about', true);
    const response = middleware(request);
    const location = response?.headers.get('location');

    expect(response?.status).toBe(307);
    expect(intlMiddlewareMock).not.toHaveBeenCalled();
    expect(location).not.toBeNull();

    const redirectUrl = new URL(location as string);

    expect(redirectUrl.pathname).toBe('/api/preview/disable');
    expect(redirectUrl.searchParams.get('returnTo')).toBe('/uk/about');
  });

  it('should preserve the original path and query parameters in the redirect', () => {
    const request = createRequest('/uk/publications?category=events&page=2', true);
    const response = middleware(request);
    const location = response?.headers.get('location');

    expect(location).not.toBeNull();

    const redirectUrl = new URL(location as string);
    expect(redirectUrl.pathname).toBe('/api/preview/disable');
    expect(redirectUrl.searchParams.get('returnTo')).toBe('/uk/publications?category=events&page=2');
  });

  it('should continue through next-intl when Draft Mode is disabled', () => {
    const request = createRequest('/uk/about');
    const response = middleware(request);

    expect(intlMiddlewareMock).toHaveBeenCalledWith(request);
    expect(response?.status).toBe(200);
    expect(response?.headers.get('location')).toBeNull();
  });
});

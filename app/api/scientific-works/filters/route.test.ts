(global as any).Request = class {};
(global as any).Response = class {};
jest.mock(
  'next/server',
  () => ({
    NextResponse: {
      json: jest.fn((data, init) => ({
        json: jest.fn().mockResolvedValue(data),
        status: init?.status ?? 200
      }))
    },
    NextRequest: class {}
  }),
  { virtual: true }
);
jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: jest.fn()
  }))
}));
import { NextRequest } from 'next/server';

import { GET } from './route';
import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import { parseLocale } from '~/lib/utils/translation/parseLocale';

jest.mock('~/lib/utils/translation/parseLocale');

describe('Scientific Works Filters API', () => {
  it('should return yearRange and authors', async () => {
    const mockService = {
      getScientificWorksYearRange: jest.fn().mockResolvedValue([2000, 2025]),
      getAllAuthors: jest.fn().mockResolvedValue(['Author A'])
    };
    (createRequestContainer as jest.Mock).mockReturnValue({ resolve: () => mockService });
    (parseLocale as jest.Mock).mockReturnValue('uk');

    const req = { nextUrl: { searchParams: new URLSearchParams() } } as unknown as NextRequest;
    const res = await GET(req);
    const data = await res.json();

    expect(data).toEqual({ yearRange: [2000, 2025], authors: ['Author A'] });
  });
  it('should return 500 when service throws an error', async () => {
    const mockService = {
      getScientificWorksYearRange: jest.fn().mockRejectedValue(new Error('DB Error')),
      getAllAuthors: jest.fn()
    };

    (createRequestContainer as jest.Mock).mockReturnValue({
      resolve: () => mockService
    });

    const req = { nextUrl: { searchParams: new URLSearchParams() } } as any;

    const res = await GET(req);

    expect(res.status).toBe(500);

    const data = await res.json();
    expect(data).toEqual(errors.FILTERS_FETCH_FAILED);
  });
});

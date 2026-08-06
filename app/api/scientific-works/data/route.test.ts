import { NextRequest } from 'next/server';
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
import { GET } from './route';

import { createRequestContainer } from '~/di/container';
import { parseFilters } from '~/lib/utils/filters/parseFilters';
import { parseLocale } from '~/lib/utils/translation/parseLocale';

jest.mock('~/lib/utils/translation/parseLocale');
jest.mock('~/lib/utils/filters/parseFilters');

describe('Scientific Works Data API', () => {
  const mockService = { getAllScientificWorks: jest.fn() };
  beforeEach(() => {
    (createRequestContainer as jest.Mock).mockReturnValue({ resolve: () => mockService });
  });
  it('should handle missing years in filters by defaulting to null', async () => {
    (parseLocale as jest.Mock).mockReturnValue('uk');
    (parseFilters as jest.Mock).mockReturnValue({ search: 'test', years: undefined });
    mockService.getAllScientificWorks.mockResolvedValue(['work1']);

    const req = { nextUrl: { searchParams: new URLSearchParams() } } as any;
    const res = await GET(req);

    expect(mockService.getAllScientificWorks).toHaveBeenCalledWith('uk', {
      search: 'test',
      author: undefined,
      yearFrom: null,
      yearTo: null
    });
    expect(res.status).toBe(200);
  });
  it('should return 200 and data on success', async () => {
    (parseLocale as jest.Mock).mockReturnValue('uk');
    (parseFilters as jest.Mock).mockReturnValue({ search: 'test', years: { min: 2020, max: 2024 } });
    mockService.getAllScientificWorks.mockResolvedValue(['work1']);

    const req = { nextUrl: { searchParams: new URLSearchParams() } } as any;
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(['work1']);
  });

  it('should return 500 on service error', async () => {
    mockService.getAllScientificWorks.mockRejectedValue(new Error());
    const req = { nextUrl: { searchParams: new URLSearchParams() } } as unknown as NextRequest;

    const res = await GET(req);
    expect(res.status).toBe(500);
  });
});

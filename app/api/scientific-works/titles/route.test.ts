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

describe('Scientific Works Titles API', () => {
  const mockService = { getAllScientificTitles: jest.fn() };
  beforeEach(() => {
    (createRequestContainer as jest.Mock).mockReturnValue({ resolve: () => mockService });
  });
  it('should return titles list', async () => {
    (parseLocale as jest.Mock).mockReturnValue('uk');
    (parseFilters as jest.Mock).mockReturnValue({ search: 'test', years: { min: 2020, max: 2021 } });
    mockService.getAllScientificTitles.mockResolvedValue(['Title 1']);

    const req = { nextUrl: { searchParams: new URLSearchParams() } } as any;
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ titles: ['Title 1'] });
  });
  it('should return 500 on service error', async () => {
    mockService.getAllScientificTitles.mockRejectedValue(new Error());
    const req = { nextUrl: { searchParams: new URLSearchParams() } } as any;

    const res = await GET(req);
    expect(res.status).toBe(500);
  });
});

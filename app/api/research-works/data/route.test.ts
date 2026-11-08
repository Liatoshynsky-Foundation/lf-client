import '../researchWorksRouteMocks';

import { GET } from './route';
import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import { parseFilters } from '~/lib/utils/filters/parseFilters';
import logger from '~/middleware/logger/logger';

jest.mock('~/lib/utils/filters/parseFilters', () => ({
  parseFilters: jest.fn()
}));

describe('GET /api/research-works/data', () => {
  const mockGetAllResearchWorks = jest.fn();

  const mockResolve = jest.fn().mockReturnValue({
    getAllResearchWorks: mockGetAllResearchWorks
  });

  const mockRequest = (url: string) =>
    ({
      nextUrl: new URL(url)
    }) as Parameters<typeof GET>[0];

  beforeEach(() => {
    jest.clearAllMocks();

    (createRequestContainer as jest.Mock).mockReturnValue({
      resolve: mockResolve
    });
  });

  it('should return research works', async () => {
    const researchWorks = [{ id: '1', name: 'Research work' }];
    (parseFilters as jest.Mock).mockReturnValue({
      search: undefined,
      years: {
        min: 2000,
        max: 2020
      }
    });
    mockGetAllResearchWorks.mockResolvedValue(researchWorks);
    const response = await GET(mockRequest('http://localhost/api/research-works/data'));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(researchWorks);
    expect(mockGetAllResearchWorks).toHaveBeenCalledWith({
      search: undefined,
      yearFrom: 2000,
      yearTo: 2020
    });
  });

  it('should pass null when year filters are missing', async () => {
    (parseFilters as jest.Mock).mockReturnValue({
      search: undefined,
      years: undefined
    });
    mockGetAllResearchWorks.mockResolvedValue([]);
    const response = await GET(mockRequest('http://localhost/api/research-works/data'));

    expect(response.status).toBe(200);
    expect(mockGetAllResearchWorks).toHaveBeenCalledWith({
      search: undefined,
      yearFrom: null,
      yearTo: null
    });
  });

  it('should pass search and year filters to service', async () => {
    (parseFilters as jest.Mock).mockReturnValue({
      search: 'Ukrainian music',
      years: {
        min: 1990,
        max: 2020
      }
    });
    mockGetAllResearchWorks.mockResolvedValue([]);
    const response = await GET(mockRequest('http://localhost/api/research-works/data?search=Ukrainian%20music'));

    expect(response.status).toBe(200);
    expect(mockGetAllResearchWorks).toHaveBeenCalledWith({
      search: 'Ukrainian music',
      yearFrom: 1990,
      yearTo: 2020
    });
  });

  it('should pass searchParams to parseFilters', async () => {
    (parseFilters as jest.Mock).mockReturnValue({
      search: undefined,
      years: undefined
    });
    mockGetAllResearchWorks.mockResolvedValue([]);
    const request = mockRequest('http://localhost/api/research-works/data?search=test');
    await GET(request);

    expect(parseFilters).toHaveBeenCalledWith(request.nextUrl.searchParams);
  });

  it('should return 500 and log error when service fails', async () => {
    const error = new Error('Database error');
    (parseFilters as jest.Mock).mockReturnValue({
      search: undefined,
      years: undefined
    });
    mockGetAllResearchWorks.mockRejectedValue(error);
    const response = await GET(mockRequest('http://localhost/api/research-works/data'));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: errors.SERVER_ERROR.message
    });
    expect(logger.error).toHaveBeenCalledWith('[API:GET:research-works] Failed to fetch research works', error);
  });
});

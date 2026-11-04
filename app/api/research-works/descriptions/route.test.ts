import '../researchWorksRouteMocks';

import { GET } from './route';
import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import { parseFilters } from '~/lib/utils/filters/parseFilters';
import logger from '~/middleware/logger/logger';

jest.mock('~/lib/utils/filters/parseFilters', () => ({
  parseFilters: jest.fn()
}));

describe('GET /api/research-works/descriptions', () => {
  const mockGetAllBibliographicDescriptions = jest.fn();
  const mockResolve = jest.fn().mockReturnValue({
    getAllBibliographicDescriptions: mockGetAllBibliographicDescriptions
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

  it('should return bibliographic descriptions', async () => {
    const descriptions = ['Description 1', 'Description 2'];
    (parseFilters as jest.Mock).mockReturnValue({
      search: undefined,
      author: undefined,
      years: {
        min: 2000,
        max: 2020
      }
    });
    mockGetAllBibliographicDescriptions.mockResolvedValue(descriptions);
    const response = await GET(mockRequest('http://localhost/api/research-works/descriptions'));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ descriptions });
    expect(mockGetAllBibliographicDescriptions).toHaveBeenCalledWith({
      search: undefined,
      author: undefined,
      yearFrom: 2000,
      yearTo: 2020
    });
  });

  it('should pass search, author and year filters to service', async () => {
    (parseFilters as jest.Mock).mockReturnValue({
      search: 'Ukrainian music',
      author: ['John Doe'],
      years: {
        min: 1990,
        max: 2020
      }
    });
    mockGetAllBibliographicDescriptions.mockResolvedValue([]);
    const response = await GET(mockRequest('http://localhost/api/research-works/descriptions'));

    expect(response.status).toBe(200);
    expect(mockGetAllBibliographicDescriptions).toHaveBeenCalledWith({
      search: 'Ukrainian music',
      author: ['John Doe'],
      yearFrom: 1990,
      yearTo: 2020
    });
  });

  it('should return 500 and log error when service fails', async () => {
    const error = new Error('Database error');
    (parseFilters as jest.Mock).mockReturnValue({
      search: undefined,
      author: undefined,
      years: undefined
    });
    mockGetAllBibliographicDescriptions.mockRejectedValue(error);
    const response = await GET(mockRequest('http://localhost/api/research-works/descriptions'));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: errors.FILTERS_FETCH_FAILED.message
    });
    expect(logger.error).toHaveBeenCalledWith(
      '[API:GET:research-works:titles] Failed to fetch research works titles',
      error
    );
  });
});

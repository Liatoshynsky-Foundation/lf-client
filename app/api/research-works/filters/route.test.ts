import '../researchWorksRouteMocks';

import { GET } from './route';
import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import logger from '~/middleware/logger/logger';

describe('GET /api/research-works/filters', () => {
  const mockGetResearchWorksYearRange = jest.fn();
  const mockGetAllAuthors = jest.fn();
  const mockResolve = jest.fn().mockReturnValue({
    getResearchWorksYearRange: mockGetResearchWorksYearRange,
    getAllAuthors: mockGetAllAuthors
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (createRequestContainer as jest.Mock).mockReturnValue({
      resolve: mockResolve
    });
  });

  it('should return research works year range and authors', async () => {
    const yearRange = {
      minYear: 1990,
      maxYear: 2020
    };
    const authors = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'John Doe' }
    ];
    mockGetResearchWorksYearRange.mockResolvedValue(yearRange);
    mockGetAllAuthors.mockResolvedValue(authors);
    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      yearRange,
      authors
    });
    expect(mockGetResearchWorksYearRange).toHaveBeenCalledTimes(1);
    expect(mockGetAllAuthors).toHaveBeenCalledTimes(1);
  });

  it('should return 500 and log error when service fails', async () => {
    const error = new Error('Database error');
    mockGetResearchWorksYearRange.mockRejectedValue(error);
    mockGetAllAuthors.mockResolvedValue([]);
    const response = await GET();

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      code: errors.FILTERS_FETCH_FAILED.code,
      message: errors.FILTERS_FETCH_FAILED.message
    });
    expect(logger.error).toHaveBeenCalledWith(
      '[API:GET:research-works:filters] Failed to fetch research works filters',
      error
    );
  });
});

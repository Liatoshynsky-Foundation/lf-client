import '../researchWorksRouteMocks';

import { GET } from './route';
import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import logger from '~/middleware/logger/logger';

describe('GET /api/research-works/filters', () => {
  const mockGetResearchWorksYearRange = jest.fn();
  const mockResolve = jest.fn().mockReturnValue({
    getResearchWorksYearRange: mockGetResearchWorksYearRange
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (createRequestContainer as jest.Mock).mockReturnValue({
      resolve: mockResolve
    });
  });

  it('should return research works year range without authors', async () => {
    const yearRange = {
      minYear: 1990,
      maxYear: 2020
    };
    mockGetResearchWorksYearRange.mockResolvedValue(yearRange);
    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ yearRange });
    expect(mockGetResearchWorksYearRange).toHaveBeenCalledTimes(1);
  });

  it('should return 500 and log error when service fails', async () => {
    const error = new Error('Database error');
    mockGetResearchWorksYearRange.mockRejectedValue(error);
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

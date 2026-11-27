const mockGetPublicTabs = jest.fn();

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body: unknown) => ({ body }))
  }
}));

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: jest.fn(() => ({ getPublicTabs: mockGetPublicTabs }))
  }))
}));

import { NextResponse } from 'next/server';

import { GET } from './route';

describe('GET /api/payment-details', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns the public payment details tabs', async () => {
    const tabs = [{ id: 'tab-uah', name: 'UAH', content: { type: 'doc' }, order: 0 }];
    mockGetPublicTabs.mockResolvedValue(tabs);

    await GET();

    expect(mockGetPublicTabs).toHaveBeenCalledTimes(1);
    expect(NextResponse.json).toHaveBeenCalledWith({ tabs });
  });

  it('returns an empty list when there are no public tabs', async () => {
    mockGetPublicTabs.mockResolvedValue([]);

    await GET();

    expect(NextResponse.json).toHaveBeenCalledWith({ tabs: [] });
  });
});

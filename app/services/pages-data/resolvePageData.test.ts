import { draftMode } from 'next/headers';

import { resolvePageData } from './resolvePageData';

import { createRequestContainer } from '~/di/container';

jest.mock('next/headers', () => ({
  draftMode: jest.fn()
}));

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn()
}));

describe('resolvePageData', () => {
  const mockDraftService = { getPageData: jest.fn() };
  const mockProdService = { getPageData: jest.fn() };

  const mockContainer = {
    resolve: jest.fn((key: string) => {
      if (key === 'draftPagesDataService') return mockDraftService;
      if (key === 'pagesDataService') return mockProdService;
      throw new Error(`Unknown service: ${key}`);
    })
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createRequestContainer as jest.Mock).mockReturnValue(mockContainer);
  });

  it('should use draftPagesDataService when draftMode is enabled', async () => {
    (draftMode as jest.Mock).mockResolvedValue({ isEnabled: true });
    mockDraftService.getPageData.mockResolvedValue({ some: 'data' });

    const result = await resolvePageData('about-us', 'uk');

    expect(mockContainer.resolve).toHaveBeenCalledWith('draftPagesDataService');
    expect(mockDraftService.getPageData).toHaveBeenCalledWith('about-us', 'uk', undefined);
    expect(mockProdService.getPageData).not.toHaveBeenCalled();
    expect(result).toEqual({ some: 'data' });
  });

  it('should use pagesDataService when draftMode is disabled', async () => {
    (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
    mockProdService.getPageData.mockResolvedValue({ other: 'data' });

    const result = await resolvePageData('about-us', 'uk');

    expect(mockContainer.resolve).toHaveBeenCalledWith('pagesDataService');
    expect(mockProdService.getPageData).toHaveBeenCalledWith('about-us', 'uk');
    expect(mockDraftService.getPageData).not.toHaveBeenCalled();
    expect(result).toEqual({ other: 'data' });
  });

  it('should pass draftId to draftPagesDataService when draftMode is enabled', async () => {
    (draftMode as jest.Mock).mockResolvedValue({ isEnabled: true });
    mockDraftService.getPageData.mockResolvedValue({ some: 'draft data' });
    const draftId = '6a58788c165dd8fd57f6b3e2';

    const result = await resolvePageData('about-us', 'uk', draftId);

    expect(mockContainer.resolve).toHaveBeenCalledWith('draftPagesDataService');
    expect(mockDraftService.getPageData).toHaveBeenCalledWith('about-us', 'uk', draftId);
    expect(mockProdService.getPageData).not.toHaveBeenCalled();
    expect(result).toEqual({ some: 'draft data' });
  });
});

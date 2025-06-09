import { Locale } from 'next-intl';

import { createHeaderService } from '~/services/headerService';

jest.mock('~/db/connect', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined)
}));

describe('headerService', () => {
  const mockNavigationData = [
    {
      title: 'Main',
      links: [
        { label: 'Home', href: '/', visibility: 'true' },
        { label: 'About', href: '/about', visibility: 'true' }
      ]
    }
  ];

  const mockSupportButtonData = {
    supportButtonLink: 'https://donate.com'
  };

  const brandingRepositoryMock = {
    getSupportButtonLink: jest.fn().mockResolvedValue(mockSupportButtonData),
    getBrandingInfo: jest.fn()
  };

  const navigationRepositoryMock = {
    getNavigation: jest.fn().mockResolvedValue(mockNavigationData)
  };

  const headerService = createHeaderService({
    brandingRepository: brandingRepositoryMock,
    navigationRepository: navigationRepositoryMock
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return header data correctly', async () => {
    const result = await headerService.getHeaderData('en' as Locale);

    expect(result).toEqual({
      navigation: mockNavigationData,
      supportButtonLink: mockSupportButtonData.supportButtonLink
    });

    expect(brandingRepositoryMock.getSupportButtonLink).toHaveBeenCalled();
    expect(navigationRepositoryMock.getNavigation).toHaveBeenCalledWith('en');
  });
});

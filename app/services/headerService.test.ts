import { Locale } from 'next-intl';

import { createHeaderService } from '~/services/headerService';

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

  const foundationInfoRepositoryMock = {
    getSupportButtonLink: jest.fn().mockResolvedValue(mockSupportButtonData)
  };

  const navigationRepositoryMock = {
    getNavigation: jest.fn().mockResolvedValue(mockNavigationData)
  };

  const headerService = createHeaderService({
    foundationInfoRepository: foundationInfoRepositoryMock,
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

    expect(foundationInfoRepositoryMock.getSupportButtonLink).toHaveBeenCalled();
    expect(navigationRepositoryMock.getNavigation).toHaveBeenCalledWith('en');
  });
});

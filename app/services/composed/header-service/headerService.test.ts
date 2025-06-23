import { Locale } from 'next-intl';

import { createHeaderService } from '~/services/composed/header-service/headerService';

describe('headerService (composed)', () => {
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

  const foundationInfoServiceMock = {
    getSupportButtonLink: jest.fn().mockResolvedValue(mockSupportButtonData)
  };

  const navigationServiceMock = {
    getNavigation: jest.fn().mockResolvedValue(mockNavigationData)
  };

  const headerService = createHeaderService({
    foundationInfoService: foundationInfoServiceMock,
    navigationService: navigationServiceMock
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

    expect(navigationServiceMock.getNavigation).toHaveBeenCalledWith('en');
    expect(foundationInfoServiceMock.getSupportButtonLink).toHaveBeenCalled();
  });
});

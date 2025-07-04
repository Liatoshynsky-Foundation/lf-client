import type { Locale } from 'next-intl';

import { createHeaderService } from '~/services/composed/header-service/headerService';

describe('headerService (composed)', () => {
  const mockNavigationRaw = [
    {
      title: { uk: 'Головна', en: 'Main' },
      links: [
        { label: { uk: 'Дім', en: 'Home' }, href: '/', visibility: true },
        { label: { uk: 'Про нас', en: 'About' }, href: '/about', visibility: true }
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
    getNavigation: jest.fn().mockResolvedValue(mockNavigationRaw)
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
      navigation: [
        {
          title: 'Main',
          links: [
            { label: 'Home', href: '/', visibility: true },
            { label: 'About', href: '/about', visibility: true }
          ]
        }
      ],
      supportButtonLink: mockSupportButtonData.supportButtonLink
    });

    expect(navigationServiceMock.getNavigation).toHaveBeenCalled();
    expect(foundationInfoServiceMock.getSupportButtonLink).toHaveBeenCalled();
  });

  it('should return empty string as supportButtonLink if undefined', async () => {
    foundationInfoServiceMock.getSupportButtonLink.mockResolvedValueOnce({ supportButtonLink: undefined });

    const result = await headerService.getHeaderData('en' as Locale);

    expect(result.supportButtonLink).toBe('');
  });
});

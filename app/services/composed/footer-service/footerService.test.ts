import type { Locale } from 'next-intl';

import { createFooterService } from '~/services/composed/footer-service/footerService';

describe('footerService (composed)', () => {
  const mockContactInfo = {
    email: 'test@example.com',
    phone: '+380123456789',
    socialLinks: [
      {
        platform: 'Instagram',
        link: 'https://instagram.com/fakefoundation',
        icon: 'instagram.svg'
      },
      {
        platform: 'Facebook',
        link: 'https://facebook.com/fakefoundation',
        icon: 'facebook.svg'
      }
    ]
  };

  const mockBrandingInfoRaw = {
    foundationName: { uk: 'Фундація', en: 'Foundation Name' }
  };

  const mockSupportButtonData = {
    supportButtonLink: 'https://donate.com'
  };

  const mockPublicInfoRaw = {
    copyright: { uk: '© 2025 Фундація', en: '© 2025 Foundation' },
    links: [
      { label: { uk: 'Політика', en: 'Privacy Policy' }, href: '/privacy' },
      { label: { uk: 'Умови', en: 'Terms of Use' }, href: '/terms' }
    ]
  };

  const mockNavigationRaw = [
    {
      title: { uk: 'Головна', en: 'Main' },
      links: [
        { label: { uk: 'Дім', en: 'Home' }, href: '/', visibility: true },
        { label: { uk: 'Про нас', en: 'About' }, href: '/about', visibility: true }
      ]
    }
  ];

  const foundationInfoServiceMock = {
    getContactInfo: jest.fn().mockResolvedValue(mockContactInfo),
    getBrandingInfo: jest.fn().mockResolvedValue(mockBrandingInfoRaw),
    getSupportButtonLink: jest.fn().mockResolvedValue(mockSupportButtonData),
    getPublicInfo: jest.fn().mockResolvedValue(mockPublicInfoRaw)
  };

  const navigationServiceMock = {
    getNavigation: jest.fn().mockResolvedValue(mockNavigationRaw)
  };

  const footerService = createFooterService({
    foundationInfoService: foundationInfoServiceMock,
    navigationService: navigationServiceMock
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return full footer data correctly', async () => {
    const result = await footerService.getFooterData('en' as Locale);

    expect(result).toEqual({
      contacts: {
        foundationName: 'Foundation Name',
        email: mockContactInfo.email,
        phone: mockContactInfo.phone
      },
      socialLinks: mockContactInfo.socialLinks,
      supportButtonLink: mockSupportButtonData.supportButtonLink,
      publicInfo: {
        text: '© 2025 Foundation',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Use', href: '/terms' }
        ]
      },
      navigation: [
        {
          title: 'Main',
          links: [
            { label: 'Home', href: '/', visibility: true },
            { label: 'About', href: '/about', visibility: true }
          ]
        }
      ]
    });

    expect(foundationInfoServiceMock.getContactInfo).toHaveBeenCalled();
    expect(foundationInfoServiceMock.getBrandingInfo).toHaveBeenCalled();
    expect(foundationInfoServiceMock.getSupportButtonLink).toHaveBeenCalled();
    expect(foundationInfoServiceMock.getPublicInfo).toHaveBeenCalled();
    expect(navigationServiceMock.getNavigation).toHaveBeenCalled();
  });

  it('should return empty socialLinks if not provided', async () => {
    foundationInfoServiceMock.getContactInfo.mockResolvedValueOnce({
      ...mockContactInfo,
      socialLinks: undefined
    });

    const result = await footerService.getFooterData('en' as Locale);

    expect(result.socialLinks).toEqual([]);
  });
});

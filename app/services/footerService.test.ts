import { Locale } from 'next-intl';

import { createFooterService } from '~/services/footerService';

describe('footerService with navigationRepository', () => {
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

  const mockFoundationNameData = {
    foundationName: 'Foundation Name'
  };

  const mockSupportButtonData = {
    supportButtonLink: 'https://donate.com'
  };

  const mockPublicInfo = {
    copyright: '© 2025 Foundation',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' }
    ]
  };

  const mockNavigationData = [
    {
      title: 'Main',
      links: [
        { label: 'Home', href: '/', visibility: 'true' },
        { label: 'About', href: '/about', visibility: 'true' }
      ]
    }
  ];

  const foundationInfoRepositoryMock = {
    getContactInfo: jest.fn().mockResolvedValue(mockContactInfo),
    getBrandingInfo: jest.fn().mockResolvedValue(mockFoundationNameData),
    getSupportButtonLink: jest.fn().mockResolvedValue(mockSupportButtonData),
    getPublicInfo: jest.fn().mockResolvedValue(mockPublicInfo)
  };

  const navigationRepositoryMock = {
    getNavigation: jest.fn().mockResolvedValue(mockNavigationData)
  };

  const mockDeps = {
    foundationInfoRepository: foundationInfoRepositoryMock,
    navigationRepository: navigationRepositoryMock
  };

  const footerService = createFooterService(mockDeps);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return full footer data correctly', async () => {
    const result = await footerService.getFooterData('en' as Locale);

    expect(result).toEqual({
      contacts: {
        foundationName: mockFoundationNameData.foundationName,
        email: mockContactInfo.email,
        phone: mockContactInfo.phone
      },
      socialLinks: mockContactInfo.socialLinks,
      supportButtonLink: mockSupportButtonData.supportButtonLink,
      publicInfo: {
        text: mockPublicInfo.copyright,
        links: mockPublicInfo.links
      },
      navigation: mockNavigationData
    });
  });

  it('should return empty socialLinks if not provided', async () => {
    foundationInfoRepositoryMock.getContactInfo.mockResolvedValueOnce({
      ...mockContactInfo,
      socialLinks: undefined
    });

    const result = await footerService.getFooterData('en' as Locale);

    expect(result.socialLinks).toEqual([]);
  });
});

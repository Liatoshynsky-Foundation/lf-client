import { Locale } from 'next-intl';

import type { FooterServiceDeps } from '~/types/types/foundationInfo.type';

import { createFooterService } from '~/services/footerService';

jest.mock('~/db/connect', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined)
}));

describe('footerService with navigationRepository', () => {
  const mockContactInfo = {
    email: 'test@example.com',
    phone: '+380123456789',
    contactButtonLink: 'https://example.com/contact',
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

  const contactRepositoryMock = {
    getContactInfo: jest.fn().mockResolvedValue(mockContactInfo)
  };

  const brandingRepositoryMock = {
    getBrandingInfo: jest.fn().mockResolvedValue(mockFoundationNameData),
    getSupportButtonLink: jest.fn().mockResolvedValue(mockSupportButtonData)
  };

  const publicRepositoryMock = {
    getPublicInfo: jest.fn().mockResolvedValue(mockPublicInfo)
  };

  const navigationRepositoryMock = {
    getNavigation: jest.fn().mockResolvedValue(mockNavigationData)
  };

  const mockDeps: FooterServiceDeps = {
    contactRepository: contactRepositoryMock,
    brandingRepository: brandingRepositoryMock,
    publicRepository: publicRepositoryMock,
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
      contactButtonLink: mockContactInfo.contactButtonLink,
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
    contactRepositoryMock.getContactInfo.mockResolvedValueOnce({
      ...mockContactInfo,
      socialLinks: undefined
    });

    const result = await footerService.getFooterData('en' as Locale);

    expect(result.socialLinks).toEqual([]);
  });
});

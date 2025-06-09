import { createFooterService } from '~/services/footerService';
import type { FooterServiceDeps } from '~/types/types/foundationInfo.type';
import { Locale } from 'next-intl';

jest.mock('~/db/connect', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined)
}));

describe('footerService with navigationRepository', () => {
  const mockData = {
    contactInfo: {
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
    },
    foundationNameData: {
      foundationName: 'Foundation Name'
    },
    supportButtonData: {
      supportButtonLink: 'https://donate.com'
    },
    publicInfo: {
      copyright: '© 2025 Foundation',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Use', href: '/terms' }
      ]
    },
    navigationData: [
      {
        title: 'Main',
        links: [
          { label: 'Home', href: '/', visibility: 'true' },
          { label: 'About', href: '/about', visibility: 'true' }
        ]
      }
    ]
  };

  const contactRepositoryMock = {
    getContactInfo: jest.fn().mockResolvedValue(mockData.contactInfo)
  };

  const brandingRepositoryMock = {
    getBrandingInfo: jest.fn().mockResolvedValue(mockData.foundationNameData),
    getSupportButtonLink: jest.fn().mockResolvedValue(mockData.supportButtonData)
  };

  const publicRepositoryMock = {
    getPublicInfo: jest.fn().mockResolvedValue(mockData.publicInfo)
  };

  const navigationRepositoryMock = {
    getNavigation: jest.fn().mockResolvedValue(mockData.navigationData)
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

  it('returns footer data including socialLinks and navigation', async () => {
    const result = await footerService.getFooterData('en' as Locale);

    expect(result).toEqual({
      contacts: {
        foundationName: mockData.foundationNameData.foundationName,
        email: mockData.contactInfo.email,
        phone: mockData.contactInfo.phone,
        socialLinks: mockData.contactInfo.socialLinks
      },
      donationButtonData: {
        supportButtonLink: mockData.supportButtonData.supportButtonLink
      },
      footerData: {
        text: mockData.publicInfo.copyright,
        links: mockData.publicInfo.links
      },
      navigation: mockData.navigationData
    });

    expect(contactRepositoryMock.getContactInfo).toHaveBeenCalled();
    expect(brandingRepositoryMock.getBrandingInfo).toHaveBeenCalledWith('en');
    expect(brandingRepositoryMock.getSupportButtonLink).toHaveBeenCalled();
    expect(publicRepositoryMock.getPublicInfo).toHaveBeenCalledWith('en');
    expect(navigationRepositoryMock.getNavigation).toHaveBeenCalledWith('en');
  });

  it('returns empty socialLinks if not provided', async () => {
    contactRepositoryMock.getContactInfo.mockResolvedValueOnce({
      ...mockData.contactInfo,
      socialLinks: undefined
    });

    const result = await footerService.getFooterData('en' as Locale);

    expect(result.contacts.socialLinks).toEqual([]);
  });
});

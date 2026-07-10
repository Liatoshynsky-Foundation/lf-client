import type { Locale } from 'next-intl';

import { createFooterService } from './footerService';

import { ROUTES } from '~/shared/components/constants/routes';

describe('footerService (composed)', () => {
  const mockContactInfo = {
    email: 'test@example.com',
    phone: '+380123456789',
    address: { uk: 'Українська адреса', en: 'English address' },
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
      { label: { uk: 'Умови', en: 'Terms of Use' }, href: ROUTES.TERMS }
    ]
  };

  const mockNavigationRaw = [
    {
      title: { uk: 'Головна', en: 'Main' },
      links: [
        { label: { uk: 'Дім', en: 'Home' }, href: ROUTES.HOME, visibility: true },
        { label: { uk: 'Про нас', en: 'About' }, href: '/about', visibility: true }
      ]
    }
  ];

  const mockSpecialNavigationRaw = {
    title: 'Special',
    links: [
      {
        label: {
          en: 'Special',
          uk: 'Спеціальний'
        },
        visibility: true,
        href: '/special'
      }
    ]
  };

  const foundationInfoServiceMock = {
    getContactInfo: jest.fn().mockResolvedValue(mockContactInfo),
    getBrandingInfo: jest.fn().mockResolvedValue(mockBrandingInfoRaw),
    getSupportButtonLink: jest.fn().mockResolvedValue(mockSupportButtonData),
    getPublicInfo: jest.fn().mockResolvedValue(mockPublicInfoRaw)
  };

  const navigationServiceMock = {
    getNavigation: jest.fn().mockResolvedValue(mockNavigationRaw),
    getSpecialNavigation: jest.fn().mockResolvedValue(mockSpecialNavigationRaw),
    getFooterNavigation: jest.fn().mockResolvedValue(mockNavigationRaw)
  };

  const footerService = createFooterService({
    foundationInfoRepo: foundationInfoServiceMock as unknown as any,
    navigationRepo: navigationServiceMock as unknown as any
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
        phone: mockContactInfo.phone,
        address: mockContactInfo.address.en
      },
      socialLinks: mockContactInfo.socialLinks,
      supportButtonLink: mockSupportButtonData.supportButtonLink,
      publicInfo: {
        text: '© 2025 Foundation',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Use', href: ROUTES.TERMS }
        ]
      },
      navigation: [
        {
          title: 'Main',
          links: [
            { label: 'Home', href: ROUTES.HOME, visibility: true },
            { label: 'About', href: '/about', visibility: true }
          ]
        }
      ]
    });

    expect(foundationInfoServiceMock.getContactInfo).toHaveBeenCalled();
    expect(foundationInfoServiceMock.getBrandingInfo).toHaveBeenCalled();
    expect(foundationInfoServiceMock.getSupportButtonLink).toHaveBeenCalled();
    expect(foundationInfoServiceMock.getPublicInfo).toHaveBeenCalled();
    expect(navigationServiceMock.getFooterNavigation).toHaveBeenCalled();
  });

  it('should return empty socialLinks if not provided', async () => {
    foundationInfoServiceMock.getContactInfo.mockResolvedValueOnce({
      ...mockContactInfo,
      socialLinks: undefined
    });

    const result = await footerService.getFooterData('en' as Locale);

    expect(result.socialLinks).toEqual([]);
  });

  it('should fallback to empty string when supportButtonLink property resolves to undefined fields', async () => {
    foundationInfoServiceMock.getSupportButtonLink.mockResolvedValueOnce({
      supportButtonLink: undefined
    });

    const result = await footerService.getFooterData('en' as Locale);
    expect(result.supportButtonLink).toBe('');
  });

  it('should fallback to empty array layout configurations when public links resolve to null objects', async () => {
    foundationInfoServiceMock.getPublicInfo.mockResolvedValueOnce({
      ...mockPublicInfoRaw,
      links: undefined
    });

    const result = await footerService.getFooterData('en' as Locale);
    expect(result.publicInfo.links).toEqual([]);
  });
});

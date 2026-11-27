import type { Locale } from 'next-intl';

import { createFooterService } from './footerService';

import type { FoundationInfoRepository } from '~/infrastructure/repositories/foundation-info/foundationInfo.repo';
import type { NavigationRepository } from '~/infrastructure/repositories/navigation/navigation.repo';
import { ROUTES } from '~/shared/components/constants/routes';

describe('footerService (composed)', () => {
  type LocalizedRawValue = {
    uk?: string | null;
    en?: string | null;
  };

  type RawContactInfo = {
    email?: string | null;
    phone?: string | null;
    address?: LocalizedRawValue | null;
    socialLinks?:
      | {
          platform: string;
          link: string;
          icon: string;
        }[]
      | null;
  };

  type RawBrandingInfo = {
    foundationName?: LocalizedRawValue | null;
  };

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
    getContactInfo: jest.fn<Promise<RawContactInfo>, []>().mockResolvedValue(mockContactInfo),
    getBrandingInfo: jest.fn<Promise<RawBrandingInfo>, []>().mockResolvedValue(mockBrandingInfoRaw),
    getSupportButtonLink: jest.fn().mockResolvedValue(mockSupportButtonData),
    getPublicInfo: jest.fn().mockResolvedValue(mockPublicInfoRaw)
  };

  const navigationServiceMock = {
    getNavigation: jest.fn().mockResolvedValue(mockNavigationRaw),
    getSpecialNavigation: jest.fn().mockResolvedValue(mockSpecialNavigationRaw),
    getFooterNavigation: jest.fn().mockResolvedValue(mockNavigationRaw)
  };

  const footerService = createFooterService({
    foundationInfoRepo: foundationInfoServiceMock as unknown as FoundationInfoRepository,
    navigationRepo: navigationServiceMock as unknown as NavigationRepository
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

  it('should treat null and whitespace-only contacts as empty without using another locale', async () => {
    const contactInfo = {
      ...mockContactInfo,
      email: null,
      phone: ' \t ',
      address: { uk: 'Українська адреса', en: '  ' }
    };
    const brandingInfo = {
      foundationName: { uk: 'Українська назва', en: '  ' }
    };
    foundationInfoServiceMock.getContactInfo.mockResolvedValueOnce(contactInfo);
    foundationInfoServiceMock.getBrandingInfo.mockResolvedValueOnce(brandingInfo);

    const englishResult = await footerService.getFooterData('en' as Locale);

    expect(englishResult.contacts).toEqual({
      foundationName: undefined,
      email: undefined,
      phone: undefined,
      address: undefined
    });

    foundationInfoServiceMock.getContactInfo.mockResolvedValueOnce(contactInfo);
    foundationInfoServiceMock.getBrandingInfo.mockResolvedValueOnce(brandingInfo);
    const ukrainianResult = await footerService.getFooterData('uk' as Locale);

    expect(ukrainianResult.contacts.foundationName).toBe('Українська назва');
    expect(ukrainianResult.contacts.address).toBe('Українська адреса');
  });

  it('should accept missing localized contact fields', async () => {
    foundationInfoServiceMock.getContactInfo.mockResolvedValueOnce({
      ...mockContactInfo,
      phone: undefined,
      email: undefined,
      address: undefined
    });
    foundationInfoServiceMock.getBrandingInfo.mockResolvedValueOnce({ foundationName: undefined });

    const result = await footerService.getFooterData('uk' as Locale);

    expect(result.contacts).toEqual({
      foundationName: undefined,
      email: undefined,
      phone: undefined,
      address: undefined
    });
  });

  it('should hide localized contact fields when the current language value is missing', async () => {
    foundationInfoServiceMock.getContactInfo.mockResolvedValueOnce({
      ...mockContactInfo,
      address: { uk: 'Українська адреса' }
    });
    foundationInfoServiceMock.getBrandingInfo.mockResolvedValueOnce({
      foundationName: { uk: 'Українська назва' }
    });

    const result = await footerService.getFooterData('en' as Locale);

    expect(result.contacts.foundationName).toBeUndefined();
    expect(result.contacts.address).toBeUndefined();
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

  it('should replace the {year} placeholder in the copyright text with the current year', async () => {
    const currentYear = new Date().getFullYear();

    foundationInfoServiceMock.getPublicInfo.mockResolvedValueOnce({
      ...mockPublicInfoRaw,
      copyright: { uk: '© {year} Фундація', en: '© {year} Foundation' }
    });

    const result = await footerService.getFooterData('en' as Locale);
    expect(result.publicInfo.text).toBe(`© ${currentYear} Foundation`);
  });
});

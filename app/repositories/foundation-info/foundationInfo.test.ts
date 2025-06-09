import { brandingRepository, contactRepository, publicRepository } from './foundationInfo.repository';

import { BrandingInfo } from '~/models/foundation-info/foundationInfoBranding';
import { ContactInfo } from '~/models/foundation-info/foundationInfoContact';
import { PublicInfo } from '~/models/foundation-info/foundationInfoPublic';

jest.mock('~/models/foundation-info/foundationInfoContact', () => ({
  ContactInfo: {
    findOne: jest.fn()
  }
}));

jest.mock('~/models/foundation-info/foundationInfoBranding', () => ({
  BrandingInfo: {
    findOne: jest.fn()
  }
}));

jest.mock('~/models/foundation-info/foundationInfoPublic', () => ({
  PublicInfo: {
    findOne: jest.fn()
  }
}));

const mockSelect = (value: unknown) => ({
  select: jest.fn().mockReturnValue({
    lean: jest.fn().mockResolvedValue(value)
  })
});

const mockContactData = {
  email: 'test@example.com',
  phone: '+380123456789',
  contactButtonLink: 'https://example.com/contact',
  socialLinks: [
    {
      platform: 'Instagram',
      link: 'https://instagram.com/latoshynsky',
      icon: 'instagram.svg'
    }
  ]
};

const mockBrandingData = {
  foundationName: { uk: 'Фундація', en: 'Foundation' },
  supportButtonLink: 'https://support.com'
};

const mockPublicData = {
  copyright: {
    uk: '© 2025 Фундація',
    en: '© 2025 Foundation'
  },
  links: [
    { label: { uk: 'Політика', en: 'Privacy' }, href: '/privacy' },
    { label: { uk: 'Умови', en: 'Terms' }, href: '/terms' }
  ]
};

describe('foundationInfo.repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('contactRepository.getContactInfo', () => {
    it('should return contact info without socialLinks when undefined', async () => {
      (ContactInfo.findOne as jest.Mock).mockReturnValue(mockSelect({ ...mockContactData, socialLinks: undefined }));

      const result = await contactRepository.getContactInfo();

      expect(result).toEqual({
        email: mockContactData.email,
        phone: mockContactData.phone,
        contactButtonLink: mockContactData.contactButtonLink
      });
    });

    it('should return full contact info including socialLinks', async () => {
      (ContactInfo.findOne as jest.Mock).mockReturnValue(mockSelect(mockContactData));

      const result = await contactRepository.getContactInfo();

      expect(result).toEqual(mockContactData);
    });
  });

  describe('brandingRepository.getBrandingInfo', () => {
    it('should return foundation name by locale', async () => {
      (BrandingInfo.findOne as jest.Mock).mockReturnValue(
        mockSelect({ foundationName: mockBrandingData.foundationName })
      );

      const result = await brandingRepository.getBrandingInfo('uk');

      expect(result).toEqual({ foundationName: mockBrandingData.foundationName.uk });
    });
  });

  describe('brandingRepository.getSupportButtonLink', () => {
    it('should return optional support button link', async () => {
      (BrandingInfo.findOne as jest.Mock).mockReturnValue(
        mockSelect({ supportButtonLink: mockBrandingData.supportButtonLink })
      );

      const result = await brandingRepository.getSupportButtonLink();

      expect(result).toEqual({ supportButtonLink: mockBrandingData.supportButtonLink });
    });
  });

  describe('publicRepository.getPublicInfo', () => {
    it('should return localized copyright and links', async () => {
      (PublicInfo.findOne as jest.Mock).mockReturnValue(mockSelect(mockPublicData));

      const result = await publicRepository.getPublicInfo('en');

      expect(result).toEqual({
        copyright: mockPublicData.copyright.en,
        links: [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' }
        ]
      });
    });
  });
});

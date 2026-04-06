import newFoundationInfoRepo from './foundationInfo.repository';

import { BrandingInfo } from '~/infrastructure/models/foundation-info/foundationInfoBranding';
import { ContactInfo } from '~/infrastructure/models/foundation-info/foundationInfoContact';
import { PublicInfo } from '~/infrastructure/models/foundation-info/foundationInfoPublic';
import { ROUTES } from '~/shared/components/constants/routes';

jest.mock('~/infrastructure/db/connect', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('~/infrastructure/models/foundation-info/foundationInfoContact', () => ({
  ContactInfo: {
    findOne: jest.fn()
  }
}));

jest.mock('~/infrastructure/models/foundation-info/foundationInfoBranding', () => ({
  BrandingInfo: {
    findOne: jest.fn()
  }
}));

jest.mock('~/infrastructure/models/foundation-info/foundationInfoPublic', () => ({
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
  address: { uk: 'Ukrainian address', en: 'English address' },
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
    { label: { uk: 'Умови', en: 'Terms' }, href: ROUTES.TERMS }
  ]
};

const foundationInfoRepository = newFoundationInfoRepo();

describe('foundationInfoRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getContactInfo', () => {
    it('should return contact info without socialLinks when undefined', async () => {
      (ContactInfo.findOne as jest.Mock).mockReturnValue(mockSelect({ ...mockContactData, socialLinks: undefined }));

      const result = await foundationInfoRepository.getContactInfo();

      expect(result).toEqual({
        email: mockContactData.email,
        phone: mockContactData.phone,
        address: mockContactData.address,
        socialLinks: undefined
      });
    });

    it('should return full contact info including socialLinks', async () => {
      (ContactInfo.findOne as jest.Mock).mockReturnValue(mockSelect(mockContactData));

      const result = await foundationInfoRepository.getContactInfo();

      expect(result).toEqual(mockContactData);
    });
  });

  describe('getBrandingInfo', () => {
    it('should return foundation name as raw translations', async () => {
      (BrandingInfo.findOne as jest.Mock).mockReturnValue(
        mockSelect({ foundationName: mockBrandingData.foundationName })
      );

      const result = await foundationInfoRepository.getBrandingInfo();

      expect(result).toEqual({
        foundationName: mockBrandingData.foundationName
      });
    });
  });

  describe('getSupportButtonLink', () => {
    it('should return optional support button link', async () => {
      (BrandingInfo.findOne as jest.Mock).mockReturnValue(
        mockSelect({ supportButtonLink: mockBrandingData.supportButtonLink })
      );

      const result = await foundationInfoRepository.getSupportButtonLink();

      expect(result).toEqual({ supportButtonLink: mockBrandingData.supportButtonLink });
    });
  });

  describe('getPublicInfo', () => {
    it('should return raw public info without localization', async () => {
      (PublicInfo.findOne as jest.Mock).mockReturnValue(mockSelect(mockPublicData));

      const result = await foundationInfoRepository.getPublicInfo();

      expect(result).toEqual({
        copyright: mockPublicData.copyright,
        links: mockPublicData.links
      });
    });
  });
});

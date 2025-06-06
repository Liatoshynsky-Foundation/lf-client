import { contactRepository, brandingRepository, publicRepository } from './foundationInfo.repository';
import { ContactInfo } from '~/models/foundation-info/foundationInfoContact';
import { BrandingInfo } from '~/models/foundation-info/foundationInfoBranding';
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

describe('foundationInfo.repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('contactRepository.getContactInfo', () => {
    it('returns parsed contact info', async () => {
      (ContactInfo.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue({
            email: 'test@example.com',
            phone: '+380123456789',
            contactButtonLink: 'https://example.com/contact'
          })
        })
      });

      const result = await contactRepository.getContactInfo();

      expect(result).toEqual({
        email: 'test@example.com',
        phone: '+380123456789',
        contactButtonLink: 'https://example.com/contact'
      });
    });
  });

  describe('brandingRepository.getBrandingInfo', () => {
    it('returns foundation name by locale', async () => {
      (BrandingInfo.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue({
            foundationName: { uk: 'Фундація', en: 'Foundation' }
          })
        })
      });

      const result = await brandingRepository.getBrandingInfo('uk');

      expect(result).toEqual({ foundationName: 'Фундація' });
    });
  });

  describe('brandingRepository.getSupportButtonLink', () => {
    it('returns optional support button link', async () => {
      (BrandingInfo.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue({
            supportButtonLink: 'https://support.com'
          })
        })
      });

      const result = await brandingRepository.getSupportButtonLink();

      expect(result).toEqual({ supportButtonLink: 'https://support.com' });
    });
  });

  describe('publicRepository.getPublicInfo', () => {
    it('returns localized copyright and links', async () => {
      (PublicInfo.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue({
            copyright: {
              uk: '© 2025 Фундація',
              en: '© 2025 Foundation'
            },
            links: [
              {
                label: { uk: 'Політика', en: 'Privacy' },
                href: '/privacy'
              },
              {
                label: { uk: 'Умови', en: 'Terms' },
                href: '/terms'
              }
            ]
          })
        })
      });

      const result = await publicRepository.getPublicInfo('en');

      expect(result).toEqual({
        copyright: '© 2025 Foundation',
        links: [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' }
        ]
      });
    });
  });
});

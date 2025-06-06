import { ContactInfo } from '~/models/foundation-info/foundationInfoContact';
import { BrandingInfo } from '~/models/foundation-info/foundationInfoBranding';
import { PublicInfo } from '~/models/foundation-info/foundationInfoPublic';
import type { Locale } from 'next-intl';
import type {
  ContactInfoData,
  FoundationNameData,
  SupportButtonLinkData,
  PublicInfoData
} from '~/types/types/foundationInfo.type';
import { brandingInfoSchema, contactInfoSchema, publicInfoSchema } from '~/validators/foundationInfo.schema';
import { hrefSchema } from '~/validators/constants';

export const contactRepository = {
  async getContactInfo(): Promise<ContactInfoData> {
    const result = await ContactInfo.findOne({ slug: 'contact-info' }).select('email phone contactButtonLink').lean();

    const parsed = contactInfoSchema.parse(result);

    return {
      email: parsed.email,
      phone: parsed.phone,
      contactButtonLink: parsed.contactButtonLink
    };
  }
};

export const brandingRepository = {
  async getBrandingInfo(locale: Locale): Promise<FoundationNameData> {
    const result = await BrandingInfo.findOne({ slug: 'branding-info' }).select('foundationName').lean();

    const parsed = brandingInfoSchema.omit({ supportButtonLink: true }).parse(result);

    return {
      foundationName: parsed.foundationName[locale]
    };
  },

  async getSupportButtonLink(): Promise<SupportButtonLinkData> {
    const result = await BrandingInfo.findOne({ slug: 'branding-info' })
      .select('supportButtonLink')
      .lean<SupportButtonLinkData>();

    const parsed = hrefSchema.optional().safeParse(result?.supportButtonLink);

    return { supportButtonLink: parsed.data };
  }
};

export const publicRepository = {
  async getPublicInfo(locale: Locale): Promise<PublicInfoData> {
    const result = await PublicInfo.findOne({ slug: 'public-info' }).select('copyright links').lean();

    const parsed = publicInfoSchema.parse(result);

    return {
      copyright: parsed.copyright[locale],
      links:
        parsed.links?.map((link) => ({
          label: link.label[locale],
          href: link.href
        })) ?? []
    };
  }
};

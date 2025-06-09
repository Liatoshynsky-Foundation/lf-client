import type { Locale } from 'next-intl';

import type { FoundationInfoRepository } from '~/types/types/repositories/foundationInfo.repository';

import dbConnect from '~/db/connect';
import { BrandingInfo } from '~/models/foundation-info/foundationInfoBranding';
import { ContactInfo } from '~/models/foundation-info/foundationInfoContact';
import { PublicInfo } from '~/models/foundation-info/foundationInfoPublic';
import { brandingInfoSchema, contactInfoSchema, publicInfoSchema } from '~/validators/foundationInfo.schema';

export const foundationInfoRepository: FoundationInfoRepository = {
  async getContactInfo() {
    await dbConnect();

    const result = await ContactInfo.findOne({ slug: 'contact-info' })
      .select('email phone contactButtonLink socialLinks')
      .lean();

    const parsed = contactInfoSchema.parse(result);

    return {
      email: parsed.email,
      phone: parsed.phone,
      socialLinks: parsed.socialLinks
    };
  },

  async getBrandingInfo(locale: Locale) {
    await dbConnect();

    const result = await BrandingInfo.findOne({ slug: 'branding-info' }).select('foundationName').lean();

    const parsed = brandingInfoSchema.omit({ supportButtonLink: true }).parse(result);

    return {
      foundationName: parsed.foundationName[locale]
    };
  },

  async getSupportButtonLink() {
    await dbConnect();

    const result = await BrandingInfo.findOne({ slug: 'branding-info' }).select('supportButtonLink');

    const parsed = brandingInfoSchema.pick({ supportButtonLink: true }).parse(result);

    return {
      supportButtonLink: parsed.supportButtonLink
    };
  },

  async getPublicInfo(locale: Locale) {
    await dbConnect();

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

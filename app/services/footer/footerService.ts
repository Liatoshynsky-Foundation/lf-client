import type { Locale } from 'next-intl';

import { FoundationInfoRepository } from '~/infrastructure/repositories/foundation-info/foundationInfo.repo';
import { NavigationRepository } from '~/infrastructure/repositories/navigation/navigation.repo';
import { LocalizeSchema } from '~/validators/constants';
import {
  createLocalizedBrandingInfoSchema,
  createLocalizedContactInfoSchema,
  createLocalizedPublicInfoSchema
} from '~/validators/foundationInfo.schema';
import { navigationSchema } from '~/validators/navigation.schema';

interface FooterServiceDeps {
  navigationRepo: NavigationRepository;
  foundationInfoRepo: FoundationInfoRepository;
}

export const createFooterService = ({ navigationRepo, foundationInfoRepo }: FooterServiceDeps) => ({
  async getFooterData(locale: Locale) {
    const [contactInfo, brandingInfoRaw, supportButtonData, publicInfoRaw, navigationRaw] = await Promise.all([
      foundationInfoRepo.getContactInfo(),
      foundationInfoRepo.getBrandingInfo(),
      foundationInfoRepo.getSupportButtonLink(),
      foundationInfoRepo.getPublicInfo(),
      navigationRepo.getNavigation()
    ]);

    const addressInfo = createLocalizedContactInfoSchema(locale).parse(contactInfo);
    const brandingInfo = createLocalizedBrandingInfoSchema(locale).parse(brandingInfoRaw);
    const publicInfo = createLocalizedPublicInfoSchema(locale).parse(publicInfoRaw);
    const navigationData = navigationRaw.map((nav: any) => LocalizeSchema(navigationSchema, locale).parse(nav));

    return {
      contacts: {
        foundationName: brandingInfo.foundationName,
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: addressInfo.address
      },
      socialLinks: contactInfo.socialLinks ?? [],
      supportButtonLink: supportButtonData.supportButtonLink ?? '',
      publicInfo: {
        text: publicInfo.copyright,
        links: publicInfo.links ?? []
      },
      navigation: navigationData
    };
  }
});

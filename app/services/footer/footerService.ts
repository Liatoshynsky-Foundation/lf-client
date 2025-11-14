import type { Locale } from 'next-intl';

import { FoundationInfoRepository } from '~/infrastructure/repositories/foundation-info/foundationInfo.repo';
import { NavigationRepository } from '~/infrastructure/repositories/navigation/navigation.repo';
import { ArraySchema, LocalizeSchema, NoSupportButtonLink } from '~/validators/constants';
import { brandingInfoSchema, contactInfoSchema, publicInfoSchema } from '~/validators/foundationInfo.schema';
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

    const addressInfo = LocalizeSchema(contactInfoSchema, locale).parse(contactInfo);
    const brandingInfo = LocalizeSchema(NoSupportButtonLink(brandingInfoSchema), locale).parse(brandingInfoRaw);
    const publicInfo = LocalizeSchema(publicInfoSchema, locale).parse(publicInfoRaw);
    const navigationData = ArraySchema(LocalizeSchema(navigationSchema, locale)).parse(navigationRaw);

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

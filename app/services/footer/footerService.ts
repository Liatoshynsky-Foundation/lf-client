import type { Locale } from 'next-intl';

import { FoundationInfoRepository } from '~/infrastructure/repositories/foundation-info/foundationInfo.repo';
import { NavigationRepository } from '~/infrastructure/repositories/navigation/navigation.repo';
import { injectCurrentYear } from '~/lib/utils/injectCurrentYear';
import { ArraySchema, NoSupportButtonLink } from '~/validators/constants';
import { brandingInfoSchema, contactInfoSchema, publicInfoSchema } from '~/validators/foundationInfo.schema';
import { LocalizeSchema } from '~/validators/localization';
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
      navigationRepo.getFooterNavigation()
    ]);

    const addressInfo = LocalizeSchema(contactInfoSchema, locale, { allowEmptyFields: ['address'] }).parse(
      contactInfo
    ) as { email?: string; phone?: string; address?: string };
    const brandingInfo = LocalizeSchema(NoSupportButtonLink(brandingInfoSchema), locale, {
      allowEmptyFields: ['foundationName']
    }).parse(brandingInfoRaw) as { foundationName?: string };
    const publicInfo = LocalizeSchema(publicInfoSchema, locale).parse(publicInfoRaw);
    const navigationData = ArraySchema(LocalizeSchema(navigationSchema, locale)).parse(navigationRaw);

    return {
      contacts: {
        foundationName: brandingInfo.foundationName,
        email: addressInfo.email,
        phone: addressInfo.phone,
        address: addressInfo.address
      },
      socialLinks: contactInfo.socialLinks ?? [],
      supportButtonLink: supportButtonData.supportButtonLink ?? '',
      publicInfo: {
        text: injectCurrentYear(publicInfo.copyright),
        links: publicInfo.links ?? []
      },
      navigation: navigationData
    };
  }
});

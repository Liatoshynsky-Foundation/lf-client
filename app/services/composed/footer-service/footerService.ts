import type { Locale } from 'next-intl';

import type { FooterServiceDeps } from '~/domain/services/footerService.type';
import { createLocalizedBrandingInfoSchema, createLocalizedPublicInfoSchema } from '~/validators/foundationInfo.schema';
import { createLocalizedNavigationSchema } from '~/validators/navigation.schema';

export const createFooterService = ({ navigationService, foundationInfoService }: FooterServiceDeps) => ({
  async getFooterData(locale: Locale) {
    const [contactInfo, brandingInfoRaw, supportButtonData, publicInfoRaw, navigationRaw] = await Promise.all([
      foundationInfoService.getContactInfo(),
      foundationInfoService.getBrandingInfo(),
      foundationInfoService.getSupportButtonLink(),
      foundationInfoService.getPublicInfo(),
      navigationService.getNavigation()
    ]);

    const brandingInfo = createLocalizedBrandingInfoSchema(locale).parse(brandingInfoRaw);
    const publicInfo = createLocalizedPublicInfoSchema(locale).parse(publicInfoRaw);
    const navigationData = navigationRaw.map((nav) => createLocalizedNavigationSchema(locale).parse(nav));

    return {
      contacts: {
        foundationName: brandingInfo.foundationName,
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: contactInfo.address
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

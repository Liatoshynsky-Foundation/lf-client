import { Locale } from 'next-intl';

import type { FooterServiceDeps } from '~/domain/services/footerService.type';

export const createFooterService = ({ foundationInfoService, navigationService }: FooterServiceDeps) => ({
  async getFooterData(locale: Locale) {
    const [contactInfo, foundationNameData, supportButtonData, publicInfo, navigationData] = await Promise.all([
      foundationInfoService.getContactInfo(),
      foundationInfoService.getBrandingInfo(locale),
      foundationInfoService.getSupportButtonLink(),
      foundationInfoService.getPublicInfo(locale),
      navigationService.getNavigation(locale)
    ]);

    return {
      contacts: {
        foundationName: foundationNameData.foundationName,
        email: contactInfo.email,
        phone: contactInfo.phone
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

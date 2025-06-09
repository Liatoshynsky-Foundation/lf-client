import { Locale } from 'next-intl';

import type { FooterServiceDeps } from '~/types/types/services/footerService.type';

export const createFooterService = ({ foundationInfoRepository, navigationRepository }: FooterServiceDeps) => ({
  async getFooterData(locale: Locale) {
    const [contactInfo, foundationNameData, supportButtonData, publicInfo, navigationData] = await Promise.all([
      foundationInfoRepository.getContactInfo(),
      foundationInfoRepository.getBrandingInfo(locale),
      foundationInfoRepository.getSupportButtonLink(),
      foundationInfoRepository.getPublicInfo(locale),
      navigationRepository.getNavigation(locale)
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

import dbConnect from '~/db/connect';
import { Locale } from 'next-intl';
import type { FooterServiceDeps } from '~/types/types/foundationInfo.type';

export const createFooterService = ({
  contactRepository,
  brandingRepository,
  publicRepository,
  navigationRepository
}: FooterServiceDeps) => ({
  async getFooterData(locale: Locale) {
    await dbConnect();

    const [contactInfo, foundationNameData, supportButtonData, publicInfo, navigationData] = await Promise.all([
      contactRepository.getContactInfo(),
      brandingRepository.getBrandingInfo(locale),
      brandingRepository.getSupportButtonLink(),
      publicRepository.getPublicInfo(locale),
      navigationRepository.getNavigation(locale)
    ]);

    return {
      contacts: {
        foundationName: foundationNameData.foundationName,
        email: contactInfo.email,
        phone: contactInfo.phone,
        socialLinks: contactInfo.socialLinks ?? []
      },
      donationButtonData: {
        supportButtonLink: supportButtonData.supportButtonLink ?? ''
      },
      footerData: {
        text: publicInfo.copyright,
        links: publicInfo.links ?? []
      },
      navigation: navigationData
    };
  }
});

import { Locale } from 'next-intl';

import type { HeaderServiceDeps } from '~/types/types/foundationInfo.type';

import dbConnect from '~/db/connect';

export const createHeaderService = ({ brandingRepository, navigationRepository }: HeaderServiceDeps) => ({
  async getHeaderData(locale: Locale) {
    await dbConnect();

    const [navigationData, supportButtonData] = await Promise.all([
      navigationRepository.getNavigation(locale),
      brandingRepository.getSupportButtonLink()
    ]);

    return {
      navigation: navigationData,
      supportButtonLink: supportButtonData.supportButtonLink ?? ''
    };
  }
});

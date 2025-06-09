import { Locale } from 'next-intl';

import type { HeaderServiceDeps } from '~/types/types/services/headerService.type';

export const createHeaderService = ({ foundationInfoRepository, navigationRepository }: HeaderServiceDeps) => ({
  async getHeaderData(locale: Locale) {
    const [navigationData, supportButtonData] = await Promise.all([
      navigationRepository.getNavigation(locale),
      foundationInfoRepository.getSupportButtonLink()
    ]);

    return {
      navigation: navigationData,
      supportButtonLink: supportButtonData.supportButtonLink ?? ''
    };
  }
});

import { Locale } from 'next-intl';

import type { HeaderServiceDeps } from '~/domain/services/headerService.type';

export const createHeaderService = ({ foundationInfoService, navigationService }: HeaderServiceDeps) => ({
  async getHeaderData(locale: Locale) {
    const [navigationData, supportButtonData] = await Promise.all([
      navigationService.getNavigation(locale),
      foundationInfoService.getSupportButtonLink()
    ]);

    return {
      navigation: navigationData,
      supportButtonLink: supportButtonData.supportButtonLink ?? ''
    };
  }
});

import type { Locale } from 'next-intl';

import type { HeaderServiceDeps } from '~/domain/services/headerService.type';
import { createLocalizedNavigationSchema } from '~/validators/navigation.schema';

export const createHeaderService = ({ navigationService, foundationInfoService }: HeaderServiceDeps) => ({
  async getHeaderData(locale: Locale) {
    const [navigationRaw, supportButtonData] = await Promise.all([
      navigationService.getNavigation(),
      foundationInfoService.getSupportButtonLink()
    ]);

    const navigationData = navigationRaw.map((nav) => createLocalizedNavigationSchema(locale).parse(nav));

    return {
      navigation: navigationData,
      supportButtonLink: supportButtonData.supportButtonLink ?? ''
    };
  }
});

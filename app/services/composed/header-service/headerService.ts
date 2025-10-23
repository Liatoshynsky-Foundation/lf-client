import type { Locale } from 'next-intl';

import type { HeaderServiceDeps } from '~/domain/services/headerService.type';
import { LocalizeSchema } from '~/validators/constants';
import { LocalizeSchemaWithSingleLink, navigationSchema } from '~/validators/navigation.schema';

export const createHeaderService = ({ navigationService, foundationInfoService }: HeaderServiceDeps) => ({
  async getHeaderData(locale: Locale) {
    const [navigationRaw, specialNavigationData, supportButtonData] = await Promise.all([
      navigationService.getNavigation(),
      navigationService.getSpecialNavigation(),
      foundationInfoService.getSupportButtonLink()
    ]);

    const navigationData = navigationRaw.map((nav) => LocalizeSchemaWithSingleLink(locale).parse(nav));
    const specialNavigation = specialNavigationData
      ? LocalizeSchema(navigationSchema, locale).parse(specialNavigationData)
      : null;

    return {
      navigation: navigationData,
      specialNavigation: specialNavigation,
      supportButtonLink: supportButtonData.supportButtonLink ?? ''
    };
  }
});

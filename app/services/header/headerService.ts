import type { Locale } from 'next-intl';

import { FoundationInfoRepository } from '~/infrastructure/repositories/foundation-info/foundationInfo.repo';
import { NavigationRepository } from '~/infrastructure/repositories/navigation/navigation.repo';
import { LocalizeSchema } from '~/validators/constants';
import { LocalizeSchemaWithSingleLink, navigationSchema } from '~/validators/navigation.schema';

interface HeaderServiceDeps {
  navigationRepo: NavigationRepository;
  foundationInfoRepo: FoundationInfoRepository;
}

export const createHeaderService = ({ navigationRepo, foundationInfoRepo }: HeaderServiceDeps) => ({
  async getHeaderData(locale: Locale) {
    const [navigationRaw, specialNavigationData, supportButtonData] = await Promise.all([
      navigationRepo.getNavigation(),
      navigationRepo.getSpecialNavigation(),
      foundationInfoRepo.getSupportButtonLink()
    ]);

    const navigationData = navigationRaw.map((nav: any) => LocalizeSchemaWithSingleLink(locale).parse(nav));
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

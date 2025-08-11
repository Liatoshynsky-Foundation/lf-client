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

    const transformedNavigation = navigationData.map((group) => {
      if (group.links?.length === 1) {
        const [singleLink] = group.links;
        return {
          ...group,
          title: singleLink.label,
          links: [
            {
              ...singleLink,
              label: group.title
            }
          ]
        };
      }
      return group;
    });

    return {
      navigation: transformedNavigation,
      supportButtonLink: supportButtonData.supportButtonLink ?? ''
    };
  }
});

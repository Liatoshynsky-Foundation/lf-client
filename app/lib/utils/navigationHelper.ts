import newNavigationRepository from '~/infrastructure/repositories/navigation/navigation.repository';

export interface NavItem {
  label: {
    uk?: string;
    en?: string;
  };
  dropdown?: Array<{
    label: {
      uk?: string;
      en?: string;
    };
    href: string;
  }>;
  href?: string;
}

async function getTransformedNavigation(): Promise<NavItem[]> {
  const navigationRepo = newNavigationRepository();
  const navigations = await navigationRepo.getNavigation();

  return navigations.map((group) => {
    const dropdown = group.links.map((link) => ({
      label: link.label,
      href: link.href
    }));

    return {
      label: group.title,
      dropdown: dropdown.length > 1 ? dropdown : undefined,
      href: dropdown.length === 1 ? dropdown[0].href : undefined
    };
  });
}

export async function getNavigationLinkByHref(href: string): Promise<string | undefined> {
  const navItems = await getTransformedNavigation();
  const item = navItems.find((item) => item.href === href);
  return item?.href;
}

export async function getNavigationLinkByLabel(searchText: string): Promise<string | undefined> {
  const navItems = await getTransformedNavigation();
  const lowerSearchText = searchText.toLowerCase();

  const item = navItems.find(
    (item) =>
      item.label.uk?.toLowerCase().includes(lowerSearchText) || item.label.en?.toLowerCase().includes(lowerSearchText)
  );

  return item?.href;
}

export async function getNavigationLink(href: string, labelSearch?: string, fallback: string = href): Promise<string> {
  const navItems = await getTransformedNavigation();

  const item = navItems.find((item) => {
    const matchesHref = item.href === href;
    const matchesLabel =
      labelSearch &&
      (item.label.uk?.toLowerCase().includes(labelSearch.toLowerCase()) ||
        item.label.en?.toLowerCase().includes(labelSearch.toLowerCase()));

    return matchesHref || matchesLabel;
  });

  return item?.href || fallback;
}

export type NavigationLinkData = {
  label: string;
  href: string;
  visibility: string;
};

export type NavigationData = {
  title: string;
  links: NavigationLinkData[];
};

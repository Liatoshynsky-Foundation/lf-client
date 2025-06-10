export type NavigationLinkData = {
  label: string;
  href: string;
  visibility: boolean;
};

export type NavigationData = {
  title: string;
  links: NavigationLinkData[];
};

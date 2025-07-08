export type NavigationLinkDTO = {
  label: string;
  href: string;
  visibility: boolean;
};

export type NavigationDTO = {
  title: string;
  links: NavigationLinkDTO[];
};

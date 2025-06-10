export type ContactInfoData = {
  email?: string;
  phone?: string;
  socialLinks?: {
    platform: string;
    link: string;
    icon: string;
  }[];
};
export type FoundationNameData = {
  foundationName: string;
};

export type SupportButtonLinkData = {
  supportButtonLink?: string;
};

export type PublicInfoData = {
  copyright: string;
  links: {
    label: string;
    href: string;
  }[];
};

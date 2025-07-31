export type ContactInfoDTO = {
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    platform: string;
    link: string;
    icon: string;
  }[];
};
export type FoundationNameDTO = {
  foundationName: string;
};

export type SupportButtonLinkDTO = {
  supportButtonLink?: string;
};

export type PublicInfoDTO = {
  copyright: string;
  links: {
    label: string;
    href: string;
  }[];
};

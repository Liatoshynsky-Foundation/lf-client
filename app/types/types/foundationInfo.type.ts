import { Locale } from 'next-intl';

import { NavigationData } from './navigation.type';

export type ContactInfoData = {
  email?: string;
  phone?: string;
  contactButtonLink?: string;
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

export type FooterServiceDeps = {
  contactRepository: {
    getContactInfo(): Promise<ContactInfoData>;
  };
  brandingRepository: {
    getBrandingInfo(locale: Locale): Promise<FoundationNameData>;
    getSupportButtonLink(): Promise<SupportButtonLinkData>;
  };
  publicRepository: {
    getPublicInfo(locale: Locale): Promise<PublicInfoData>;
  };
  navigationRepository: {
    getNavigation(locale: Locale): Promise<NavigationData[]>;
  };
};

export type HeaderServiceDeps = Pick<FooterServiceDeps, 'brandingRepository' | 'navigationRepository'>;

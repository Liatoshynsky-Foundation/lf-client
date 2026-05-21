import { Breakpoint } from '@mui/material';
import { Locale } from 'next-intl';

import { SocialMediaTypes } from '~/types/enums/common.enums';

export interface ElementSizes {
  width: Partial<Record<Breakpoint, number>>;
  height: Partial<Record<Breakpoint, number>>;
}

export type LocalizedString = Record<Locale, string>;

export type ButtonGroupSizeOptions = 'small' | 'big';
export type ButtonGroupPaletteOptions = 'primary' | 'secondary' | 'tertiary';

export type ScrollDirection = 'up' | 'down';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Breakpoints = {
  isDesktop: boolean;
  isLaptopAndAbove: boolean;
  isLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
};

export type ButtonData = {
  text: string;
  link: string;
  shortText?: string;
};

export type Currency = 'UAH' | 'USD' | 'EUR' | 'GBP';
export type DonateType = 'donation' | 'subscription';

export type LinkIcon = {
  icon: string | SocialMediaTypes;
  link: string;
};

export type contactsData = {
  foundationName: string;
  address: string;
  phone: string;
  email: string;
};

export type Cookies = {
  analytics: boolean;
};

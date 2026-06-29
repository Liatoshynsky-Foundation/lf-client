import React from 'react';

import { runCommonPageTests } from '../__mocks__/runCommonPageTests';
import PrivacyPolicy from './page';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/components/blocks/privacy-policy/intro-section/IntroSection', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>Intro section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/data-we-collect/DataWeCollect', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>DataWeCollect section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/data-usage/DataUsage', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>DataUsage section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/cookies/Cookies', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>Cookies section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/google-auth/GoogleAuth', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>GoogleAuth section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/social-networks/SocialNetworks', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>SocialNetworks section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/targeted-ads/TargetedAds', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>TargetedAds section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/newsletter-subscription/NewsletterSubscription', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>NewsletterSubscription section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/data-retention/DataRetention', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>DataRetention section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/user-rights/UserRights', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>UserRights section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/contact-us/ContactUs', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>ContactUs section: {data.title}</div>
}));

jest.mock('~/shared/components/page-builder/PageBuilder');

describe('PrivacyPolicy page', () => {
  runCommonPageTests(PrivacyPolicy, 'privacy-policy');
});

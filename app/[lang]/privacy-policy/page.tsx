import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import ContactUs from '~/components/blocks/privacy-policy/contact-us/ContactUs';
import Cookies from '~/components/blocks/privacy-policy/cookies/Cookies';
import DataRetention from '~/components/blocks/privacy-policy/data-retention/DataRetention';
import DataUsage from '~/components/blocks/privacy-policy/data-usage/DataUsage';
import DataWeCollect from '~/components/blocks/privacy-policy/data-we-collect/DataWeCollect';
import GoogleAuth from '~/components/blocks/privacy-policy/google-auth/GoogleAuth';
import IntroSection from '~/components/blocks/privacy-policy/intro-section/IntroSection';
import NewsletterSubscription from '~/components/blocks/privacy-policy/newsletter-subscription/NewsletterSubscription';
import SocialNetworks from '~/components/blocks/privacy-policy/social-networks/SocialNetworks';
import TargetedAds from '~/components/blocks/privacy-policy/targeted-ads/TargetedAds';
import UserRights from '~/components/blocks/privacy-policy/user-rights/UserRights';

import { PrivacyPolicyPage } from '~/types/page/pagesBase.type';
import { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';

import { createBlockRenderer } from '~/lib/utils/createBlockRenderer';
import { ROUTES } from '~/shared/components/constants/routes';
import PageBuilder from '~/shared/components/page-builder/PageBuilder';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.privacyPolicy');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: ROUTES.PRIVACY_POLICY,
    locale: lang
  });
}

type RendererProps = {
  blocks: PrivacyPolicyPage['blocks'];
  title: string;
};

const BLOCKS_RENDERER: Record<keyof PrivacyPolicyPage['blocks'], (data: RendererProps) => React.JSX.Element> = {
  IntroSection: ({ blocks, title }) => <IntroSection data={blocks.IntroSection} title={title} />,
  DataWeCollect: ({ blocks }) => <DataWeCollect data={blocks.DataWeCollect} />,
  DataUsage: ({ blocks }) => <DataUsage data={blocks.DataUsage} />,
  Cookies: ({ blocks }) => <Cookies data={blocks.Cookies} />,
  GoogleAuth: ({ blocks }) => <GoogleAuth data={blocks.GoogleAuth} />,
  SocialNetworks: ({ blocks }) => <SocialNetworks data={blocks.SocialNetworks} />,
  TargetedAds: ({ blocks }) => <TargetedAds data={blocks.TargetedAds} />,
  NewsletterSubscription: ({ blocks }) => <NewsletterSubscription data={blocks.NewsletterSubscription} />,
  DataRetention: ({ blocks }) => <DataRetention data={blocks.DataRetention} />,
  UserRights: ({ blocks }) => <UserRights data={blocks.UserRights} />,
  ContactUs: ({ blocks }) => <ContactUs data={blocks.ContactUs} />
};

const renderComponent = createBlockRenderer<PrivacyPolicyPage['blocks']>({ BLOCKS_RENDERER });

export default async function PrivacyPolicy({ params }: Readonly<Language>) {
  const { lang } = await params;

  return <PageBuilder lang={lang} slug="privacy-policy" renderBlock={renderComponent} />;
}

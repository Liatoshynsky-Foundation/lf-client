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
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { PageNotFound } from '../[...unknown-route]/page-not-found/PageNotFound';
import { Language } from '~/types/types/language';
import { isError, UnwrapResult } from '~/types/types/result';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { ErrorPageFactory } from '~/lib/utils/errorPageFactory';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import { ROUTES } from '~/shared/components/constants/routes';

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

const BLOCKS_MAP: Record<string, ({ data }: any) => React.JSX.Element> = {
  IntroSection,
  DataWeCollect,
  DataUsage,
  Cookies,
  GoogleAuth,
  SocialNetworks,
  TargetedAds,
  NewsletterSubscription,
  DataRetention,
  UserRights,
  ContactUs
};

const getBlockComponentById = (blockId: string) => BLOCKS_MAP[blockId];

export default async function PrivacyPolicy({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const pageResult = await resolvePageData('privacy-policy', lang);

  if (isError(pageResult)) {
    return ErrorPageFactory(pageResult.error);
  }

  const page = UnwrapResult(pageResult);

  if (!page) {
    return <PageNotFound />;
  }

  const blocks = page.blocks;
  const blocksOrder = page.blocksOrder;

  return (
    <MainLayout withLines>
      {blocksOrder &&
        blocksOrder.length > 0 &&
        blocksOrder.map((blockId) => {
          const Component = getBlockComponentById(blockId);
          const blockData = blocks[blockId];
          if (!Component || !blockData) return null;

          if (blockId === 'IntroSection') {
            return (
              <Component
                key={blockId}
                data={{
                  title: page.title,
                  ...blockData
                }}
              />
            );
          }

          return <Component key={blockId} data={blockData} />;
        })}
    </MainLayout>
  );
}

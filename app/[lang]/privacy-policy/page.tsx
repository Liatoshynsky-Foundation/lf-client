import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import IntroSection from '~/components/blocks/privacy-policy/intro-section/IntroSection';
import PolicySection from '~/components/blocks/privacy-policy/policy-section/PolicySection';
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

  return (
    <MainLayout withLines>
      {blocks.IntroSection && (
        <IntroSection
          title={page.title}
          trustAndSecurity={blocks.IntroSection.trustAndSecurity}
          agreement={blocks.IntroSection.agreement}
          dataTestId="PrivacyPolicy-intro"
        />
      )}

      {blocks.DataWeCollect && (
        <PolicySection
          title={blocks.DataWeCollect.title}
          description={blocks.DataWeCollect.description}
          sections={blocks.DataWeCollect.sections}
          note={blocks.DataWeCollect.note}
          dataTestId="PrivacyPolicy-dataWeCollect"
        />
      )}

      {blocks.DataUsage && (
        <PolicySection
          title={blocks.DataUsage.title}
          description={blocks.DataUsage.description}
          list={blocks.DataUsage.list}
          dataTestId="PrivacyPolicy-dataUsage"
        />
      )}

      {blocks.Cookies && (
        <PolicySection
          title={blocks.Cookies.title}
          description={blocks.Cookies.description}
          list={blocks.Cookies.list}
          note={blocks.Cookies.note}
          dataTestId="PrivacyPolicy-cookies"
        />
      )}

      {blocks.GoogleAuth && (
        <PolicySection
          title={blocks.GoogleAuth.title}
          description={blocks.GoogleAuth.description}
          list={blocks.GoogleAuth.list}
          note={blocks.GoogleAuth.note}
          dataTestId="PrivacyPolicy-googleAuth"
        />
      )}

      {blocks.SocialNetworks && (
        <PolicySection
          title={blocks.SocialNetworks.title}
          note={blocks.SocialNetworks.description}
          dataTestId="PrivacyPolicy-socialNetworks"
        />
      )}

      {blocks.TargetedAds && (
        <PolicySection
          title={blocks.TargetedAds.title}
          note={blocks.TargetedAds.description}
          dataTestId="PrivacyPolicy-targetedAds"
        />
      )}

      {blocks.NewsletterSubscription && (
        <PolicySection
          title={blocks.NewsletterSubscription.title}
          note={blocks.NewsletterSubscription.description}
          dataTestId="PrivacyPolicy-newsletter"
        />
      )}

      {blocks.DataRetention && (
        <PolicySection
          title={blocks.DataRetention.title}
          note={blocks.DataRetention.description}
          dataTestId="PrivacyPolicy-dataRetention"
        />
      )}

      {blocks.UserRights && (
        <PolicySection
          title={blocks.UserRights.title}
          description={blocks.UserRights.description}
          list={blocks.UserRights.list}
          note={blocks.UserRights.note}
          dataTestId="PrivacyPolicy-userRights"
        />
      )}

      {blocks.ContactUs && (
        <PolicySection
          title={blocks.ContactUs.title}
          description={blocks.ContactUs.description}
          dataTestId="PrivacyPolicy-contactUs"
        />
      )}
    </MainLayout>
  );
}

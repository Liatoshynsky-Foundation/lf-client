import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import IntroSection from '~/components/blocks/privacy-policy/intro-section/IntroSection';
import PolicySection from '~/components/blocks/privacy-policy/policy-section/PolicySection';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRequestContainer } from '~/di/container';
import MainLayout from '~/layouts/main-layout/MainLayout';

export const metadata = createSeoMeta({
  title: 'Політика Конфіденційності',
  description:
    'Дізнайтесь, як Фундація Лятошинського збирає, використовує та захищає ваші персональні дані відповідно до Політики конфіденційності.',
  url: '/privacy-policy'
});

export default async function PrivacyPolicy({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  const pageService = createRequestContainer().resolve('pagesDataService');
  const page = await pageService.getPageData('privacy-policy', lang);
  const blocks = page?.blocks ?? {};

  if (Object.keys(blocks).length === 0) {
    return <></>;
  }

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

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

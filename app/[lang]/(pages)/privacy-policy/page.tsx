import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import { Language } from '~/types/types/language';

import { createRequestContainer } from '~/di/container';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import IntroSection from '~/shared/components/blocks/privacy-policy/intro-section/IntroSection';
import PolicySection from '~/shared/components/blocks/privacy-policy/policy-section/PolicySection';

export const metadata = createSeoMeta({
  title: 'Політика Конфіденційності',
  description:
    'Дізнайтесь, як Фундація Лятошинського збирає, використовує та захищає ваші персональні дані відповідно до Політики конфіденційності.',
  url: '/privacy-policy'
});

export default async function PrivacyPolicy({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  const pageService = createRequestContainer().resolve('pageService');
  const page = await pageService.getPageData('privacy-policy', lang);
  const blocks = page?.blocks ?? {};

  return (
    <>
      {blocks.IntroSection && (
        <IntroSection
          title={page.title}
          trustAndSecurity={blocks.IntroSection.trustAndSecurity}
          agreement={blocks.IntroSection.agreement}
        />
      )}

      {blocks.DataWeCollect && (
        <PolicySection
          title={blocks.DataWeCollect.title}
          description={blocks.DataWeCollect.description}
          sections={blocks.DataWeCollect.sections}
          note={blocks.DataWeCollect.note}
        />
      )}

      {blocks.DataUsage && (
        <PolicySection
          title={blocks.DataUsage.title}
          description={blocks.DataUsage.description}
          list={blocks.DataUsage.list}
        />
      )}

      {blocks.Cookies && (
        <PolicySection
          title={blocks.Cookies.title}
          description={blocks.Cookies.description}
          list={blocks.Cookies.list}
          note={blocks.Cookies.note}
        />
      )}

      {blocks.GoogleAuth && (
        <PolicySection
          title={blocks.GoogleAuth.title}
          description={blocks.GoogleAuth.description}
          list={blocks.GoogleAuth.list}
          note={blocks.GoogleAuth.note}
        />
      )}

      {blocks.SocialNetworks && (
        <PolicySection title={blocks.SocialNetworks.title} note={blocks.SocialNetworks.description} />
      )}

      {blocks.TargetedAds && <PolicySection title={blocks.TargetedAds.title} note={blocks.TargetedAds.description} />}

      {blocks.NewsletterSubscription && (
        <PolicySection title={blocks.NewsletterSubscription.title} note={blocks.NewsletterSubscription.description} />
      )}

      {blocks.DataRetention && (
        <PolicySection title={blocks.DataRetention.title} note={blocks.DataRetention.description} />
      )}

      {blocks.UserRights && (
        <PolicySection
          title={blocks.UserRights.title}
          description={blocks.UserRights.description}
          list={blocks.UserRights.list}
          note={blocks.UserRights.note}
        />
      )}

      {blocks.ContactUs && <PolicySection title={blocks.ContactUs.title} description={blocks.ContactUs.description} />}
    </>
  );
}

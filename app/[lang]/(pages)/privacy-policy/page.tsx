import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import { TipTapDoc } from '~/types/types/common.types';
import { Language } from '~/types/types/language';

import { createRequestContainer } from '~/di/container';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import { localizeField, localizeList, localizeSections } from '~/lib/utils/localize';
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

  const pagesService = createRequestContainer().resolve('pagesService');
  const page = await pagesService.getPageData('privacy-policy', lang);
  const blocks = page?.blocks ?? {};

  return (
    <>
      {blocks.IntroSection && (
        <IntroSection
          title={localizeField(page.title, lang)!}
          trustAndSecurity={localizeField(blocks.IntroSection.trustAndSecurity, lang)}
          agreement={localizeField(blocks.IntroSection.agreement, lang)}
        />
      )}
      {blocks.DataWeCollect && (
        <PolicySection
          title={localizeField(blocks.DataWeCollect.title, lang)}
          description={localizeField(blocks.DataWeCollect.description, lang)}
          sections={localizeSections(blocks.DataWeCollect.sections, lang)}
          note={localizeField(blocks.DataWeCollect.note, lang)}
        />
      )}
      {blocks.DataUsage && (
        <PolicySection
          title={localizeField(blocks.DataUsage.title, lang)}
          description={localizeField(blocks.DataUsage.description, lang)}
          list={localizeList(blocks.DataUsage.list, lang)}
        />
      )}
      {blocks.Cookies && (
        <PolicySection
          title={localizeField(blocks.Cookies.title, lang)}
          description={localizeField(blocks.Cookies.description, lang)}
          list={localizeList(blocks.Cookies.list, lang)}
          note={localizeField(blocks.Cookies.note, lang)}
        />
      )}
      {blocks.GoogleAuth && (
        <PolicySection
          title={localizeField(blocks.GoogleAuth.title, lang)}
          description={localizeField(blocks.GoogleAuth.description, lang)}
          list={localizeList(blocks.GoogleAuth.list, lang)}
          note={localizeField(blocks.GoogleAuth.note, lang)}
        />
      )}
      {blocks.SocialNetworks && (
        <PolicySection
          title={localizeField(blocks.SocialNetworks.title, lang)}
          description={localizeField(blocks.SocialNetworks.description, lang)}
        />
      )}
      {blocks.TargetedAds && (
        <PolicySection
          title={localizeField(blocks.TargetedAds.title, lang)}
          description={localizeField(blocks.TargetedAds.description, lang)}
        />
      )}
      {blocks.NewsletterSubscription && (
        <PolicySection
          title={localizeField(blocks.NewsletterSubscription.title, lang)}
          description={localizeField(blocks.NewsletterSubscription.description, lang)}
        />
      )}
      {blocks.DataRetention && (
        <PolicySection
          title={localizeField(blocks.DataRetention.title, lang)}
          description={localizeField(blocks.DataRetention.description, lang)}
        />
      )}
      {blocks.UserRights && (
        <PolicySection
          title={localizeField(blocks.UserRights.title, lang)}
          description={localizeField(blocks.UserRights.description, lang)}
          list={localizeList(blocks.UserRights.list, lang)}
          note={localizeField(blocks.UserRights.note, lang)}
        />
      )}
      {blocks.ContactUs && (
        <PolicySection
          title={localizeField(blocks.ContactUs.title, lang)}
          description={localizeField(blocks.ContactUs.description, lang)}
        />
      )}
    </>
  );
}

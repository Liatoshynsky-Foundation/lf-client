import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { PageNotFound } from '../[...unknown-route]/page-not-found/PageNotFound';
import { Language } from '~/types/types/language';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRequestContainer } from '~/di/container';
import MainLayout from '~/layouts/main-layout/MainLayout';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import CollaborationInfo from '~/shared/components/blocks/collaboration/collaboration-info/CollaborationInfo';
import CollaborationIntro from '~/shared/components/blocks/collaboration/collaboration-intro/CollaborationIntro';
import { collaborationIntroPageData } from '~/shared/components/blocks/collaboration/collaboration-intro/CollaborationIntro.consts';
import OfferCollaboration from '~/shared/components/blocks/collaboration/offer-collaboration/OfferCollaboration';
import OurPartners from '~/shared/components/blocks/our-partners/OurPartners';
import PartnershipFormats from '~/shared/components/blocks/partnership-formats/PartnershipFormats';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.cooperation');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: '/cooperation',
    locale: lang
  });
}

export default async function CollaborationPage({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const pageService = await createRequestContainer().resolve('pagesDataService');

  const page = await pageService.getPageData('cooperation', lang);

  if (!page) {
    return <PageNotFound />;
  }
  return (
    <>
      <MainLayout withLines>
        <CollaborationIntro
          title={collaborationIntroPageData[lang].title}
          subtitle={collaborationIntroPageData[lang].subtitle}
          contentAbove={collaborationIntroPageData[lang].contentAbove}
          content={collaborationIntroPageData[lang].content}
        />
        {page.blocks.partnershipFormats && <PartnershipFormats data={page.blocks.partnershipFormats} />}
        <CollaborationInfo />
        <OurPartners />
      </MainLayout>
      <OfferCollaboration />
    </>
  );
}

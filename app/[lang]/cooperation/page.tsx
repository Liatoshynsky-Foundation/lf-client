import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { Language } from '~/types/types/language';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import CollaborationInfo from '~/shared/components/blocks/collaboration/collaboration-info/CollaborationInfo';
import CollaborationIntro from '~/shared/components/blocks/collaboration/collaboration-intro/CollaborationIntro';
import { collaborationIntroPageData } from '~/shared/components/blocks/collaboration/collaboration-intro/CollaborationIntro.consts';
import OfferCollaboration from '~/shared/components/blocks/collaboration/offer-collaboration/OfferCollaboration';
import OurPartners from '~/shared/components/blocks/our-partners/OurPartners';
import { partnershipFormatsData } from '~/shared/components/blocks/partnership-formats/data';
import PartnershipFormats from '~/shared/components/blocks/partnership-formats/PartnershipFormats';

export default async function CollaborationPage({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
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
        <PartnershipFormats data={partnershipFormatsData} />
        <CollaborationInfo />
        <OurPartners />
      </MainLayout>
      <OfferCollaboration />
    </>
  );
}

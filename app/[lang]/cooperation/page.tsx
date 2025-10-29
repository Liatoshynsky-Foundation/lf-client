import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { Language } from '~/types/types/language';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import CollaborationIntro from '~/shared/components/blocks/collaboration/collaboration-intro/CollaborationIntro';
import { collaborationIntroPageData } from '~/shared/components/blocks/collaboration/collaboration-intro/CollaborationIntro.consts';

export default async function CollaborationPage({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <CollaborationIntro
        title={collaborationIntroPageData.title}
        subtitle={collaborationIntroPageData.subtitle}
        contentAbove={collaborationIntroPageData.contentAbove}
        content={collaborationIntroPageData.content}
      />
    </MainLayout>
  );
}

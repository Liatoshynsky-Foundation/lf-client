import type { Metadata } from 'next';
import { useLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import VolunteerDonation from '~/components/blocks/volunteer-donation/VolunteerDonation';
import WarCarouselSection from '~/components/blocks/war-carousel/WarCarouselSection';
import WarInfoSection from '~/components/blocks/war-info/WarInfoSection';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';
import BulletTextWithLinks from '~/ds-components/bullet-text-with-links/BulletTextWithLinks';

import type { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import {
  carsForAFU,
  carsForAFUData,
  principleOfHopeButtonLink,
  principleOfHopeButtonText,
  principleOfHopeDoc,
  principleOfHopeLinks,
  yermolenkoDoc,
  yermolenkoLinks
} from '~/[lang]/war-in-ukraine/war.const';
import MainLayout from '~/layouts/main-layout/MainLayout';
import { ROUTES } from '~/shared/components/constants/routes';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.warInUkraine');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: ROUTES.WAR_IN_UKRAINE,
    locale: lang
  });
}

export default function WarInUkraine() {
  const locale = useLocale();

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <WarInfoSection />

      <BulletTextWithLinks
        buttonText={principleOfHopeButtonText[locale]}
        buttonLink={principleOfHopeButtonLink}
        description={principleOfHopeDoc[locale]}
        buttons={principleOfHopeLinks}
      />

      <WarCarouselSection />

      <BulletTextWithLinks
        buttonText="Підтримати"
        description={yermolenkoDoc[locale]}
        buttons={yermolenkoLinks}
        showMainButton={true}
        sx={{ marginBottom: 12 }}
        showShortButtonsText={false}
      />

      <VolunteerDonation
        title={carsForAFUData.title}
        paymentMethods={carsForAFU}
        imageSrc={carsForAFUData.imageSrc}
        caption={carsForAFUData.caption[locale]}
        imageAlt="Портрет Володимира Єрмоленка з дружиною Тетяною Огарковою"
      />
    </MainLayout>
  );
}

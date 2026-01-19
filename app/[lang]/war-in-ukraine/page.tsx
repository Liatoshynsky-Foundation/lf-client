import { useLocale } from 'next-intl';
import React from 'react';

import VolunteerDonation from '~/components/blocks/volunteer-donation/VolunteerDonation';
import WarCarouselSection from '~/components/blocks/war-carousel/WarCarouselSection';
import WarInfoSection from '~/components/blocks/war-info/WarInfoSection';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';
import BulletTextWithLinks from '~/ds-components/bullet-text-with-links/BulletTextWithLinks';

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

export const metadata = createSeoMeta({
  title: 'Liatoshynsky Foundation during War in Ukraine',
  description: '',
  url: '/war-in-ukraine'
});

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
        showMainButton={false}
        sx={{ marginBottom: 12 }}
      />

      <VolunteerDonation
        title={carsForAFUData.title}
        paymentMethods={carsForAFU}
        imageSrc={carsForAFUData.imageSrc}
        caption={carsForAFUData.caption}
      />
    </MainLayout>
  );
}

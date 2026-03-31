import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import ContactsInfo from './ContactsInfo/ContactsInfo';
import { Language } from '~/types/types/language';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRequestContainer } from '~/di/container';
import ColoredLayout from '~/layouts/colored-layout/ColoredLayout';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import { ROUTES } from '~/shared/components/constants/routes';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.contacts');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: ROUTES.CONTACTS,
    locale: lang
  });
}

export default async function Contacts({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const locale = await getLocale();

  const { contacts, socialLinks } = await createRequestContainer().resolve('footerService').getFooterData(locale);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <ColoredLayout withLines>
      <ContactsInfo contacts={contacts} socialLinks={socialLinks} />
    </ColoredLayout>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import type { Language } from '~/types/types/language';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import { ROUTES } from '~/shared/components/constants/routes';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.archive');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: ROUTES.ARCHIVE,
    locale: lang
  });
}

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return children;
}

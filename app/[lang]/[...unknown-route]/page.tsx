import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Language } from '~/types/types/language';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.notFound');

  return {
    ...createSeoMeta({
      title: t('title'),
      description: t('description'),
      url: '/404',
      locale: lang
    }),
    robots: {
      index: false,
      follow: false
    }
  };
}

const UnknownRoutePage: React.FC = () => {
  notFound();
};

export default UnknownRoutePage;

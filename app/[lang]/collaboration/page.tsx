import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Language } from '~/types/types/language';

export default async function CollaborationPage({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations('collaborations');

  return <div>{t('text')}</div>;
}

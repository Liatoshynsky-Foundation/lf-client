import {
  getTranslations,
  setRequestLocale
} from 'next-intl/server';
import { LangType } from '~/types/types/lang.type';

export default async function CollaborationPage({
  params
}: Readonly<LangType>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations('collaborations');

  return <div>{t('text')}</div>;
}

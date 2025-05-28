import {
  getTranslations,
  setRequestLocale
} from 'next-intl/server';
import { ParamsWithLanguage } from '~/types/types/paramsWithLanguage';

export default async function CollaborationPage({
  params
}: Readonly<ParamsWithLanguage>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations('collaborations');

  return <div>{t('text')}</div>;
}

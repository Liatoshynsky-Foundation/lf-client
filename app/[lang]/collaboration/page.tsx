import { getTranslations } from 'next-intl/server';

export default async function CollaborationPage() {
  const t = await getTranslations('collaborations');
  return <div>{t('text')}</div>;
}

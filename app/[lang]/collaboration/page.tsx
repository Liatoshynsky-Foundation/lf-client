import { getTranslations, Locale } from '~/lib/i18n';
import type { Metadata } from 'next';

interface CollaborationPageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: CollaborationPageProps): Promise<Metadata> {
  const { lang } = await params
  const { t } = await getTranslations(lang, 'collaborations');
  return {
    title: t('meta_data'),
  };
}

export default async function CollaborationPage({ params }: CollaborationPageProps) {
    const { lang } = await params

    const { t } = await getTranslations(lang, 'collaborations');

  return <div>{t('text')}</div>;
}

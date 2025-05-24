import {
    getTranslations,
    Locale
} from '~/lib/i18n';

interface CollaborationPageProps {
  params: Promise<{ readonly lang: Locale }>;
}

export default async function CollaborationPage({ params }: CollaborationPageProps) {
    const { lang } = await params;

    const { t } = await getTranslations(lang, 'collaborations');

  return <div>{t('text')}</div>;
}

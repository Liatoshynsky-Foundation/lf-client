import { getTranslations } from 'next-intl/server';

import { Link } from '~/i18n/navigation';

export default async function CustomNotFoundPage() {
  const t = await getTranslations('common');

  return (
    <>
      <section style={{ marginBottom: '20px' }}>{t('languageNotFound')}</section>
      <Link
        href="/"
        passHref
        style={{
          color: 'yellow',
          fontWeight: 'bold',
          textDecoration: 'underline'
        }}
      >
        {t('goHome')}
      </Link>
    </>
  );
}

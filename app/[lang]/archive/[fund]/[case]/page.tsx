import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { MOCK_ARCHIVE_CASE } from './archiveCase.mock';

import MainLayout from '~/layouts/main-layout/MainLayout';
import ArchiveCaseDetails, {
  type ArchiveCaseDetailsLabels,
  type ArchiveCaseDocument
} from '~/shared/components/blocks/archive-case-details/ArchiveCaseDetails';

type ArchiveCasePageParams = {
  lang: Locale;
  fund: string;
  case: string;
};

type ArchiveCasePageProps = {
  params: Promise<ArchiveCasePageParams>;
};

export default async function ArchiveCasePage({ params }: Readonly<ArchiveCasePageProps>) {
  const { lang, fund } = await params;

  setRequestLocale(lang);

  const t = await getTranslations({ locale: lang, namespace: 'archiveCase' });

  const archiveCase = MOCK_ARCHIVE_CASE;
  const fundHref = `/${lang}/archive/${fund}`;

  const documents: ArchiveCaseDocument[] = archiveCase.documents.map((doc) => ({
    id: `${archiveCase.id}-${doc.order}`,
    title: doc.text
  }));

  const labels: ArchiveCaseDetailsLabels = {
    back: t('back'),
    metaCode: t('meta.code'),
    metaDates: t('meta.dates'),
    metaSheets: t('meta.sheets'),
    documentsAria: t('documents.ariaLabel'),
    viewPdf: t('buttons.viewPdf'),
    prevCase: t('navigation.prev'),
    nextCase: t('navigation.next')
  };

  return (
    <MainLayout withLines>
      <ArchiveCaseDetails
        title={t('pageTitle')}
        index={archiveCase.code}
        dateRange={archiveCase.dates}
        sheetsCount={archiveCase.sheetsCount}
        pdfUrl={archiveCase.pdfUrl}
        documents={documents}
        fundHref={fundHref}
        prevCase={archiveCase.prev}
        nextCase={archiveCase.next}
        labels={labels}
      />
    </MainLayout>
  );
}

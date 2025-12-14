import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { createSeoMeta } from '~/utils/createSeoMeta';

import { createRequestContainer } from '~/di/container';
import type { CaseDetailsDTO } from '~/domain/dto/funds.dto';
import MainLayout from '~/layouts/main-layout/MainLayout';
import ArchiveCaseDetails, {
  type ArchiveAdjacentCase,
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

async function getCaseDetails(caseId: string) {
  const container = createRequestContainer();
  const fundsService = container.resolve('fundsService') as {
    getCaseById: (caseId: string) => Promise<CaseDetailsDTO | null>;
  };

  return fundsService.getCaseById(caseId);
}

export async function generateMetadata({ params }: Readonly<ArchiveCasePageProps>): Promise<Metadata> {
  const { fund, case: caseId } = await params;

  const caseDetails = await getCaseDetails(caseId);

  if (!caseDetails) {
    return createSeoMeta({
      title: 'Архівна справа не знайдена',
      description: 'Запитувану архівну справу не знайдено.',
      url: `/archive/${fund}/${caseId}`
    });
  }

  const title = `Архівна справа ${caseDetails.cipher} – ${caseDetails.name}`;
  const description = `Архівна справа «${caseDetails.name}» (${caseDetails.cipher}). Дати: ${caseDetails.dates}.`;

  return createSeoMeta({
    title,
    description,
    url: `/archive/${fund}/${caseId}`
  });
}

export default async function ArchiveCasePage({ params }: Readonly<ArchiveCasePageProps>) {
  const { lang, fund, case: caseId } = await params;

  setRequestLocale(lang);

  const [t, caseDetails] = await Promise.all([
    getTranslations({ locale: lang, namespace: 'archiveCase' }),
    getCaseDetails(caseId)
  ]);

  if (!caseDetails) {
    notFound();
  }

  const fundHref = `/${lang}/archive/${fund}`;

  const documents: ArchiveCaseDocument[] =
    caseDetails.documents?.map((doc) => ({
      id: doc._id,
      title: doc.text
    })) ?? [];

  const buildCaseHref = (id: string) => `/${lang}/archive/${fund}/${id}`;

  const mapAdjacentCase = (caseItem: CaseDetailsDTO['prevCase']): ArchiveAdjacentCase | undefined => {
    if (!caseItem?._id) {
      return undefined;
    }

    return {
      href: buildCaseHref(caseItem._id),
      indexLabel: caseItem.cipher,
      title: caseItem.name
    };
  };

  const prevCase = mapAdjacentCase(caseDetails.prevCase ?? null);
  const nextCase = mapAdjacentCase(caseDetails.nextCase ?? null);

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
        title={caseDetails.name}
        index={caseDetails.cipher}
        dateRange={caseDetails.dates}
        sheetsCount={caseDetails.sheets ?? undefined}
        pdfUrl={caseDetails.pdfUrl ?? '#'}
        documents={documents}
        fundHref={fundHref}
        prevCase={prevCase}
        nextCase={nextCase}
        labels={labels}
      />
    </MainLayout>
  );
}

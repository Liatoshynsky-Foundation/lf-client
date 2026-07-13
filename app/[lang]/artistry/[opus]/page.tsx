import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { createSeoMeta } from '~/utils/createSeoMeta';
import { mapOpusDetailsToProps } from '~/utils/opusDetailsMapper';

import { createRequestContainer } from '~/di/container';
import type { OpusDetailsDTO } from '~/domain/dto/composition.dto';
import MainLayout from '~/layouts/main-layout/MainLayout';
import OpusDetails from '~/shared/components/blocks/opus-details/OpusDetails';
import type { OpusDetailsLabels } from '~/shared/components/blocks/opus-details/opusDetails.types';
import { getDynamicRoute, ROUTES } from '~/shared/components/constants/routes';

type OpusPageParams = {
  lang: Locale;
  opus: string;
};

type OpusPageProps = {
  params: Promise<OpusPageParams>;
};

type ArtistryServiceSlice = {
  getOpusDetailsById: (locale: Locale, id: string) => Promise<OpusDetailsDTO | null>;
};

async function getOpusDetails(locale: Locale, opusId: string): Promise<OpusDetailsDTO | null> {
  const container = createRequestContainer();
  const artistryService = container.resolve('artistryService') as ArtistryServiceSlice;

  return artistryService.getOpusDetailsById(locale, opusId);
}

export async function generateMetadata({ params }: Readonly<OpusPageProps>): Promise<Metadata> {
  const { lang, opus } = await params;

  const opusDetails = await getOpusDetails(lang, opus);

  if (!opusDetails) {
    return createSeoMeta({
      title: 'Опус не знайдено',
      description: 'Запитуваний опус не знайдено.',
      url: getDynamicRoute.opus(opus),
      locale: lang
    });
  }

  const title = `${opusDetails.number} — ${opusDetails.title}`;
  const description = opusDetails.description ?? `${opusDetails.title} (${opusDetails.number}).`;

  return createSeoMeta({
    title,
    description,
    url: getDynamicRoute.opus(opus),
    locale: lang
  });
}

export default async function OpusPage({ params }: Readonly<OpusPageProps>) {
  const { lang, opus } = await params;

  setRequestLocale(lang);

  const [t, opusDetails] = await Promise.all([
    getTranslations({ locale: lang, namespace: 'opusDetails' }),
    getOpusDetails(lang, opus)
  ]);

  if (!opusDetails) {
    notFound();
  }

  const labels: OpusDetailsLabels = {
    back: t('back'),
    metaNumber: t('meta.number'),
    metaDate: t('meta.date'),
    metaGenre: t('meta.genre'),
    viewSheetMusic: t('buttons.viewSheetMusic'),
    compositionsTitle: t('compositions.title'),
    videosTitle: t('videos.title'),
    placeholderTitle: t('placeholder.title'),
    placeholderSubtitle: t('placeholder.subtitle'),
    placeholderImageAlt: t('placeholder.imageAlt'),
    videoTitleFallback: t('videos.thumbnailAlt')
  };

  return (
    <MainLayout withLines>
      <OpusDetails {...mapOpusDetailsToProps(opusDetails)} backHref={`/${lang}${ROUTES.ARTISTRY}`} labels={labels} />
    </MainLayout>
  );
}

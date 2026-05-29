import { Box, Button, Typography } from '@mui/material';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ArticleDetail } from '~/components/blocks/article-detail/ArticleDetail';
import type { BlockNoteBlock } from '~/components/blocks/article-detail/BlockNoteContent';

import { styles } from './page.styles';

import { createRequestContainer } from '~/di/container';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import { formatIsoDateToDdMmYy, parseIsoDate } from '~/lib/utils/parseIsoDate';

type EventDetailPageParams = { lang: Locale; slug: string };
type EventDetailPageProps = { params: Promise<EventDetailPageParams> };

function formatTimeFromIso(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const match = /T(\d{2}):(\d{2})/.exec(iso);
  if (match) return `${match[1]}:${match[2]}`;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
}

function EventRegistrationBlock({
  dateTimeStart,
  dateTimeEnd,
  registerUrl,
  dateLabel,
  timeLabel,
  registerLabel
}: Readonly<{
  dateTimeStart: string | null;
  dateTimeEnd: string | null;
  registerUrl: string | null;
  dateLabel: string;
  timeLabel: string;
  registerLabel: string;
}>) {
  const date = formatIsoDateToDdMmYy(dateTimeStart);
  const timeStart = formatTimeFromIso(dateTimeStart);
  const timeEnd = formatTimeFromIso(dateTimeEnd);
  const timeRange = timeStart && timeEnd ? `${timeStart}-${timeEnd}` : timeStart;
  const time = timeStart ? timeRange : null;
  const parsed = parseIsoDate(dateTimeStart);

  return (
    <Box sx={styles.registrationBlock}>
      {parsed && date && (
        <Box sx={{ mb: '24px' }}>
          <Typography variant="customRegular16" sx={styles.fieldLabel}>
            {dateLabel}
          </Typography>
          <Typography variant="customSemiBold18Compact" sx={styles.fieldValue}>
            {date}
          </Typography>
        </Box>
      )}
      {parsed && time && (
        <Box sx={{ mb: registerUrl ? '32px' : 0 }}>
          <Typography variant="customRegular16" sx={styles.fieldLabel}>
            {timeLabel}
          </Typography>
          <Typography variant="customSemiBold18Compact" sx={styles.fieldValue}>
            {time}
          </Typography>
        </Box>
      )}
      {registerUrl && (
        <Box sx={styles.registerButtonWrapper}>
          <Button
            component={Link}
            href={registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            sx={styles.registerButton}
          >
            {registerLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export async function generateMetadata({ params }: Readonly<EventDetailPageProps>): Promise<Metadata> {
  const { lang, slug } = await params;
  setRequestLocale(lang);

  const container = createRequestContainer();
  const eventService = container.resolve('eventService');
  const event = await eventService.getEventBySlug(slug, lang);

  if (!event) {
    return createSeoMeta({
      title: 'Event not found',
      description: '',
      url: `/events/${slug}`,
      locale: lang
    });
  }

  return createSeoMeta({
    title: event.title,
    description: event.description,
    url: `/events/${slug}`,
    imageUrl: event.coverImage.src,
    locale: lang
  });
}

export default async function EventDetailPage({ params }: Readonly<EventDetailPageProps>) {
  const { lang, slug } = await params;
  setRequestLocale(lang);
  const container = createRequestContainer();
  const eventService = container.resolve('eventService');

  const event = await eventService.getEventBySlug(slug, lang);

  if (!event) notFound();

  interface ApiContentResponse {
    content?: { blocks: BlockNoteBlock[] };
  }
  const blocks = (event.content as ApiContentResponse)?.content?.blocks ?? [];

  const t = await getTranslations('events');
  const displayDate = event.publishedAt ? (formatIsoDateToDdMmYy(event.publishedAt) ?? '') : '';
  const registerUrl = event.ticketUrl ?? event.eventLink ?? null;

  const registrationBlock =
    event.eventDateTimeStart || registerUrl ? (
      <EventRegistrationBlock
        dateTimeStart={event.eventDateTimeStart}
        dateTimeEnd={event.eventDateTimeEnd}
        registerUrl={registerUrl}
        dateLabel={t('eventDateLabel')}
        timeLabel={t('eventTimeLabel')}
        registerLabel={t('registerButton')}
      />
    ) : undefined;

  return (
    <ArticleDetail
      lang={lang}
      date={displayDate}
      title={event.title}
      blocks={blocks}
      backLabel={t('backLabel')}
      backPath="/news?tab=events"
      registrationBlock={registrationBlock}
    />
  );
}

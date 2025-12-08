'use client';

import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { styles } from './EventItem.styles';

import { formatIsoDateToDdMmYy, parseIsoDate } from '~/lib/utils/parseIsoDate';
import { sxToArray } from '~/lib/utils/sxToArray';
import CustomLink from '~/shared/components/design-system/all-components/link/CustomLink';

export type EventItemDate = {
  startDate: string;
  endDate?: string;
};

export type EventItemAction = {
  label: string;
  href: string;
};

export type EventItemProps = {
  date?: EventItemDate;
  statusLabel?: string;
  title: string;
  publishedAt: string;
  description: string;
  image: { src: string; alt: string };
  href: string;
  actions?: ReadonlyArray<EventItemAction>;
  sx?: SxProps<Theme>;
};

type EventItemDateLabels = {
  rangeLabel: string;
  yearLabel: string;
  ariaLabel: string;
};

const buildEventItemDateLabels = (date: EventItemDate): EventItemDateLabels | null => {
  const start = parseIsoDate(date.startDate);
  if (!start) return null;

  const startLabel = `${start.day}.${start.month}`;

  const endParsed = date.endDate ? parseIsoDate(date.endDate) : null;
  const endLabel = endParsed ? `${endParsed.day}.${endParsed.month}` : undefined;

  const rangeLabel = endLabel ? `${startLabel} – ${endLabel}` : startLabel;
  const ariaLabel = `${rangeLabel} ${start.year}`.trim();

  return {
    rangeLabel,
    yearLabel: start.year,
    ariaLabel
  };
};

const EventItem = ({
  date,
  statusLabel,
  title,
  publishedAt,
  description,
  image,
  href,
  actions,
  sx
}: Readonly<EventItemProps>) => {
  const t = useTranslations('news');

  const hasStatus = Boolean(statusLabel);
  const dateLabels = !hasStatus && date?.startDate ? buildEventItemDateLabels(date) : null;
  const startDateTime = date?.startDate ?? '';

  const groupAriaLabel = hasStatus ? statusLabel : dateLabels?.ariaLabel;

  const primaryAction = actions?.[0];
  const secondaryAction = actions?.[1];

  const rootSx: SxProps<Theme> = [styles.root, ...sxToArray(sx)];
  const formattedPublishedAt = formatIsoDateToDdMmYy(publishedAt) ?? publishedAt;

  return (
    <Box component="article" sx={rootSx} data-testid="EventItem-root">
      <Box sx={styles.leftSide} data-testid="EventItem-left">
        <Box sx={styles.dateBlock} aria-label={groupAriaLabel} data-testid="EventItem-dateBlock">
          {hasStatus && (
            <Typography component="p" sx={styles.status} data-testid="EventItem-status">
              {statusLabel}
            </Typography>
          )}

          {!hasStatus && dateLabels && (
            <>
              <Typography component="p" sx={styles.dateRange} data-testid="EventItem-dateRange">
                <time dateTime={startDateTime}>{dateLabels.rangeLabel}</time>
              </Typography>

              {dateLabels.yearLabel && (
                <Typography component="span" sx={styles.yearLabel} data-testid="EventItem-year">
                  <time dateTime={startDateTime}>{dateLabels.yearLabel}</time>
                </Typography>
              )}
            </>
          )}
        </Box>

        <Box sx={styles.imageWrapper}>
          <Link href={href} aria-label={title} style={{ display: 'block', width: '100%', height: '100%' }}>
            <Box sx={styles.imageFrame}>
              <Image src={image.src} alt={image.alt} fill sizes="295px" style={{ objectFit: 'cover' }} />
            </Box>
          </Link>
        </Box>
      </Box>

      <Box sx={styles.content}>
        <Typography component="h3" sx={styles.title}>
          {title}
        </Typography>

        <Typography component="p" sx={styles.publishedAt} data-testid="EventItem-publishedAt">
          {t('publishedAtLabel')} {formattedPublishedAt}
        </Typography>

        <Typography component="p" sx={styles.description}>
          {description}
        </Typography>

        {(primaryAction || secondaryAction) && (
          <Box sx={styles.actions}>
            {primaryAction && (
              <CustomLink
                path={primaryAction.href}
                sx={styles.primaryLink}
                labelSx={styles.primaryLinkLabel}
                data-testid="EventItem-primaryCta"
              >
                {primaryAction.label}
              </CustomLink>
            )}

            {secondaryAction && (
              <CustomLink
                path={secondaryAction.href}
                sx={styles.secondaryLink}
                labelSx={styles.secondaryLinkLabel}
                endIcon={
                  <Box sx={styles.registrationIcon}>
                    <Image src="/icons/ticket.svg" alt="" width={24} height={24} aria-hidden="true" />
                  </Box>
                }
                ariaLabel={secondaryAction.label}
                data-testid="EventItem-secondaryCta"
              >
                {secondaryAction.label}
              </CustomLink>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EventItem;

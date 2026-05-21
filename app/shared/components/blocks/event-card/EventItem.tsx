'use client';

import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import Button from '~/ds-components/button/Button';

import { styles } from './EventItem.styles';

import { formatIsoDateToDdMmYy } from '~/lib/utils/parseIsoDate';
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

const buildEventItemDateLabels = (date: EventItemDate, locale: string): EventItemDateLabels | null => {
  if (!date.startDate) return null;

  const startDateObj = new Date(date.startDate);
  if (isNaN(startDateObj.getTime())) return null;
  const yearLabel = startDateObj.getFullYear().toString();

  let rangeLabel = '';

  if (date.endDate) {
    const endDateObj = new Date(date.endDate);

    const formatNumeric = (d: Date) =>
      `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}`;

    rangeLabel = `${formatNumeric(startDateObj)} – ${formatNumeric(endDateObj)}`;
  } else {
    const dateLocale = locale === 'en' ? 'en-US' : 'uk-UA';

    const formattedDate = startDateObj.toLocaleDateString(dateLocale, {
      day: 'numeric',
      month: 'long'
    });

    rangeLabel = formattedDate.toUpperCase();
  }

  return {
    rangeLabel,
    yearLabel,
    ariaLabel: `${rangeLabel} ${yearLabel}`
  };
};

const EventItem = ({
  date,
  statusLabel,
  title,
  publishedAt,
  description,
  image,
  actions,
  sx
}: Readonly<EventItemProps>) => {
  const t = useTranslations('news');

  const locale = useLocale();

  const hasStatus = Boolean(statusLabel);
  const dateLabels = !hasStatus && date?.startDate ? buildEventItemDateLabels(date, locale) : null;
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
          <Box sx={styles.imageFrame}>
            <Image src={image.src} alt={image.alt} fill sizes="295px" style={{ objectFit: 'cover' }} />
          </Box>
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
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                href={primaryAction.href}
                data-testid="EventItem-primaryCta"
              >
                {primaryAction.label}
              </Button>
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

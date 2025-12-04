'use client';

import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

import { styles } from './EventItem.styles';

import { sxToArray } from '~/lib/utils/sxToArray';
import CustomLink from '~/shared/components/design-system/all-components/link/CustomLink';

export type EventItemDate = {
  startDate: string;
  endDate?: string;
};

export type EventItemImage = { src: string; alt: string };

export type EventItemAction = {
  label: string;
  href: string;
};

export interface EventItemProps {
  date?: EventItemDate;
  statusLabel?: string;
  title: string;
  publishedAtLabel: string;
  description: string;
  image: EventItemImage;
  href: string;
  actions?: Readonly<EventItemAction[]>;
  sx?: SxProps<Theme>;
}

const parseIsoToDayMonthYear = (iso: string) => {
  const [year, month, day] = iso.split('-');

  if (!year || !month || !day) {
    return { dayMonth: iso, year: '' };
  }

  return { dayMonth: `${day}.${month}`, year };
};

const buildEventItemDateLabels = (date: EventItemDate) => {
  const { dayMonth: startLabel, year } = parseIsoToDayMonthYear(date.startDate);
  const endLabel = date.endDate ? parseIsoToDayMonthYear(date.endDate).dayMonth : undefined;

  const rangeLabel = endLabel ? `${startLabel} – ${endLabel}` : startLabel;
  const ariaLabel = year ? `${rangeLabel} ${year}` : rangeLabel;

  return { rangeLabel, yearLabel: year, ariaLabel };
};

const EventItem = ({
  date,
  statusLabel,
  title,
  publishedAtLabel,
  description,
  image,
  href,
  actions,
  sx
}: Readonly<EventItemProps>) => {
  const hasStatus = Boolean(statusLabel);
  const hasDate = Boolean(date?.startDate);

  const dateLabels = hasDate && date ? buildEventItemDateLabels(date) : null;

  const groupAriaLabel = hasStatus ? statusLabel : (dateLabels?.ariaLabel ?? undefined);

  const primaryAction = actions?.[0];
  const secondaryAction = actions?.[1];

  const rootSx: SxProps<Theme> = [styles.root, ...sxToArray(sx)];

  return (
    <Box component="article" sx={rootSx} data-testid="EventItem-root">
      <Box sx={styles.leftSide} data-testid="EventItem-left">
        <Box sx={styles.dateBlock} aria-label={groupAriaLabel} data-testid="EventItem-dateBlock">
          {hasStatus && (
            <Typography component="p" sx={styles.status} data-testid="EventItem-status">
              {statusLabel}
            </Typography>
          )}

          {!hasStatus && hasDate && dateLabels && (
            <>
              <Typography component="p" sx={styles.dateRange} data-testid="EventItem-dateRange">
                <time dateTime={date!.startDate}>{dateLabels.rangeLabel}</time>
              </Typography>
              <Typography component="span" sx={styles.yearLabel} data-testid="EventItem-year">
                <time dateTime={date!.startDate}>{dateLabels.yearLabel}</time>
              </Typography>
            </>
          )}
        </Box>

        <Box sx={styles.imageWrapper}>
          <Link href={href} aria-label={title} style={{ display: 'block' }}>
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

        <Typography component="p" sx={styles.publishedAt}>
          {publishedAtLabel}
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

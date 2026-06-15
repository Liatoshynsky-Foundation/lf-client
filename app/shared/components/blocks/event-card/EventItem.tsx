'use client';

import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import Button from '~/ds-components/button/Button';

import { styles } from './EventItem.styles';

import { type CropRect } from '~/lib/utils/cropUtils';
import { formatIsoDateToDdMmYy } from '~/lib/utils/parseIsoDate';
import { sxToArray } from '~/lib/utils/sxToArray';
import CustomLink from '~/shared/components/design-system/all-components/link/CustomLink';
import { useImageCrop } from '~/shared/hooks/use-image-crop/useImageCrop';

const FALLBACK_IMAGE = '/images/media-card-placeholder.png';

const isValidUrl = (url: string | null | undefined): url is string => {
  if (!url) return false;
  if (url.startsWith('/')) return true;
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.warn(`[EventItem:isValidUrl] Failed to parse image URL: ${url} `, error);
    return false;
  }
};

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
  dateVariant?: 'numeric' | 'text';
  statusLabel?: string;
  title: string;
  publishedAt: string;
  description: string;
  image: { src: string; alt: string; crop?: CropRect | null };
  href: string;
  actions?: ReadonlyArray<EventItemAction>;
  sx?: SxProps<Theme>;
};

type EventItemDateLabels = {
  rangeLabel: string;
  yearLabel: string;
  ariaLabel: string;
};

const buildEventItemDateLabels = (
  date: EventItemDate,
  locale: string,
  dateVariant: 'numeric' | 'text' = 'numeric'
): EventItemDateLabels | null => {
  if (!date.startDate) return null;

  const startDateObj = new Date(date.startDate);
  if (Number.isNaN(startDateObj.getTime())) return null;
  let yearLabel = startDateObj.getFullYear().toString();

  let rangeLabel = '';
  const finalYearLabel = yearLabel;
  const dateLocale = locale === 'en' ? 'en-US' : 'uk-UA';

  const formatTextMonth = (d: Date) => d.toLocaleDateString(dateLocale, { day: 'numeric', month: 'long' });

  if (date.endDate) {
    const endDateObj = new Date(date.endDate);

    if (dateVariant === 'text') {
      if (startDateObj.getFullYear() !== endDateObj.getFullYear()) {
        rangeLabel = `${formatTextMonth(startDateObj)} ${startDateObj.getFullYear()} –\n${formatTextMonth(endDateObj)} ${endDateObj.getFullYear()}`;
        yearLabel = '';
      } else {
        rangeLabel = `${formatTextMonth(startDateObj)} –\n${formatTextMonth(endDateObj)}`;
      }
    } else {
      const formatNumeric = (d: Date) =>
        `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}`;

      if (startDateObj.getFullYear() !== endDateObj.getFullYear()) {
        const formatWithYear = (d: Date) => `${formatNumeric(d)}.${d.getFullYear()}`;
        rangeLabel = `${formatWithYear(startDateObj)} –\n${formatWithYear(endDateObj)}`;
        yearLabel = '';
      } else {
        rangeLabel = `${formatNumeric(startDateObj)} – ${formatNumeric(endDateObj)}`;
      }
    }
  } else {
    rangeLabel = formatTextMonth(startDateObj);
  }

  return {
    rangeLabel,
    yearLabel: finalYearLabel,
    ariaLabel: `${rangeLabel} ${finalYearLabel}`
  };
};

const EventItem = ({
  date,
  dateVariant = 'numeric',
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

  const locale = useLocale();

  const hasStatus = Boolean(statusLabel);
  const dateLabels = !hasStatus && date?.startDate ? buildEventItemDateLabels(date, locale, dateVariant) : null;
  const startDateTime = date?.startDate ?? '';

  const groupAriaLabel = hasStatus ? statusLabel : dateLabels?.ariaLabel;

  const primaryAction = actions?.[0];
  const secondaryAction = actions?.[1];

  const rootSx: SxProps<Theme> = [styles.root, ...sxToArray(sx)];
  const formattedPublishedAt = formatIsoDateToDdMmYy(publishedAt) ?? publishedAt;

  const { containerRef, imgRef, handleImageLoad, croppedImgStyle } = useImageCrop(image.crop);

  const initialSrc = isValidUrl(image.src) ? image.src : FALLBACK_IMAGE;
  const [imageSrc, setImageSrc] = useState<string>(initialSrc);
  const isFallbackImage = imageSrc === FALLBACK_IMAGE;

  useEffect(() => {
    setImageSrc(isValidUrl(image.src) ? image.src : FALLBACK_IMAGE);
  }, [image.src]);

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
                <time dateTime={startDateTime}>
                  {dateLabels.rangeLabel.split('\n').map((line, index, array) => (
                    <span key={index}>
                      {line}
                      {index < array.length - 1 && <br />}
                    </span>
                  ))}
                </time>
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
          <Link href={href} style={{ display: 'block', width: '100%', height: '100%' }} tabIndex={-1}>
            <Box sx={styles.imageFrame} ref={containerRef}>
              {image.crop && !isFallbackImage ? (
                <img
                  ref={imgRef}
                  src={imageSrc}
                  alt={image.alt}
                  loading="lazy"
                  onLoad={handleImageLoad}
                  style={croppedImgStyle}
                  onError={() => setImageSrc(FALLBACK_IMAGE)}
                />
              ) : (
                <Image
                  src={imageSrc}
                  alt={image.alt}
                  fill
                  sizes="295px"
                  style={{ objectFit: 'cover' }}
                  onError={() => setImageSrc(FALLBACK_IMAGE)}
                />
              )}
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

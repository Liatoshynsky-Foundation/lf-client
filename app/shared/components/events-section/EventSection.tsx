'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { z } from 'zod';

import { styles } from './EventSection.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { getEventTimestamp, sortEvents } from '~/lib/utils/events';
import EventItem from '~/shared/components/blocks/event-card/EventItem';
import ButtonContentBlock from '~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock';
import { eventListItemSchema } from '~/validators/events.schema';
import { Localize } from '~/validators/localization';

type RawEventItem = Localize<z.infer<typeof eventListItemSchema>>;

interface Props {
  title: string;
  text: TipTapDoc;
  ctaLabel: string;
  ctaHref: string;
  publishDateLabel: string;
  viewLabel: string;
  regLabel: string;
  events: RawEventItem[];
}

const EventSection: React.FC<Props> = ({ title, text, ctaLabel, ctaHref, viewLabel, regLabel, events }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const locale = useLocale();
  const t = useTranslations('common');

  const sortedEvents = sortEvents(events);
  const displayedEvents = sortedEvents.slice(0, 3);

  const renderEventItem = (event: RawEventItem) => {
    const isCompleted = getEventTimestamp(event.eventDateTimeEnd, event.eventDateTimeStart) < Date.now();

    const cardActions = [{ label: viewLabel, href: `/events/${event.slug}` }];

    if (!isCompleted && event.ticketUrl) {
      const regLink = typeof event.ticketUrl === 'string' ? event.ticketUrl : event.ticketUrl[locale];
      if (regLink) {
        cardActions.push({ label: regLabel, href: regLink });
      }
    }

    return (
      <EventItem
        key={event._id}
        title={event.title}
        description={event.description}
        image={{
          src: event.coverImage?.src || '/images/placeholder.png',
          alt: event.coverImage?.alt || 'Зображення події',
          crop: event.coverImage?.crop
        }}
        href={`/events/${event.slug}`}
        date={{
          startDate: event.eventDateTimeStart ? new Date(event.eventDateTimeStart).toISOString() : '',
          endDate: event.eventDateTimeEnd ? new Date(event.eventDateTimeEnd).toISOString() : undefined
        }}
        dateVariant={isDesktop ? 'text' : 'numeric'}
        statusLabel={isCompleted ? t('completedEvent') : undefined}
        publishedAt={event.publishedAt ? new Date(event.publishedAt).toISOString() : ''}
        actions={cardActions}
      />
    );
  };

  return (
    <Box component="section" sx={styles.sectionContainer} data-testid="EventsSection">
      <Typography variant="h2" sx={styles.title}>
        {title}
      </Typography>

      <ButtonContentBlock
        buttonText={ctaLabel}
        link={ctaHref}
        content={text}
        buttonColor="tertiary"
        sx={{ maxWidth: { xs: '246px' }, minWidth: { xs: '246px' } }}
        containerSx={{ mb: { xs: '64px', md: '80px' } }}
        textSx={styles.textStyle}
        textContainerSx={{ marginBottom: { xs: '24px', md: '0px' } }}
        buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
      />

      {isMobile ? (
        <Box sx={styles.sliderWrapper}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', mb: '20px' }}>
            <Box className="event-prev" sx={styles.navButton}>
              <Box component="img" src="/icons/arrow-left.svg" alt="Previous" sx={{ width: 20, height: 20 }} />
            </Box>
            <Box className="event-next" sx={styles.navButton}>
              <Box component="img" src="/icons/arrow-right.svg" alt="Next" sx={{ width: 20, height: 20 }} />
            </Box>
          </Box>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.event-prev',
              nextEl: '.event-next'
            }}
            spaceBetween={40}
            slidesPerView={1.2}
          >
            {displayedEvents.map((event) => (
              <SwiperSlide key={event._id}>{renderEventItem(event)}</SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ) : (
        <Box sx={styles.eventsList}>{displayedEvents.map((event) => renderEventItem(event))}</Box>
      )}
    </Box>
  );
};

export default EventSection;

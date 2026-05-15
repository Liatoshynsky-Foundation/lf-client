'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { styles } from './EventSection.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

import ButtonContentBlock from '~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock';

interface EventItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  publishDate: string;
  regLink?: string;
}

interface Props {
  title: string;
  text: TipTapDoc;
  ctaLabel: string;
  ctaHref: string;
  publishDateLabel: string;
  viewLabel: string;
  regLabel: string;
  events: EventItem[];
}

const formatResponsiveDate = (dateStr: string) => {
  const year = dateStr.slice(-4);

  if (Number.isNaN(Number(year))) return dateStr;

  const separator = dateStr.slice(-5, -4);
  const hasSeparator = separator === '.' || separator === ' ';

  const mainPart = hasSeparator ? dateStr.slice(0, -5) : dateStr.slice(0, -4);
  const finalSeparator = hasSeparator ? separator : '';

  return (
    <>
      {mainPart}
      <Box
        component="span"
        sx={{
          display: {
            xs: 'inline',
            '@media (min-width: 1280px)': { display: 'none' }
          }
        }}
      >
        {finalSeparator}
      </Box>
      <Box
        component="span"
        sx={{
          display: {
            xs: 'inline',
            '@media (min-width: 1280px)': { display: 'block' }
          }
        }}
      >
        {year}
      </Box>
    </>
  );
};
const EventSection: React.FC<Props> = ({
  title,
  text,
  ctaLabel,
  ctaHref,
  publishDateLabel,
  viewLabel,
  regLabel,
  events
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const displayedEvents = events.slice(0, 3);
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
              <SwiperSlide key={event.id}>
                <Box sx={{ ...styles.eventItem, width: '100%', mb: 0 }}>
                  <Typography sx={styles.eventDate}>{formatResponsiveDate(event.date)}</Typography>
                  <Box component="img" src={event.image} alt={event.title} sx={styles.eventImage} />
                  <Box sx={styles.eventInfo}>
                    <Typography variant="h4" sx={styles.eventTitle}>
                      {event.title}
                    </Typography>
                    <Typography sx={styles.publishDate}>
                      {publishDateLabel}: {event.publishDate}
                    </Typography>
                    <Typography sx={styles.eventDescription}>{event.description}</Typography>

                    <Box sx={{ ...styles.buttonGroup, display: 'flex', gap: 1, mt: 2 }}>
                      <Button variant="outlined" fullWidth href={`/events/${event.id}`}>
                        {viewLabel}
                      </Button>
                      {event.regLink && (
                        <Button
                          variant="text"
                          href={event.regLink}
                          sx={styles.regButton}
                          endIcon={<Box component="img" src="/icons/vector.svg" sx={{ width: 20, height: 20 }} />}
                        >
                          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                            {regLabel}
                          </Box>
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ) : (
        <Box sx={styles.eventsList}>
          {displayedEvents.map((event) => (
            <Box key={event.id} sx={styles.eventItem}>
              <Typography sx={styles.eventDate}>{formatResponsiveDate(event.date)}</Typography>
              <Box component="img" src={event.image} alt={event.title} sx={styles.eventImage} />
              <Box sx={styles.eventInfo}>
                <Typography variant="h4" sx={styles.eventTitle}>
                  {event.title}
                </Typography>
                <Typography sx={styles.publishDate}>
                  {publishDateLabel}: {event.publishDate}
                </Typography>
                <Typography sx={styles.eventDescription}>{event.description}</Typography>
                <Box sx={styles.buttonGroup}>
                  <Button variant="outlined" sx={styles.actionButton} href={`/events/${event.id}`}>
                    {viewLabel}
                  </Button>
                  {event.regLink && (
                    <Button
                      variant="text"
                      href={event.regLink}
                      sx={styles.regButton}
                      endIcon={<Box component="img" src="/icons/vector.svg" sx={{ width: 20, height: 20 }} />}
                    >
                      {regLabel}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EventSection;

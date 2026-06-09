'use client';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

import EventCard, { EventItem } from './EventCard';
import { styles } from './EventSection.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { BaseSlider } from '~/shared/components/base-slider';
import ButtonContentBlock from '~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock';

interface Props {
  title: string;
  text: TipTapDoc;
  ctaLabel: string;
  ctaHref: string;
  publishDateLabel: string;
  viewLabel: string;
  regLabel: string;
  prevLabel: string;
  nextLabel: string;
  events: EventItem[];
}

const EventSection: React.FC<Props> = ({
  title,
  text,
  ctaLabel,
  ctaHref,
  publishDateLabel,
  viewLabel,
  regLabel,
  prevLabel,
  nextLabel,
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
        <BaseSlider<EventItem>
          items={displayedEvents}
          renderItem={(event) => (
            <EventCard
              event={event}
              isSlide
              publishDateLabel={publishDateLabel}
              viewLabel={viewLabel}
              regLabel={regLabel}
            />
          )}
          getItemKey={(event) => event.id}
          slidesPerView={1.2}
          spaceBetween={40}
          containerSx={styles.sliderWrapper}
          navContainerSx={styles.sliderNavContainer}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />
      ) : (
        <Box sx={styles.eventsList}>
          {displayedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isSlide={false}
              publishDateLabel={publishDateLabel}
              viewLabel={viewLabel}
              regLabel={regLabel}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EventSection;

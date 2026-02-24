import { Box, Button, Typography } from '@mui/material';
import React from 'react';

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
        sx={{ maxWidth: { xs: '246px' }, minWidth: { xs: '246px' }, backgroundColor: '#FCBD28', color: '#190D03' }}
        containerSx={{ mb: { xs: '64px', md: '80px' } }}
        textSx={styles.textStyle}
        textContainerSx={{ marginBottom: { xs: '24px', md: '0px' } }}
        buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
      />

      <Box sx={styles.eventsList}>
        {displayedEvents.map((event) => (
          <Box key={event.id} sx={styles.eventItem}>
            <Typography sx={styles.eventDate}>{event.date}</Typography>
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
    </Box>
  );
};

export default EventSection;

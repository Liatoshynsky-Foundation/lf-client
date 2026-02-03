import { Box, Button, Typography } from '@mui/material';
import React from 'react';

import { styles } from './EventSection.styles';

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
  text: string;
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
      {/* Replace 44-56 lines with ButtonContentBlock component */}
      <Button
        variant="contained"
        href={ctaHref}
        sx={styles.mainCta}
        endIcon={<Box component="img" src="/icons/arrow-up-right.svg" sx={{ width: 24, height: 24 }} />}
      >
        {ctaLabel}
      </Button>

      <Box sx={styles.descriptionWrapper}>
        <Typography sx={styles.descriptionText}>{text}</Typography>
      </Box>

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

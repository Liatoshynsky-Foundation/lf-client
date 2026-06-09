'use client';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

import { styles } from './EventSection.styles';

export interface EventItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  publishDate: string;
  regLink?: string;
}

interface EventCardProps {
  event: EventItem;
  isSlide: boolean;
  publishDateLabel: string;
  viewLabel: string;
  regLabel: string;
}

const formatResponsiveDate = (dateStr: string): React.ReactNode => {
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

const EventCard: React.FC<EventCardProps> = ({ event, isSlide, publishDateLabel, viewLabel, regLabel }) => (
  <Box sx={isSlide ? { ...styles.eventItem, width: '100%', mb: 0 } : styles.eventItem}>
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
      <Box sx={isSlide ? { ...styles.buttonGroup, display: 'flex', gap: 1, mt: 2 } : styles.buttonGroup}>
        <Button
          variant="outlined"
          fullWidth={isSlide}
          sx={isSlide ? undefined : styles.actionButton}
          href={`/events/${event.id}`}
        >
          {viewLabel}
        </Button>
        {event.regLink && (
          <Button
            variant="text"
            href={event.regLink}
            sx={styles.regButton}
            endIcon={<Box component="img" src="/icons/vector.svg" sx={{ width: 20, height: 20 }} />}
          >
            {isSlide ? (
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {regLabel}
              </Box>
            ) : (
              regLabel
            )}
          </Button>
        )}
      </Box>
    </Box>
  </Box>
);

export default EventCard;

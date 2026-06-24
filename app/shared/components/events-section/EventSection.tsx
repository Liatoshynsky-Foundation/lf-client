'use client';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { styles } from './EventSection.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { mapEventToCardProps, RawEventItem, sortEvents } from '~/lib/utils/events';
import { BaseSlider } from '~/shared/components/base-slider';
import EventItem from '~/shared/components/blocks/event-card/EventItem';
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
  events: RawEventItem[];
}

const EventSection: React.FC<Props> = ({
  title,
  text,
  ctaLabel,
  ctaHref,
  viewLabel,
  regLabel,
  prevLabel,
  nextLabel,
  events
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const locale = useLocale();
  const t = useTranslations('common');

  const sortedEvents = sortEvents(events);
  const displayedEvents = sortedEvents.slice(0, 3);

  const renderEventItem = (event: RawEventItem): React.ReactNode => {
    const cardProps = mapEventToCardProps(
      event,
      locale,
      t('completedEvent'),
      viewLabel,
      regLabel,
      isDesktop ? 'text' : 'numeric'
    );

    return <EventItem key={event._id} {...cardProps} />;
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
        <BaseSlider<RawEventItem>
          items={displayedEvents}
          renderItem={renderEventItem}
          getItemKey={(event) => event._id}
          slidesPerView={1.2}
          spaceBetween={40}
          containerSx={styles.sliderWrapper}
          navContainerSx={styles.sliderNavContainer}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />
      ) : (
        <Box sx={styles.eventsList}>{displayedEvents.map((event) => renderEventItem(event))}</Box>
      )}
    </Box>
  );
};

export default EventSection;

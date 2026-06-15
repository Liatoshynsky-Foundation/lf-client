'use client';

import { Box } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { z } from 'zod';

import Button from '~/ds-components/button/Button';
import Pagination from '~/ds-components/pagination/Pagination';
import { usePagination } from '~/hooks/use-pagination/usePagination';

import { styles } from './EventsTab.style';

import EventItem from '~/shared/components/blocks/event-card/EventItem';
import EmptyState from '~/shared/components/design-system/all-components/empty-state/EmptyState';
import { IMAGES } from '~/shared/constants/assets';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { eventListItemSchema } from '~/validators/events.schema';
import { Localize } from '~/validators/localization';

type RawEventItem = Localize<z.infer<typeof eventListItemSchema>>;

interface EventsTabProps {
  eventsData: RawEventItem[];
  itemsPerPage?: number;
  tabSx?: object;
}

const getEventTimestamp = (endDate?: string | null, startDate?: string | null) => {
  if (endDate) return new Date(endDate).getTime();
  if (startDate) return new Date(startDate).getTime();
  return 0;
};

const EventsTab = ({ eventsData, itemsPerPage = 6, tabSx }: EventsTabProps) => {
  const locale = useLocale();
  const t = useTranslations('common');
  const tEmpty = useTranslations('media.emptyState');
  const breakpoint = useBreakpoints();

  const events = useMemo(() => {
    const nowTime = Date.now();

    const upcomingEvents = eventsData
      .filter((e) => getEventTimestamp(e.eventDateTimeEnd, e.eventDateTimeStart) >= nowTime)
      .sort((a, b) => new Date(a.eventDateTimeStart || 0).getTime() - new Date(b.eventDateTimeStart || 0).getTime());

    const completedEvents = eventsData
      .filter((e) => getEventTimestamp(e.eventDateTimeEnd, e.eventDateTimeStart) < nowTime)
      .sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });

    return [...upcomingEvents, ...completedEvents];
  }, [eventsData]);

  const { hasMore, paginatedData, currentPage, totalPages, visiblePages, handleLoadMore, handlePageChange } =
    usePagination({
      data: events,
      itemsPerPage
    });

  const tabRef = useRef<HTMLDivElement | null>(null);
  const shouldScrollRef = useRef(false);

  useLayoutEffect(() => {
    if (!shouldScrollRef.current) return;
    shouldScrollRef.current = false;
    const el = tabRef.current;
    if (!el) return;
    const OFFSET = 120;
    const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChangeWithScroll = (page: number) => {
    shouldScrollRef.current = true;
    handlePageChange(page);
  };

  if (events.length === 0) {
    return (
      <EmptyState
        dataTestId="EmptyState-events"
        title={tEmpty('events.title')}
        description={tEmpty('events.description')}
      />
    );
  }

  return (
    <Box ref={tabRef} sx={{ ...styles.container, ...tabSx }} data-testid="EventsTab">
      {paginatedData.map((event) => {
        const isCompleted = getEventTimestamp(event.eventDateTimeEnd, event.eventDateTimeStart) < Date.now();

        const cardActions = [{ label: 'Переглянути', href: `/news/${event.slug}` }];

        if (!isCompleted && event.ticketUrl) {
          const regLink = typeof event.ticketUrl === 'string' ? event.ticketUrl : event.ticketUrl[locale];
          if (regLink) {
            cardActions.push({ label: 'Реєстрація', href: regLink });
          }
        }

        return (
          <EventItem
            key={event._id}
            title={event.title}
            description={event.description}
            image={{
              src: event.coverImage?.src || IMAGES.PLACEHOLDER,
              alt: event.coverImage?.alt || 'Зображення події',
              crop: event.coverImage?.crop
            }}
            href={`/news/${event.slug}`}
            date={{
              startDate: event.eventDateTimeStart ? new Date(event.eventDateTimeStart).toISOString() : '',
              endDate: event.eventDateTimeEnd ? new Date(event.eventDateTimeEnd).toISOString() : undefined
            }}
            statusLabel={isCompleted ? t('completedEvent') : undefined}
            publishedAt={event.publishedAt ? new Date(event.publishedAt).toISOString() : ''}
            actions={cardActions}
          />
        );
      })}

      <Box sx={styles.paginationWrapper} data-testid="EventsTab-paginationWrapper">
        {hasMore && (
          <Button
            data-testid="EventsTab-loadMore"
            variant="contained"
            size="large"
            onClick={handleLoadMore}
            sx={styles.loadMoreButton}
          >
            {t('viewMore')}
          </Button>
        )}
        {totalPages > 1 && (
          <Pagination
            hasMore={hasMore}
            count={totalPages}
            siblingCount={breakpoint.isMobile || breakpoint.isTablet ? 0 : 1}
            page={currentPage}
            visiblePages={visiblePages}
            onChange={(_, page) => handlePageChangeWithScroll(page)}
          />
        )}
      </Box>
    </Box>
  );
};

export default EventsTab;

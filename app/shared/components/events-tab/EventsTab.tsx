'use client';

import { Box } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { z } from 'zod';

import Button from '~/ds-components/button/Button';
import Pagination from '~/ds-components/pagination/Pagination';
import { usePagination } from '~/hooks/use-pagination/usePagination';

import { styles } from './EventsTab.style';

import { mapEventToCardProps, sortEvents } from '~/lib/utils/events';
import EventItem from '~/shared/components/blocks/event-card/EventItem';
import EmptyState from '~/shared/components/design-system/all-components/empty-state/EmptyState';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { eventListItemSchema } from '~/validators/events.schema';
import { Localize } from '~/validators/localization';

type RawEventItem = Localize<z.infer<typeof eventListItemSchema>>;

interface EventsTabProps {
  eventsData: RawEventItem[];
  itemsPerPage?: number;
  tabSx?: object;
}

const EventsTab = ({ eventsData, itemsPerPage = 6, tabSx }: EventsTabProps) => {
  const locale = useLocale();
  const t = useTranslations('common');
  const tEmpty = useTranslations('media.emptyState');
  const tEvents = useTranslations('events');
  const breakpoint = useBreakpoints();

  const events = useMemo(() => {
    return sortEvents(eventsData);
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
        const cardProps = mapEventToCardProps(
          event,
          locale,
          t('completedEvent'),
          tEvents('viewButton'),
          tEvents('registerButton'),
          'numeric'
        );

        return <EventItem key={event._id} {...cardProps} />;
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

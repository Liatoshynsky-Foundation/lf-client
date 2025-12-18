'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useLayoutEffect, useMemo, useRef } from 'react';

import Button from '~/ds-components/button/Button';
import Pagination from '~/ds-components/pagination/Pagination';
import { usePagination } from '~/hooks/use-pagination/usePagination';

import { styles } from './EventsTab.style';

import EventItem from '~/shared/components/blocks/event-card/EventItem';
import { MOCK_EVENT_ITEMS } from '~/shared/components/blocks/event-card/EventItem.fixture';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface EventsTabProps {
  itemsPerPage?: number;
  tabSx?: object;
}

const EventsTab = ({ itemsPerPage = 6, tabSx }: EventsTabProps) => {
  const t = useTranslations('common');
  const breakpoint = useBreakpoints();

  const events = useMemo(() => {
    const eventsData = [...MOCK_EVENT_ITEMS];
    const upcomingEvents = eventsData
      .filter((e) => !e.props.statusLabel)
      .sort((a, b) => a.props.date!.startDate.localeCompare(b.props.date!.startDate));
    const completedEvents = eventsData
      .filter((e) => e.props.statusLabel)
      .sort((a, b) => a.props.publishedAt.localeCompare(b.props.publishedAt));
    return [...upcomingEvents, ...completedEvents];
  }, []);

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

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }, [currentPage]);

  const handlePageChangeWithScroll = (page: number) => {
    shouldScrollRef.current = true;
    handlePageChange(page);
  };

  return (
    <Box ref={tabRef} sx={{ ...styles.container, ...tabSx }} data-testid="EventsTab">
      {paginatedData.map(({ id, props }) => (
        <EventItem key={id} {...props} />
      ))}
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

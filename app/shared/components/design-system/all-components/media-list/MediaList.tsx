'use client';
import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useLayoutEffect, useRef } from 'react';

import BaseCard, { Variant } from '../base-card/BaseCard';
import Pagination from '../pagination/Pagination';
import { styles } from './MediaList.styles';

import { newsPressCardItem } from '~/shared/components/blocks/media-center/MediaCenter';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { usePagination } from '~/shared/hooks/use-pagination/usePagination';

interface MediaListProps {
  data: newsPressCardItem[];
  itemsPerPage?: number;
  variant: Variant;
  dataTestId: string;
}

function MediaList({ data, itemsPerPage = 9, variant, dataTestId }: Readonly<MediaListProps>) {
  const { isMobile, isTablet } = useBreakpoints();
  const t = useTranslations('common');

  const { hasMore, paginatedData, currentPage, totalPages, visiblePages, handlePageChange, handleLoadMore } =
    usePagination({
      data,
      itemsPerPage
    });

  const tableRef = useRef<HTMLDivElement | null>(null);
  const shouldScrollRef = useRef(false);

  useLayoutEffect(() => {
    if (!shouldScrollRef.current) return;
    shouldScrollRef.current = false;

    const el = tableRef.current;
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const handlePageChangeWithScroll = (page: number) => {
    shouldScrollRef.current = true;
    handlePageChange(page);
  };
  return (
    <>
      <Box
        data-testid={`${dataTestId}List`}
        role="list"
        aria-label="Список медіаматеріалів"
        ref={tableRef}
        sx={styles.cardsContainer}
      >
        {paginatedData.map((newsItem) => (
          <BaseCard
            aria-label={`Матеріал: ${newsItem.title}`}
            variant={variant}
            href={`/${variant}/${newsItem._id}`}
            key={newsItem._id}
            description={newsItem.description}
            image={newsItem.coverImage.src}
            title={newsItem.title}
            publicationDate={new Date(newsItem.publishedAt).toLocaleDateString('uk-UA')}
          />
        ))}
      </Box>
      <Box data-testid="MixPagination" sx={styles.paginationWrapper}>
        {hasMore && (
          <Button
            aria-label="Показати більше матеріалів"
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
            aria-label="Пагінація списку медіа"
            hasMore={hasMore}
            count={totalPages}
            siblingCount={isMobile || isTablet ? 0 : 1}
            page={currentPage}
            visiblePages={visiblePages}
            onChange={(_, page) => handlePageChangeWithScroll(page)}
          />
        )}
      </Box>
    </>
  );
}

export default MediaList;

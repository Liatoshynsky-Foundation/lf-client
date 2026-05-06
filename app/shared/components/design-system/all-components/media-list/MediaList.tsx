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
  mediaData: newsPressCardItem[];
  itemsPerPage?: number;
  variant: Variant;
  dataTestId: string;
}

function MediaList({ mediaData, itemsPerPage = 9, variant, dataTestId }: Readonly<MediaListProps>) {
  const { hasMore, paginatedData, currentPage, totalPages, visiblePages, handlePageChange, handleLoadMore } =
    usePagination({
      data: mediaData,
      itemsPerPage
    });

  const { isMobile, isTablet } = useBreakpoints();

  const listRef = useRef<HTMLDivElement | null>(null);
  const shouldScrollRef = useRef(false);

  const t = useTranslations('common');

  useLayoutEffect(() => {
    if (!shouldScrollRef.current) return;
    shouldScrollRef.current = false;

    const el = listRef.current;
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
        ref={listRef}
        sx={styles.cardsContainer}
      >
        {paginatedData.map((newsItem) => {
          const href =
            variant === 'press' && 'url' in newsItem && typeof newsItem.url === 'string'
              ? newsItem.url
              : `/${variant}/${newsItem.slug ?? newsItem._id}`;

          return (
            <BaseCard
              aria-label={`Матеріал: ${newsItem.title}`}
              variant={variant}
              href={href}
              key={newsItem._id}
              description={newsItem.description}
              image={newsItem.coverImage.src}
              title={newsItem.title}
              publicationDate={new Date(newsItem.publishedAt || '').toLocaleDateString('uk-UA')}
            />
          );
        })}
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

import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useLayoutEffect, useRef } from 'react';

import { styles } from './MobileDocumentTable.styles';
import { DocumentRecord } from '~/types/types/document.types';

import Pagination from '~/shared/components/design-system/all-components/pagination/Pagination';
import ControlPanel from '~/shared/components/enhanced-table/control-panel/ControlPanel';
import TableCardList from '~/shared/components/tables/DocumentsTable/TableCardList/TableCardList';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { usePagination } from '~/shared/hooks/use-pagination/usePagination';

interface MobileDocumentTableProps {
  data: DocumentRecord[];
  tableName: string;
  itemsPerPage?: number;
  Search?: React.ReactNode;
  Filters?: React.ReactNode;
}

export default function MobileDocumentTable({
  data,
  tableName,
  itemsPerPage = 10,
  Search,
  Filters
}: Readonly<MobileDocumentTableProps>) {
  const { isMobile, isTablet } = useBreakpoints();
  const t = useTranslations('common');
  const { hasMore, paginatedData, currentPage, totalPages, visiblePages, handleLoadMore, handlePageChange } =
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
    <Box sx={styles.tableContainer}>
      <ControlPanel
        sx={{ gridColumn: '1 / -1', pt: 20, height: 'fit-content' }}
        Search={Search}
        tableName={tableName}
        Filters={Filters}
        activeFiltersCount={0}
      />
      <TableCardList tableRef={tableRef} paginatedData={paginatedData} />
      <Box data-testid="pagination" sx={styles.paginationWrapper}>
        {hasMore && (
          <Button variant="contained" size="large" onClick={handleLoadMore} sx={styles.loadMoreButton}>
            {t('viewMore')}
          </Button>
        )}
        {totalPages > 1 && (
          <Pagination
            hasMore={hasMore}
            count={totalPages}
            siblingCount={isMobile || isTablet ? 0 : 1}
            page={currentPage}
            visiblePages={visiblePages}
            onChange={(_, page) => handlePageChangeWithScroll(page)}
          />
        )}
      </Box>
    </Box>
  );
}

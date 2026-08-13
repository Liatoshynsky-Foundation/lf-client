'use client';

import {
  Box,
  CircularProgress,
  Paper,
  type SxProps,
  Table,
  TableBody,
  TableContainer,
  type Theme
} from '@mui/material';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  OnChangeFn,
  type Row,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import Button from '~/ds-components/button/Button';
import Pagination from '~/ds-components/pagination/Pagination';
import { usePagination } from '~/hooks/use-pagination/usePagination';

import { CollapsibleRow } from './collapsible-row/CollapsibleRow';
import ControlPanel from './control-panel/ControlPanel';
import EnhancedTableHeader from './enhanced-table-header/EnhancedTableHeader';
import EnhancedTableRow from './enhanced-table-row/EnhancedTableRow';
import { enhancedTableStyles as styles } from './EnhancedTable.styles';
import type { CollapsibleGroupColumnMeta, RowData } from '~/types/types/enhancedTable';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

type ItemOrGroup<T> = { type: 'group'; label: string; items: T[] } | { type: 'single'; row: Row<T> };

interface EnhancedTableProps<T extends RowData> {
  data: T[];
  columns: ColumnDef<T>[];
  columnWidths?: Record<string, string>;
  groupByKey?: keyof T;
  itemsPerPage?: number;
  tableName: string;
  defaultSorting?: SortingState;
  Search?: React.ReactNode;
  Filters?: React.ReactNode;
  isFiltersActive?: boolean;
  activeFiltersCount?: number;
  onClearFilters?: () => void;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  enableClientSorting?: boolean;
  loading?: boolean;
  noResults?: React.ReactNode;
  rowSx?: object;
  tableContainerSx?: SxProps<Theme>;
  onRowClick?: (row: T) => void;
  isSearchActive?: boolean;
  preGroupedData?: { label: string; items: T[] }[];
}

export const EnhancedTable = <T extends RowData>({
  data,
  columns,
  columnWidths = {},
  groupByKey,
  itemsPerPage = 10,
  tableName,
  Search,
  Filters,
  activeFiltersCount,
  columnFilters,
  onColumnFiltersChange,
  defaultSorting = [],
  loading = false,
  noResults,
  rowSx,
  tableContainerSx,
  onRowClick,
  isSearchActive = false,
  preGroupedData
}: Readonly<EnhancedTableProps<T>>) => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const t = useTranslations('common');

  const breakpoint = useBreakpoints();

  const toggleGroupCollapse = (groupLabel: string) => {
    setCollapsedGroups((prev) => {
      const currentState = prev[groupLabel] ?? isSearchActive;
      return {
        ...prev,
        [groupLabel]: !currentState
      };
    });
  };

  const getGroupColumns = <T extends RowData>(columns: ColumnDef<T>[], groupItems: T[]): ColumnDef<T>[] =>
    columns.map((col) => {
      const meta = col.meta as CollapsibleGroupColumnMeta<T> | undefined;

      return {
        ...col,
        meta: {
          ...meta,
          groupLabelContent: meta?.groupLabelContentFactory?.(groupItems)
        }
      };
    });

  const headerTable = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange,
    getFilteredRowModel: getFilteredRowModel(),
    manualFiltering: true
  });

  const filteredAndSortedRows = headerTable.getRowModel().rows;

  const { groupedItems, flatRows } = useMemo(() => {
    const grouped = new Map<string, T[]>();
    const ungrouped: Row<T>[] = [];

    for (const row of filteredAndSortedRows) {
      const item = row.original;
      const groupKey = groupByKey ? String(item[groupByKey] ?? '') : undefined;

      if (groupKey) {
        grouped.set(groupKey, [...(grouped.get(groupKey) ?? []), item]);
      } else {
        ungrouped.push(row);
      }
    }

    return { groupedItems: grouped, flatRows: ungrouped };
  }, [filteredAndSortedRows, groupByKey]);

  const allRows: ItemOrGroup<T>[] = useMemo(() => {
    if (preGroupedData) {
      return preGroupedData.map((g) => ({
        type: 'group' as const,
        label: g.label,
        items: g.items
      }));
    }
    return [
      ...Array.from(groupedItems.entries()).map(([label, items]) => ({
        type: 'group' as const,
        label,
        items
      })),
      ...flatRows.map((row) => ({
        type: 'single' as const,
        row
      }))
    ];
  }, [groupedItems, flatRows, preGroupedData]);

  const {
    hasMore,
    paginatedData: rowsToRender,
    currentPage,
    totalPages,
    visiblePages,
    handleLoadMore,
    handlePageChange
  } = usePagination({
    data: allRows,
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
    <Box ref={tableRef} sx={{ ...styles.root, ...tableContainerSx }} data-testid="EnhancedTable">
      <ControlPanel
        Search={Search}
        tableName={tableName}
        Filters={Filters}
        activeFiltersCount={activeFiltersCount ?? 0}
      />
      {loading ? (
        <Box sx={styles.loaderBox}>
          <CircularProgress aria-label={t('loading')} />
        </Box>
      ) : (
        <>
          <TableContainer data-testid="EnhancedTable-tableContainer" component={Paper} sx={styles.container}>
            <Table sx={{ tableLayout: 'fixed' }} data-testid="EnhancedTable-table">
              <EnhancedTableHeader table={headerTable} columnWidths={columnWidths} />
              <TableBody data-testid="EnhancedTable-tableBody">
                {!loading && allRows.length === 0 && noResults}
                {rowsToRender.map((entry) =>
                  entry.type === 'group' ? (
                    <CollapsibleRow
                      key={`group-${entry.label}`}
                      data={entry.items}
                      collapsed={collapsedGroups[entry.label] ?? isSearchActive}
                      action={() => toggleGroupCollapse(entry.label)}
                      columns={getGroupColumns(columns, entry.items)}
                    />
                  ) : (
                    <EnhancedTableRow key={entry.row.id} row={entry.row} sx={rowSx} onClick={onRowClick} />
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={styles.paginationWrapper} data-testid="EnhancedTable-paginationWrapper">
            {hasMore && (
              <Button
                data-testid="Pagination-loadMore"
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
        </>
      )}
    </Box>
  );
};

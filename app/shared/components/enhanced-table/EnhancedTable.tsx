'use client';

import { Box, CircularProgress, Paper, Table, TableBody, TableContainer } from '@mui/material';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

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

type ItemOrGroup<T> = { type: 'group'; label: string; items: T[] } | { type: 'single'; item: T };

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
  noResults
}: Readonly<EnhancedTableProps<T>>) => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const t = useTranslations('common');

  const breakpoint = useBreakpoints();

  const toggleGroupCollapse = (groupLabel: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel]
    }));
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

  const filteredAndSortedRows = headerTable.getRowModel().rows.map((row) => row.original);

  const { groupedItems, flatItems } = useMemo(() => {
    const grouped = new Map<string, T[]>();
    const ungrouped: T[] = [];

    for (const item of filteredAndSortedRows) {
      const groupKey = groupByKey ? String(item[groupByKey] ?? '') : undefined;

      if (groupKey) {
        grouped.set(groupKey, [...(grouped.get(groupKey) ?? []), item]);
      } else {
        ungrouped.push(item);
      }
    }

    return { groupedItems: grouped, flatItems: ungrouped };
  }, [filteredAndSortedRows, groupByKey]);

  const allRows: ItemOrGroup<T>[] = useMemo(
    () => [
      ...Array.from(groupedItems.entries()).map(([label, items]) => ({
        type: 'group' as const,
        label,
        items
      })),
      ...flatItems.map((item) => ({
        type: 'single' as const,
        item
      }))
    ],
    [groupedItems, flatItems]
  );

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

  return (
    <Box sx={styles.root} data-testid="EnhancedTable">
      <ControlPanel
        Search={Search}
        tableName={tableName}
        Filters={Filters}
        activeFiltersCount={activeFiltersCount ?? 0}
      />
      {loading ? (
        <Box sx={styles.loaderBox}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer data-testid="EnhancedTable-tableContainer" component={Paper} sx={styles.container}>
            <Table sx={{ tableLayout: 'fixed' }} data-testid="EnhancedTable-table">
              <EnhancedTableHeader table={headerTable} columnWidths={columnWidths} />
              <TableBody data-testid="EnhancedTable-tableBody">
                {!loading && data.length === 0 && noResults}
                {rowsToRender.map((entry) =>
                  entry.type === 'group' ? (
                    <CollapsibleRow
                      key={`group-${entry.label}`}
                      data={entry.items}
                      collapsed={collapsedGroups[entry.label] ?? false}
                      action={() => toggleGroupCollapse(entry.label)}
                      columns={getGroupColumns(columns, entry.items)}
                    />
                  ) : (
                    <EnhancedTableRow key={entry.item.id} data={entry.item} table={headerTable} />
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={styles.paginationWrapper} data-testid="EnhancedTable-paginationWrapper">
            {hasMore && (
              <Button variant="contained" size="large" onClick={handleLoadMore} sx={styles.loadMoreButton}>
                {t('viewMore')}
              </Button>
            )}
            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                siblingCount={breakpoint.isMobile || breakpoint.isTablet ? 0 : 1}
                page={currentPage}
                visiblePages={visiblePages}
                onChange={(_, page) => handlePageChange(page)}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

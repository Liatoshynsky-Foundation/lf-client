'use client';

import { Box, CircularProgress, Paper, Table, TableBody, TableContainer, Typography } from '@mui/material'; // Added CircularProgress
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
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import Button from '~/ds-components/button/Button';
import Pagination from '~/ds-components/pagination/Pagination';
import { usePagination } from '~/hooks/use-pagination/usePagination';

import { MusicSearch } from '../composition-search/MusicSearch';
import { CollapsibleRow } from './collapsible-row/CollapsibleRow';
import EnhancedTableHeader from './enhanced-table-header/EnhancedTableHeader';
import EnhancedTableRow from './enhanced-table-row/EnhancedTableRow';
import { enhancedTableStyles as styles } from './EnhancedTable.styles';
import type { CollapsibleGroupColumnMeta, RowData } from '~/types/types/enhancedTable';

type ItemOrGroup<T> = { type: 'group'; label: string; items: T[] } | { type: 'single'; item: T };

interface EnhancedTableProps<T extends RowData> {
  columns: ColumnDef<T>[];
  columnWidths?: Record<string, string>;
  groupByKey?: keyof T;
  itemsPerPage?: number;
  tableName: string;
  defaultSorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  enableClientSorting?: boolean;
  loading?: boolean;
}

export default function EnhancedTable<T extends RowData>({
  columns,
  columnWidths = {},
  groupByKey,
  itemsPerPage = 10,
  tableName,
  columnFilters,
  onColumnFiltersChange,
  defaultSorting = [],
  loading = false
}: Readonly<EnhancedTableProps<T>>) {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const t = useTranslations('common');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (search) {
      newParams.set('search', search);
      router.refresh();
    } else {
      newParams.delete('search');
      router.refresh();
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
  }, [router, search, searchParams, isLoading]);
  //const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const endpoint = `/api/compositions?lang=${'uk'}&search=${encodeURIComponent(search)}`;
      const res = await fetch(endpoint);
      const json = await res.json();
      setData(json);
      setIsLoading(false);
    };

    fetchData();
  }, [search]);
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
    getFilteredRowModel: getFilteredRowModel()
  });

  const filteredAndSortedRows = useMemo(() => {
    return headerTable.getRowModel().rows.map((row) => row.original);
  }, [headerTable]);

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
  console.log(data);
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
    <Box sx={styles.root}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%', mb: 2 }}>
        <Typography variant="customBold32" sx={styles.title}>
          {tableName}
        </Typography>
        <MusicSearch search={search} setSearch={setSearch}></MusicSearch>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={styles.container}>
          <Table>
            <EnhancedTableHeader table={headerTable} columnWidths={columnWidths} />
            <TableBody>
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
      )}

      <Box sx={styles.paginationWrapper}>
        {hasMore && (
          <Button variant="contained" size="large" onClick={handleLoadMore}>
            {t('viewMore')}
          </Button>
        )}

        <Pagination
          count={totalPages}
          page={currentPage}
          visiblePages={visiblePages}
          onChange={(_, page) => handlePageChange(page)}
        />
      </Box>
    </Box>
  );
}

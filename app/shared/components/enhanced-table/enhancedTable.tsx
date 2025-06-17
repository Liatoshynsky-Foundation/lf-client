'use client';

import { Box, Pagination, Paper, Table, TableBody, TableContainer, Typography } from '@mui/material';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { usePagination } from '~/hooks/use-pagination/usePagination';

import Button from '../design-system/all-components/button/Button';
import { CollapsibleRow } from './CollapsibleRow';
import { enhancedTableStyles as styles } from './EnhancedTable.styles';
import TableHeader from './EnhancedTableHeader';
import EnhancedTableRow from './EnhancedTableRow';

type ItemOrGroup<T> = { type: 'group'; label: string; items: T[] } | { type: 'single'; item: T };

type EnhancedTableProps<T extends { id: number }> = {
  data: T[];
  columns: ColumnDef<T>[];
  columnWidths?: Record<string, string>;
  groupByKey?: keyof T;
  itemsPerPage?: number;
};

export default function EnhancedTable<T extends { id: number }>({
  data,
  columns,
  columnWidths = {},
  groupByKey,
  itemsPerPage = 10
}: EnhancedTableProps<T>) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroupCollapse = (groupLabel: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel]
    }));
  };

  const { groupedItems, flatItems } = useMemo(() => {
    const grouped = new Map<string, T[]>();
    const ungrouped: T[] = [];

    for (const item of data) {
      const groupKey = groupByKey ? String(item[groupByKey] ?? '') : undefined;

      if (groupKey) {
        grouped.set(groupKey, [...(grouped.get(groupKey) ?? []), item]);
      } else {
        ungrouped.push(item);
      }
    }

    return { groupedItems: grouped, flatItems: ungrouped };
  }, [data, groupByKey]);

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
    handleLoadMore,
    handlePageChange
  } = usePagination({
    data: allRows,
    itemsPerPage
  });

  const headerTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Box sx={styles.root}>
      <Typography variant="h6" sx={styles.title}>
        Усі композиції
      </Typography>

      <TableContainer component={Paper} sx={styles.container}>
        <Table>
          <TableHeader table={headerTable} columnWidths={columnWidths} />
          <TableBody>
            {rowsToRender.map((entry) =>
              entry.type === 'group' ? (
                <CollapsibleRow
                  key={`group-${entry.label}`}
                  data={entry.items}
                  groupLabel={entry.label}
                  collapsed={collapsedGroups[entry.label] ?? false}
                  onToggle={() => toggleGroupCollapse(entry.label)}
                  columns={columns}
                />
              ) : (
                <EnhancedTableRow key={entry.item.id} data={entry.item} table={headerTable} />
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={styles.paginationWrapper}>
        {hasMore && (
          <Button color="primary" size="large" onClick={handleLoadMore}>
            Переглянути більше
          </Button>
        )}

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => handlePageChange(page)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

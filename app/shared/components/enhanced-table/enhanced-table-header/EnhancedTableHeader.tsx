import { Box, TableCell, TableHead, TableRow } from '@mui/material';
import { flexRender, Header, Table } from '@tanstack/react-table';
import React from 'react';

import { enhancedTableHeaderStyles as styles } from './EnhancedTableHeader.styles';
import type { ColumnWidths } from '~/types/types/enhancedTable';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';
interface TableHeaderProps<T> {
  table: Table<T>;
  columnWidths?: ColumnWidths;
}

export default function EnhancedTableHeader<T>({ table, columnWidths = {} }: Readonly<TableHeaderProps<T>>) {
  return (
    <TableHead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} sx={styles.row}>
          {headerGroup.headers.map((header: Header<T, unknown>) => (
            <TableCell
              onClick={header.column.getToggleSortingHandler?.()}
              key={header.id}
              sx={{
                ...styles.cell,
                width: columnWidths[header.column.id ?? ''],
                cursor: header.column.getCanSort() ? 'pointer' : 'default'
              }}
            >
              <Box display="flex" alignItems="center" gap="2px">
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getCanSort() && (
                  <>
                    {header.column.getIsSorted() === 'asc' && (
                      <SvgImage src="/icons/upwards-chevron.svg" alt="chevron" width={20} height={20} />
                    )}
                    {header.column.getIsSorted() === 'desc' && (
                      <SvgImage src="/icons/downwards-chevron.svg" alt="chevron" width={20} height={20} />
                    )}
                    {header.column.getIsSorted() === false && (
                      <SvgImage src="/icons/default-chevron.svg" alt="chevron" width={20} height={20} />
                    )}
                  </>
                )}
              </Box>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
}

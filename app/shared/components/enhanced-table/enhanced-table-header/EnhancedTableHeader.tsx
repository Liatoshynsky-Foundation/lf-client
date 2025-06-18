import { TableCell, TableHead, TableRow } from '@mui/material';
import { flexRender, Header, Table } from '@tanstack/react-table';
import React from 'react';

import { enhancedTableHeaderStyles as styles } from './EnhancedTableHeader.styles';

type ColumnWidths = Record<string, string | number>;

interface TableHeaderProps<T> {
  table: Table<T>;
  columnWidths?: ColumnWidths;
}

export default function EnhancedTableHeader<T>({ table, columnWidths = {} }: TableHeaderProps<T>) {
  return (
    <TableHead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} sx={styles.row}>
          {headerGroup.headers.map((header: Header<T, unknown>) => (
            <TableCell key={header.id} sx={{ ...styles.cell, width: columnWidths[header.column.id ?? ''] }}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
}

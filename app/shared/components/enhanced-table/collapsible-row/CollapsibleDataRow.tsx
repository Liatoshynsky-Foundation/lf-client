'use client';

import { Box, Collapse, TableCell, TableRow } from '@mui/material';
import { flexRender, Row } from '@tanstack/react-table';
import React from 'react';

import { collapsibleRowStyles as styles } from './CollapsibleRow.styles';

interface RowData {
  id: number;
  [key: string]: unknown;
}

interface CollapsibleDataRowProps<T extends RowData> {
  row: Row<T>;
  collapsed: boolean;
}

function CollapsibleDataRowComponent<T extends RowData>({ row, collapsed }: CollapsibleDataRowProps<T>) {
  return (
    <TableRow key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} sx={styles.collapsedCell(collapsed)}>
          <Collapse in={collapsed} timeout={300} unmountOnExit>
            <Box>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Box>
          </Collapse>
        </TableCell>
      ))}
    </TableRow>
  );
}

export const CollapsibleDataRow = React.memo(CollapsibleDataRowComponent) as typeof CollapsibleDataRowComponent;

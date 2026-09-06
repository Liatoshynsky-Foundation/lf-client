'use client';

import { Box, Collapse, TableCell, TableRow } from '@mui/material';
import { flexRender, Row } from '@tanstack/react-table';
import React from 'react';

import { collapsibleRowStyles as styles } from './CollapsibleRow.styles';
import { RowData } from '~/types/types/enhancedTable';
interface CollapsibleDataRowProps<T extends RowData> {
  row: Row<T>;
  isExpanded: boolean;
}

function CollapsibleDataRowComponent<T extends RowData>({ row, isExpanded }: Readonly<CollapsibleDataRowProps<T>>) {
  return (
    <TableRow data-testid={isExpanded ? 'CollapsibleDataRow-expanded' : 'CollapsibleDataRow-expanded-empty'}>
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          sx={styles.expandedCell(isExpanded)}
          data-testid={`CollapsibleDataRow-expanded-${cell.id.split('_').at(1)}`}
        >
          <Collapse in={isExpanded} timeout={300} unmountOnExit>
            <Box>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Box>
          </Collapse>
        </TableCell>
      ))}
    </TableRow>
  );
}

export const CollapsibleDataRow = React.memo(CollapsibleDataRowComponent) as typeof CollapsibleDataRowComponent;

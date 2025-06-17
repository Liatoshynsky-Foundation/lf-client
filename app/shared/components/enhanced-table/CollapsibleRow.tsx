'use client';

import { Box, Collapse, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Image from 'next/image';
import React from 'react';

import { collapsibleRowStyles as styles } from './CollapsibleRow.styles';

type RowData = {
  id: number;
  [key: string]: unknown;
};

type Props<T extends RowData> = {
  data: T[];
  groupLabel: string;
  collapsed: boolean;
  onToggle: () => void;
  columns: ColumnDef<T>[];
};

export function CollapsibleRow<T extends RowData>({ data, groupLabel, collapsed, onToggle, columns }: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <>
      <TableRow sx={styles.row(collapsed)}>
        {columns.map((col) => {
          const meta = col.meta as {
            isGroupLabelColumn?: boolean;
            groupLabelContent?: React.ReactNode;
            groupCellRenderer?: () => React.ReactNode;
          };

          return (
            <TableCell key={col.id} sx={styles.cell}>
              <Box sx={styles.cellInner}>
                {col.id === 'expander' ? (
                  <IconButton onClick={onToggle}>
                    <Image
                      src={collapsed ? '/icons/chevron-down.svg' : '/icons/chevron-up.svg'}
                      alt="toggle"
                      width={20}
                      height={20}
                    />
                  </IconButton>
                ) : (
                  <>
                    <Box sx={styles.labelBox}>
                      {meta?.isGroupLabelColumn && <Typography fontWeight="bold">{groupLabel}</Typography>}
                      {meta?.groupLabelContent}
                    </Box>
                    {meta?.groupCellRenderer?.()}
                  </>
                )}
              </Box>
            </TableCell>
          );
        })}
      </TableRow>

      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} sx={styles.row(collapsed)}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} sx={styles.collapsedCell(collapsed)}>
              <Collapse in={collapsed} timeout={400} unmountOnExit>
                <Box sx={styles.collapsedContent}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Box>
              </Collapse>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

'use client';

import { Box, TableCell, TableRow } from '@mui/material';
import { type ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

import { IconButton } from '../../design-system/all-components/icon-button/IconButton';
import { SvgImage } from '../../svg-image/SvgImage';
import { CollapsibleDataRow } from './CollapsibleDataRow';
import { collapsibleRowStyles as styles } from './CollapsibleRow.styles';
import { IconButtonColorVariant } from '~/types/enums/common.enums';
import type { CollapsibleGroupColumnMeta, RowData } from '~/types/types/enhancedTable';
interface CollapsibleRowProps<T extends RowData> {
  data: T[];
  collapsed: boolean;
  onToggle: () => void;
  columns: ColumnDef<T>[];
}

export function CollapsibleRow<T extends RowData>({ data, collapsed, onToggle, columns }: CollapsibleRowProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <>
      <TableRow sx={styles.row(collapsed)}>
        {columns.map((col) => {
          const meta = col.meta as CollapsibleGroupColumnMeta<T>;

          return (
            <TableCell key={col.id} sx={styles.cell}>
              <Box sx={styles.cellInner}>
                {col.id === 'expander' ? (
                  <IconButton onClick={onToggle} variant={IconButtonColorVariant.Secondary} disableRipple>
                    <SvgImage
                      src={collapsed ? '/icons/chevron-down.svg' : '/icons/chevron-right.svg'}
                      alt="toggle"
                      width={24}
                      height={24}
                    />
                  </IconButton>
                ) : (
                  <>
                    <Box sx={styles.labelBox}>{meta?.groupLabelContent}</Box>
                    {meta?.groupCellRenderer?.()}
                  </>
                )}
              </Box>
            </TableCell>
          );
        })}
      </TableRow>

      {table.getRowModel().rows.map((row) => (
        <CollapsibleDataRow key={row.id} row={row} collapsed={collapsed} />
      ))}
    </>
  );
}

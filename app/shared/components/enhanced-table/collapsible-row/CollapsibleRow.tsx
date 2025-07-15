'use client';

import { Box, TableCell, TableRow } from '@mui/material';
import { type ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import { IconButton } from '~/ds-components/icon-button/IconButton';
import { mainHexPallete } from '~/ds-components/theme/colors';

import { CollapsibleDataRow } from './CollapsibleDataRow';
import { collapsibleRowStyles as styles } from './CollapsibleRow.styles';
import { IconButtonColorVariant } from '~/types/enums/common.enums';
import type { CollapsibleGroupColumnMeta, RowData } from '~/types/types/enhancedTable';

import chevronDown from '~/public/icons/chevron-down.svg';
import chevronRight from '~/public/icons/chevron-right.svg';

interface CollapsibleRowProps<T extends RowData> {
  data: T[];
  collapsed: boolean;
  action: () => void;
  columns: ColumnDef<T>[];
}

export function CollapsibleRow<T extends RowData>({
  data,
  collapsed,
  action,
  columns
}: Readonly<CollapsibleRowProps<T>>) {
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
          const labelContent = meta?.groupLabelContent;

          if (React.isValidElement(labelContent) && labelContent.type === TableCell) {
            return React.cloneElement(labelContent, { key: col.id });
          }

          return (
            <TableCell key={col.id} sx={styles.cell}>
              <Box sx={styles.cellInner}>
                {col.id === 'expander' ? (
                  <IconButton onClick={action} variant={IconButtonColorVariant.Secondary} disableRipple>
                    <Svg
                      Component={collapsed ? chevronDown : chevronRight}
                      color={mainHexPallete.brown['700']}
                      alt="toggle"
                    />
                  </IconButton>
                ) : (
                  <>
                    <Box sx={styles.labelBox}>{labelContent}</Box>
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

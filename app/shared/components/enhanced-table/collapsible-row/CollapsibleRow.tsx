'use client';

import { Box, TableCell, TableRow } from '@mui/material';
import { type ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo } from 'react';

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
  columns: ColumnDef<T, unknown>[];
}

const isExpanderColumn = <T extends RowData>(col: ColumnDef<T, unknown>) => String(col.id) === 'expander';

const getFactoryIndexes = <T extends RowData>(columns: ColumnDef<T, unknown>[]) =>
  columns
    .map((c, idx) => ((c.meta as CollapsibleGroupColumnMeta<T> | undefined)?.groupLabelContentFactory ? idx : -1))
    .filter((i) => i >= 0);

const getNextFactoryIndex = (currentIdx: number, factoryIndexes: number[], columnsLength: number) => {
  const pos = factoryIndexes.indexOf(currentIdx);
  return pos >= 0 && pos < factoryIndexes.length - 1 ? factoryIndexes[pos + 1] : columnsLength;
};

export const CollapsibleRow = <T extends RowData>({
  data,
  collapsed,
  action,
  columns
}: Readonly<CollapsibleRowProps<T>>) => {
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const factoryIndexes = useMemo(() => getFactoryIndexes(columns), [columns]);
  let coveredUntil = -1;
  return (
    <>
      <TableRow
        sx={styles.row(collapsed)}
        data-testid="CollapsibleRow-mainOpus"
        onClick={(e) => {
          e.preventDefault();
          action();
        }}
      >
        {columns.map((col, idx) => {
          if (idx <= coveredUntil) return null;

          const cellKey = String(col.id ?? idx);

          if (isExpanderColumn(col)) {
            return (
              <TableCell key={cellKey} sx={styles.cell}>
                <Box sx={styles.cellInnerCentered}>
                  <IconButton
                    aria-label="toggle row"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      action();
                    }}
                    variant={IconButtonColorVariant.Secondary}
                    disableRipple
                    sx={{ bgcolor: 'none' }}
                    data-testid="CollapsibleRow-mainOpus-toggle"
                  >
                    <Svg
                      Component={collapsed ? chevronDown : chevronRight}
                      stroke={mainHexPallete.brown['700']}
                      alt="toggle"
                    />
                  </IconButton>
                </Box>
              </TableCell>
            );
          }

          const meta = col.meta as CollapsibleGroupColumnMeta<T> | undefined;
          const factory = meta?.groupLabelContentFactory;

          if (factory) {
            const nextFactoryIdx = getNextFactoryIndex(idx, factoryIndexes, columns.length);
            const colSpan = Math.max(1, nextFactoryIdx - idx);
            coveredUntil = idx + colSpan - 1;

            const raw = factory(data);
            const normalized = React.Children.toArray(raw);

            return (
              <TableCell key={cellKey} colSpan={colSpan} sx={styles.cell}>
                <Box sx={styles.cellInner}>
                  <Box sx={{ width: '100%' }} data-testid={`CollapsibleRow-mainOpus-${cellKey}`}>
                    {normalized}
                  </Box>
                </Box>
              </TableCell>
            );
          }
          return (
            <TableCell key={cellKey} sx={styles.cell}>
              <Box sx={styles.cellInner} />
            </TableCell>
          );
        })}
      </TableRow>

      {table.getRowModel().rows.map((row) => (
        <CollapsibleDataRow key={row.id} row={row} collapsed={collapsed} />
      ))}
    </>
  );
};

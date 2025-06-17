import { TableCell, TableRow } from '@mui/material';
import { flexRender, Table } from '@tanstack/react-table';

import { enhancedTableRowStyles as styles } from './EnhancedTableRow.styles';

type EnhancedTableRowProps<T extends { id: number }> = {
  data: T;
  table: Table<T>;
};

export default function EnhancedTableRow<T extends { id: number }>({ data, table }: EnhancedTableRowProps<T>) {
  const row = table.getRowModel().rows.find((row) => row.original.id === data.id);
  if (!row) return null;

  return (
    <TableRow>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} sx={styles.cell}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

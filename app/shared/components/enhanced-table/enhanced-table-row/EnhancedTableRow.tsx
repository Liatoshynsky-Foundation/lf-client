import { TableCell, TableRow } from '@mui/material';
import { flexRender, Table } from '@tanstack/react-table';

import { enhancedTableRowStyles as styles } from './EnhancedTableRow.styles';

interface EnhancedTableRowProps<T extends { id: string }> {
  data: T;
  table: Table<T>;
}

export default function EnhancedTableRow<T extends { id: string }>({
  data,
  table
}: Readonly<EnhancedTableRowProps<T>>) {
  const row = table.getRowModel().rows.find((row) => row.original.id === data.id);
  if (!row) return null;

  return (
    <TableRow data-testid="EnhancedTableRow-mainNoOpus">
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          sx={styles.cell}
          data-testid={`EnhancedTableRow-mainNoOpus-${cell.id.split('_').at(1)}`}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

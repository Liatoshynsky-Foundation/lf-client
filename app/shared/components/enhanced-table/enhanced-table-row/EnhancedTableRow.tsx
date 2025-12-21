import { TableCell, TableRow } from '@mui/material';
import { flexRender, Table } from '@tanstack/react-table';

import { enhancedTableRowStyles as styles } from './EnhancedTableRow.styles';

interface EnhancedTableRowProps<T extends { id: string }> {
  data: T;
  table: Table<T>;
  sx?: object;
  onClick?: () => void;
}

export default function EnhancedTableRow<T extends { id: string }>({
  data,
  table,
  sx,
  onClick
}: Readonly<EnhancedTableRowProps<T>>) {
  const row = table.getRowModel().rows.find((row) => row.original.id === data.id);
  if (!row) return null;

  const handleRowClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!onClick) return;

    const target = e.target as HTMLElement | null;

    if (target?.closest('button, a')) return;

    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <TableRow
      data-testid="EnhancedTableRow-mainNoOpus"
      sx={sx}
      onClick={onClick ? handleRowClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
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

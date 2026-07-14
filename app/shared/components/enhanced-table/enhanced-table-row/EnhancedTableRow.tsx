import { TableCell, TableRow } from '@mui/material';
import { flexRender, type Row } from '@tanstack/react-table';

import { enhancedTableRowStyles as styles } from './EnhancedTableRow.styles';

interface EnhancedTableRowProps<T extends { id: string }> {
  row: Row<T>;
  sx?: object;
  onClick?: (row: T) => void;
}

export default function EnhancedTableRow<T extends { id: string }>({
  row,
  sx,
  onClick
}: Readonly<EnhancedTableRowProps<T>>) {
  const onRowClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest('button, a')) return;
    onClick?.(row.original);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(row.original);
    }
  };

  const handleRowClick = onClick ? onRowClick : undefined;
  const handleKeyDown = onClick ? onKeyDown : undefined;
  const isInteractive = Boolean(onClick);

  return (
    <TableRow
      data-testid="EnhancedTableRow-mainNoOpus"
      sx={sx}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} sx={styles.cell} data-testid={`EnhancedTableRow-mainNoOpus-${cell.column.id}`}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

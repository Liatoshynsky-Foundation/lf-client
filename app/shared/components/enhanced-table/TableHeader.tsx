import { TableCell, TableHead, TableRow } from '@mui/material';

export function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: 300 }}>Опус</TableCell>
        <TableCell sx={{ width: 300 }}>Назва</TableCell>
        <TableCell sx={{ width: 300 }}>Рік</TableCell>
        <TableCell sx={{ width: 300 }}>Жанр</TableCell>
      </TableRow>
    </TableHead>
  );
}

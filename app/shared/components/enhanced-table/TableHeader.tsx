import { TableCell, TableHead, TableRow } from '@mui/material';

export function TableHeader() {
  return (
    <TableHead sx={{ width: '100vw' }}>
      <TableRow>
        <TableCell sx={{ width: '10%' }}>Опус</TableCell>
        <TableCell sx={{ width: '40%' }}>Назва</TableCell>
        <TableCell sx={{ width: '5%' }}>Рік</TableCell>
        <TableCell sx={{ width: 'auto' }}>Жанр</TableCell>
      </TableRow>
    </TableHead>
  );
}

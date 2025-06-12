import { Box, Button, TableCell, TableRow } from '@mui/material';

export function MusicRow({ music }) {
  return (
    <TableRow>
      <TableCell />
      <TableCell>{music.name}</TableCell>
      <TableCell>{music.year}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          <Button variant="outlined" size="small" onClick={() => alert(`User ID: ${music.id}`)}>
            Переглянути ноти
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}

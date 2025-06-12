import { Box, Button, TableCell, TableRow } from '@mui/material';

type User = {
  id: number;
  name: string;
  year: number;
};

type Props = {
  user: User;
};

export function UserRow({ user }: Props) {
  return (
    <TableRow>
      <TableCell />
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.year}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          <Button variant="outlined" size="small" onClick={() => alert(`User ID: ${user.id}`)}>
            Переглянути ноти
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}

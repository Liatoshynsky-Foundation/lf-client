import { Box, Button, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import Image from 'next/image';

import ArrowDownIcon from '~/public/icons/arrow-down-right.svg';
import ArrowUpIcon from '~/public/icons/arrow-left-to-line.svg';

type User = {
  id: number;
  name: string;
  year: number;
};

type Props = {
  users: User[];
  collapsed: boolean;
  onToggle: () => void;
};

export function CollapsibleRow({ users, collapsed, onToggle }: Props) {
  return (
    <>
      <TableRow>
        <TableCell colSpan={4}>
          <Box display="flex" alignItems="center">
            <IconButton onClick={onToggle}>
              <Image src={collapsed ? ArrowUpIcon : ArrowDownIcon} alt="toggle" width={20} height={20} />
            </IconButton>
            <strong>op.1</strong>
          </Box>
        </TableCell>
      </TableRow>

      {users.map((user) => (
        <TableRow
          key={user.id}
          sx={{
            '& > *': {
              borderBottom: collapsed ? undefined : 'none'
            }
          }}
        >
          <TableCell sx={{ p: 0, borderBottom: collapsed ? undefined : 'none' }} />
          <TableCell sx={{ p: 0, borderBottom: collapsed ? undefined : 'none' }}>
            <Collapse in={collapsed} timeout={400} unmountOnExit>
              <Box p={2}>{user.name}</Box>
            </Collapse>
          </TableCell>
          <TableCell sx={{ p: 0, borderBottom: collapsed ? undefined : 'none' }}>
            <Collapse in={collapsed} timeout={400} unmountOnExit>
              <Box p={2}>{user.year}</Box>
            </Collapse>
          </TableCell>
          <TableCell sx={{ p: 0, borderBottom: collapsed ? undefined : 'none' }}>
            <Collapse in={collapsed} timeout={400} unmountOnExit>
              <Box display="flex" alignItems="center" gap={1} p={2}>
                <Button variant="outlined" size="small" onClick={() => alert(`User ID: ${user.id}`)}>
                  Переглянути ноти
                </Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

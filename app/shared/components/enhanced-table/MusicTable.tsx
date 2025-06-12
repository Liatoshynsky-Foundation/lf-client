'use client';

import { Box, Pagination, Paper, Table, TableBody, TableContainer } from '@mui/material';
import { useState } from 'react';

import { CollapsibleRow } from './CollapsibleRow';
import { UserRow } from './MusicRow';
import { TableHeader } from './TableHeader';

type User = {
  id: number;
  name: string;
  year: number;
};

const allUsers: User[] = [
  {
    id: 1,
    name: '«Після бою», сл. І. Буніна, укр. пер. М. Стріхи',
    year: 1997
  },
  {
    id: 2,
    name: 'Довше ім’я, що складається з кількох частин і має додаткові уточнення (ред.)',
    year: 1997
  },
  {
    id: 3,
    name: 'Коротке ім’я',
    year: 1997
  },
  {
    id: 4,
    name: 'Твір із надзвичайно довгою назвою, яка використовується для тестування меж колонки',
    year: 1997
  },
  {
    id: 5,
    name: 'Пісня',
    year: 1997
  },
  {
    id: 6,
    name: 'Композиція для голосу і фортепіано',
    year: 1997
  },
  {
    id: 7,
    name: 'Інструментальна п’єса',
    year: 1997
  },
  {
    id: 8,
    name: 'Романтична балада',
    year: 1997
  },
  {
    id: 9,
    name: 'Симфонічний твір',
    year: 1997
  },
  {
    id: 10,
    name: 'Етюд',
    year: 1997
  },
  {
    id: 11,
    name: 'Ода невідомому герою з далеких часів',
    year: 1997
  },
  {
    id: 12,
    name: 'Мелодія',
    year: 1998
  }
];

const ITEMS_PER_PAGE = 10;
const HIDDEN_USER_COUNT = 3;

export default function UserTable() {
  const [page, setPage] = useState(1);
  const [collapsed, setCollapsed] = useState(false);
  const [users] = useState<User[]>(allUsers);

  const hiddenUsers = users.slice(0, HIDDEN_USER_COUNT);
  const visibleUsers = users.slice(HIDDEN_USER_COUNT);
  const paginatedUsers = visibleUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(visibleUsers.length / ITEMS_PER_PAGE);

  return (
    <Box p={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHeader />
          <TableBody>
            <CollapsibleRow users={hiddenUsers} collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />
            {paginatedUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} color="primary" />
      </Box>
    </Box>
  );
}

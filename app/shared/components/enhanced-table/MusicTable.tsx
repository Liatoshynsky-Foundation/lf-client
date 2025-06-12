'use client';

import { Box, Pagination, Paper, Table, TableBody, TableContainer } from '@mui/material';
import { useState } from 'react';

import { CollapsibleRow } from './CollapsibleRow';
import { MusicRow } from './MusicRow';
import { TableHeader } from './TableHeader';

type Music = {
  id: number;
  name: string;
  year: number;
  opus?: string;
};

type FlattenedItem = { type: 'group'; label: string; items: Music[] } | { type: 'music'; music: Music };

const music: Music[] = [
  { id: 1, name: '«Після бою», сл. І. Буніна, укр. пер. М. Стріхи', year: 1997, opus: 'op.1' },
  { id: 2, name: 'Довше ім’я...', year: 1997, opus: 'op.1' },
  { id: 3, name: 'Коротке ім’я', year: 1997, opus: 'op.1' },
  { id: 4, name: 'Твір із надзвичайно довгою назвою...', year: 1997, opus: 'op.2' },
  { id: 5, name: 'Пісня', year: 1997, opus: 'op.2' },
  { id: 6, name: 'Композиція для голосу і фортепіано', year: 1997, opus: 'op.2' },
  { id: 7, name: 'Інструментальна п’єса', year: 1997 },
  { id: 8, name: 'Романтична балада', year: 1997 },
  { id: 9, name: 'Симфонічний твір', year: 1997 },
  { id: 10, name: 'Етюд', year: 1997 },
  { id: 11, name: 'Ода невідомому герою...', year: 1997 },
  { id: 12, name: 'Мелодія', year: 1998 }
];

const ITEMS_PER_PAGE = 5;

export default function UserTable() {
  const [page, setPage] = useState(1);
  const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) => {
    setCollapsedMap((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const groupedMap = new Map<string, Music[]>();
  const ungrouped: Music[] = [];

  for (const m of music) {
    if (m.opus) {
      if (!groupedMap.has(m.opus)) groupedMap.set(m.opus, []);
      groupedMap.get(m.opus)!.push(m);
    } else {
      ungrouped.push(m);
    }
  }

  const flattened: FlattenedItem[] = [
    ...Array.from(groupedMap.entries()).map(([label, items]) => ({
      type: 'group',
      label,
      items
    })),
    ...ungrouped.map((m) => ({ type: 'music', music: m }))
  ];

  const totalPages = Math.ceil(flattened.length / ITEMS_PER_PAGE);
  const paginated = flattened.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Box p={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHeader />
          <TableBody>
            {paginated.map((item) =>
              item.type === 'group' ? (
                <CollapsibleRow
                  key={`group-${item.label}`}
                  musics={item.items}
                  groupLabel={item.label}
                  collapsed={collapsedMap[item.label] ?? false}
                  onToggle={() => toggleGroup(item.label)}
                />
              ) : (
                <MusicRow key={item.music.id} music={item.music} />
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} color="primary" />
      </Box>
    </Box>
  );
}

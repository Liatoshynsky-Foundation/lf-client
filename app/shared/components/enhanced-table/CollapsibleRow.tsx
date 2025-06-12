import { Box, Button, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import ArrowDownIcon from '~/public/icons/arrow-down-right.svg';
import ArrowUpIcon from '~/public/icons/arrow-left-to-line.svg';

type Music = {
  id: number;
  name: string;
  year: number;
  opus?: string;
};

type Props = {
  musics: Music[];
};

export function CollapsibleRow({ musics }: Props) {
  const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>({});

  const toggleOpus = (opus: string) => {
    setCollapsedMap((prev) => ({
      ...prev,
      [opus]: !prev[opus]
    }));
  };

  // Групуємо по opus
  const grouped = musics.reduce<Record<string, Music[]>>((acc, item) => {
    if (!item.opus) return acc;
    if (!acc[item.opus]) acc[item.opus] = [];
    acc[item.opus].push(item);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(grouped).map(([opus, items]) => {
        const collapsed = collapsedMap[opus] ?? false;

        return (
          <React.Fragment key={opus}>
            <TableRow>
              <TableCell colSpan={4}>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => toggleOpus(opus)}>
                    <Image src={collapsed ? ArrowUpIcon : ArrowDownIcon} alt="toggle" width={20} height={20} />
                  </IconButton>
                  <strong>{opus}</strong>
                </Box>
              </TableCell>
            </TableRow>

            {items.map((music) => (
              <TableRow
                key={music.id}
                sx={{
                  '& > *': {
                    borderBottom: collapsed ? undefined : 'none'
                  }
                }}
              >
                <TableCell sx={{ p: 0, borderBottom: collapsed ? undefined : 'none' }} />
                <TableCell sx={{ p: 0, borderBottom: collapsed ? undefined : 'none' }}>
                  <Collapse in={collapsed} timeout={400} unmountOnExit>
                    <Box p={2}>{music.name}</Box>
                  </Collapse>
                </TableCell>
                <TableCell sx={{ p: 0, borderBottom: collapsed ? undefined : 'none' }}>
                  <Collapse in={collapsed} timeout={400} unmountOnExit>
                    <Box p={2}>{music.year}</Box>
                  </Collapse>
                </TableCell>
                <TableCell sx={{ p: 0, borderBottom: collapsed ? undefined : 'none' }}>
                  <Collapse in={collapsed} timeout={400} unmountOnExit>
                    <Box display="flex" alignItems="center" gap={1} p={2}>
                      <Button variant="outlined" size="small" onClick={() => alert(`User ID: ${music.id}`)}>
                        Переглянути ноти
                      </Button>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            ))}
          </React.Fragment>
        );
      })}
    </>
  );
}

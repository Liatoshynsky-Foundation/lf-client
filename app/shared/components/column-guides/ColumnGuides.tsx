'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import { getLineSideStyle, gridContainerStyle } from './ColumnGuides.style';

interface ColumnGuidesProps {
  lineColor?: string;
}

const columnsMap: Record<number, { col: number; align: 'start' | 'end' }[]> = {
  12: [
    { col: 1, align: 'start' },
    { col: 2, align: 'start' },
    { col: 5, align: 'end' },
    { col: 6, align: 'start' },
    { col: 9, align: 'start' },
    { col: 12, align: 'end' }
  ],
  8: [
    { col: 1, align: 'start' },
    { col: 2, align: 'start' },
    { col: 3, align: 'end' },
    { col: 4, align: 'start' },
    { col: 6, align: 'end' },
    { col: 8, align: 'end' }
  ],
  4: [
    { col: 1, align: 'start' },
    { col: 2, align: 'start' },
    { col: 4, align: 'end' },
    { col: 1, align: 'end' }
  ]
};

export const ColumnGuides = ({ lineColor = 'rgba(237, 232, 223, 1)' }: ColumnGuidesProps) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  let layout;
  let gap;
  let paddingX;

  if (isSm) {
    layout = 4;
    gap = 16;
    paddingX = 24;
  } else if (isMd) {
    layout = 8;
    gap = 20;
    paddingX = 56;
  } else {
    layout = 12;
    gap = 40;
    paddingX = 72;
  }

  const columns = columnsMap[layout];

  const grouped: Record<number, ('start' | 'end')[]> = {};
  columns.forEach(({ col, align }) => {
    if (!grouped[col]) {
      grouped[col] = [];
    }

    if (!grouped[col].includes(align)) {
      grouped[col].push(align);
    }
  });

  return (
    <Box aria-hidden sx={gridContainerStyle(layout, gap, paddingX)}>
      {Object.entries(grouped).map(([colStr, aligns]) => {
        const col = Number(colStr);
        return (
          <Box key={`col-${col}`} sx={{ gridColumn: col, position: 'relative' }}>
            {aligns.includes('start') && <Box sx={getLineSideStyle('left', lineColor)} />}
            {aligns.includes('end') && <Box sx={getLineSideStyle('right', lineColor)} />}
          </Box>
        );
      })}
    </Box>
  );
};

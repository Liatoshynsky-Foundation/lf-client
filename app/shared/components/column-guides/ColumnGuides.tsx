'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

import { containerSx, dynamicLineBaseSx, lineSx } from './ColumnGuides.style';

interface SectionColor {
  startY: number;
  endY: number;
  color: string;
}

export const ColumnGuides = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const layout = isSm ? 4 : isMd ? 8 : 12;
  const gap = isSm ? 16 : isMd ? 20 : 40;
  const paddingX = isSm ? 24 : isMd ? 56 : 72;

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

  const columns = columnsMap[layout];

  const [dynamicSections, setDynamicSections] = useState<SectionColor[]>([]);

  useEffect(() => {
    const el = document.getElementById('foundation-founders');
    const container = document.getElementById('column-guides-container');

    if (!el || !container) {
      setDynamicSections([]);
      return;
    }

    const relativeTop = el.offsetTop - container.offsetTop;

    setDynamicSections([
      {
        startY: relativeTop,
        endY: relativeTop + el.offsetHeight,
        color: 'rgba(252, 252, 252, 1)'
      }
    ]);
  }, [layout, isMd, isSm]);

  const allSections = [...dynamicSections];

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
    <Box
      id="column-guides-container"
      sx={{
        ...containerSx,
        left: `${paddingX}px`,
        right: `${paddingX}px`,
        gridTemplateColumns: `repeat(${layout}, 1fr)`,
        gap: `${gap}px`
      }}
    >
      {Object.entries(grouped).map(([colStr, aligns]) => {
        const col = Number(colStr);
        return (
          <Box
            key={`col-${col}`}
            sx={{
              gridColumn: col,
              position: 'relative'
            }}
          >
            {aligns.includes('start') && (
              <Box
                sx={{
                  ...lineSx,
                  left: 0
                }}
              />
            )}

            {aligns.includes('end') && (
              <Box
                sx={{
                  ...lineSx,
                  right: 0
                }}
              />
            )}

            {allSections.map((section, i) =>
              aligns.map((align) => (
                <Box
                  key={`${i}-${align}`}
                  sx={{
                    ...dynamicLineBaseSx,
                    [align === 'start' ? 'left' : 'right']: 0,
                    top: section.startY,
                    height: section.endY - section.startY,
                    backgroundColor: section.color
                  }}
                />
              ))
            )}
          </Box>
        );
      })}
    </Box>
  );
};

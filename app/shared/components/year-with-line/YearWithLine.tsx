'use client';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';

import { theme } from '~/ds-components/theme/Theme';
import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import { styles } from './YearWithLine.styles';
const YearWithLine = ({ year }: { year: number }) => {
  const Styles = styles(theme);

  const numberStr = year.toString();
  const [offset, setOffset] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const { isTablet, isMobile } = useBreakpoints();

  useEffect(() => {
    const calculateOffset = () => {
      if (!textRef.current) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let fontSize = parseInt(theme.typography.customBold236.fontSize as string, 10);
      if (isTablet) fontSize = parseInt(theme.typography.customBold132.fontSize as string, 10);
      if (isMobile) fontSize = parseInt(theme.typography.customBold114.fontSize as string, 10);
      ctx.font = `${theme.typography.customBold236.fontWeight} ${fontSize}px ${theme.typography.customBold236.fontFamily}`;

      const text = numberStr.slice(0, 3);
      const width = ctx.measureText(text).width;
      setOffset(width);
    };

    calculateOffset();
    window.addEventListener('resize', calculateOffset);
    return () => {
      window.removeEventListener('resize', calculateOffset);
    };
  }, [numberStr, isTablet, isMobile]);

  return (
    <Box sx={Styles.container} id={`year-${year}`}>
      <Box ref={textRef} sx={Styles.yearBlock}>
        <Box sx={Styles.line(offset)} />
        <Typography variant="h2" sx={Styles.year}>
          {numberStr}
        </Typography>
      </Box>
    </Box>
  );
};

export default YearWithLine;

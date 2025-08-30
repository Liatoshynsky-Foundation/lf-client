'use client';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';

import { oswald, theme } from '~/ds-components/theme/Theme';
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

      let fontSize = 236;
      if (isTablet) fontSize = 132;
      if (isMobile) fontSize = 114;
      ctx.font = `500 ${fontSize}px ${oswald.style.fontFamily}`;

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
    <Box sx={Styles.container}>
      <Box ref={textRef} sx={Styles.yearBlock}>
        <Box sx={Styles.line(offset)} />
        <Box sx={Styles.year}>{numberStr}</Box>
      </Box>
    </Box>
  );
};

export default YearWithLine;

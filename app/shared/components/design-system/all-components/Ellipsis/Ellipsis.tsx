import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import TooltipCustom from '../tooltip/Tooltip';

type EllipsisProps = Readonly<{
  text: string;
  variant?: React.ComponentProps<typeof Typography>['variant'];
  maxWidth?: number | string;
  showTooltip?: boolean;
  sx?: React.ComponentProps<typeof Box>['sx'];
}>;

export function Ellipsis({ text, variant = 'body2', maxWidth, showTooltip = true, sx }: EllipsisProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const measure = () => setOverflow(el.scrollWidth > el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [text, maxWidth]);

  return (
    <TooltipCustom
      title={text}
      disableHoverListener={!showTooltip || !overflow}
      disableFocusListener={!showTooltip || !overflow}
      disableTouchListener={!showTooltip || !overflow}
      enterDelay={500}
    >
      <Box ref={wrapperRef} sx={{ minWidth: 0, ...(maxWidth ? { maxWidth } : {}), ...sx }}>
        <Typography
          ref={textRef}
          variant={variant}
          component="span"
          sx={{
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'
          }}
        >
          {text}
        </Typography>
      </Box>
    </TooltipCustom>
  );
}

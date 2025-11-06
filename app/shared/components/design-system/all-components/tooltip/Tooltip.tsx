import { Box, type BoxProps, type TooltipProps, Typography, type TypographyProps } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

import { arrowStyles, tooltipStyles } from './Tooltip.styles';

interface TooltipCustomProps extends Omit<TooltipProps, 'children' | 'title'> {
  title?: string;
  showArrow?: boolean;
  text?: string;
  wrapperProps?: BoxProps;
  textProps?: TypographyProps;
  children?: React.ReactElement | null;
}

const TooltipCustom: React.FC<TooltipCustomProps> = ({
  showArrow,
  text,
  wrapperProps,
  textProps,
  children,
  title,
  arrow,
  placement = 'top',
  ...tooltipProps
}) => {
  const finalTitle = title ?? text ?? '';
  const finalArrow = showArrow ?? arrow ?? false;

  return (
    <Box {...wrapperProps}>
      <Tooltip
        title={finalTitle}
        arrow={finalArrow}
        placement={placement}
        componentsProps={{
          tooltip: { sx: tooltipStyles },
          arrow: { sx: arrowStyles }
        }}
        {...tooltipProps}
      >
        {children ?? <Typography {...textProps}>{finalTitle}</Typography>}
      </Tooltip>
    </Box>
  );
};

export default TooltipCustom;

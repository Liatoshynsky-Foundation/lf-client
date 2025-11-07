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
  isOpen?: boolean;
}

const TooltipCustom: React.FC<TooltipCustomProps> = ({
  showArrow,
  text,
  wrapperProps,
  textProps,
  children,
  title,
  arrow,
  isOpen,
  placement = 'top',
  ...tooltipProps
}) => {
  const finalTitle = title ?? text ?? '';
  const finalArrow = showArrow ?? arrow ?? false;
  const controlledProps = isOpen === undefined ? {} : { open: isOpen };

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
        {...controlledProps}
        {...tooltipProps}
      >
        {children ?? <Typography {...textProps}>{finalTitle}</Typography>}
      </Tooltip>
    </Box>
  );
};

export default TooltipCustom;

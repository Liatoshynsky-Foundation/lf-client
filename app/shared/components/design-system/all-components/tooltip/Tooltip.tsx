import React from 'react';
import { Tooltip, Box, Typography } from '@mui/material';
import { tooltipStyles, arrowStyles } from './Tooltip.styles';

interface TooltipCustomProps {
  showArrow: boolean;
  text: string;
}

const TooltipCustom: React.FC<TooltipCustomProps> = ({ showArrow, text }) => {
  return (
    <Box>
      <Tooltip
        title={text}
        placement="top"
        arrow={showArrow}
        componentsProps={{
          tooltip: { sx: tooltipStyles },
          arrow: { sx: arrowStyles },
        }}
      >
        <Typography>
          {text}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default TooltipCustom;

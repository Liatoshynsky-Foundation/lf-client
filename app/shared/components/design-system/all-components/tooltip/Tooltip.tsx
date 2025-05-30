import React from 'react';
import { Tooltip, Box, Typography } from '@mui/material';
import { tooltipStyles, arrowStyles } from './Tooltip.styles';

interface TooltipCustomProps {
  showArrow: boolean;
}

const TooltipCustom: React.FC<TooltipCustomProps> = ({ showArrow }) => {
  return (
    <Box>
      <Tooltip
        title='My Tooltip'
        arrow={showArrow}
        componentsProps={{
          tooltip: { sx: tooltipStyles },
          arrow: { sx: arrowStyles },
        }}
      >
        <Typography>
          My Tooltip
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default TooltipCustom;

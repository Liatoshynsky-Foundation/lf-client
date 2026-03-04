import { Box, SxProps, Theme, Typography } from '@mui/material';
import { motion, MotionValue } from 'framer-motion';

import { sxToArray } from '~/lib/utils/sxToArray';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

type CustomCursorProps = {
  iconConfig?: {
    src: string;
    width: number;
    height: number;
  };
  textConfig?: {
    content: string;
    sx?: SxProps<Theme>;
  };
  x: MotionValue<number>;
  y: MotionValue<number>;
  isHovering: boolean;
  customSX?: SxProps<Theme>;
  testID?: string;
};

export const CursorButton = ({
  iconConfig,
  textConfig,
  x,
  y,
  isHovering,
  customSX,
  testID = 'cursor-button'
}: CustomCursorProps) => {
  return (
    <Box
      component={motion.div}
      data-testid={testID}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isHovering ? 1 : 0
      }}
      style={{ left: x, top: y }}
      sx={[...sxToArray(customSX)]}
    >
      {iconConfig && (
        <SvgImage
          src={iconConfig.src}
          width={iconConfig.width}
          height={iconConfig.height}
          alt="Cursor Icon"
          data-testid={`${testID}-icon`}
        />
      )}
      {textConfig && (
        <Typography sx={textConfig.sx} data-testid={`${testID}-text`}>
          {textConfig.content}
        </Typography>
      )}
    </Box>
  );
};

import { Box } from '@mui/system';
import type { ReactNode } from 'react';

type SkewedBlockProps = {
  image: string;
  backgroundSize: 'cover' | 'contain';
  height: object;
  sx?: object;
  children?: ReactNode;
};
export const SkewedBlock = ({ image, backgroundSize, height, sx, children }: SkewedBlockProps) => {
  return (
    <Box
      data-testid="skewed-block"
      sx={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize,
        gridColumn: '1 / -1',
        position: 'relative',
        left: '50%',
        marginLeft: '-50vw',
        width: '100vw',
        height,
        transform: 'skewY(-2deg)',
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

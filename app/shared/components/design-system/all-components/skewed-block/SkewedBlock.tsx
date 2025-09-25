import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { styles } from './SkewedBlock.styles';

type BaseProps = {
  image: string;
  isBackground?: boolean;
  width?: number | string;
  sx?: object;
  children?: ReactNode;
  caption?: string;
  align?: 'left' | 'right';
};

type CoverProps = BaseProps & {
  backgroundSize: 'cover';
  height: number | string | object;
};

type ContainProps = BaseProps & {
  backgroundSize: 'contain';
  height?: number | string | object;
};

export type SkewedBlockProps = CoverProps | ContainProps;

export const SkewedBlock = ({
  image,
  isBackground = false,
  backgroundSize,
  width = '100%',
  height = 'auto',
  sx,
  children,
  caption,
  align = 'right'
}: SkewedBlockProps) => {
  const isCover = backgroundSize === 'cover';

  return (
    <Box
      data-testid="skewed-block"
      sx={{
        ...styles.mainContainer,
        height,
        ...(isBackground && {
          backgroundImage: `url(${image})`,
          backgroundSize,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          ...sx
        })
      }}
    >
      {!isBackground && (
        <Box sx={{ display: 'inline-block', width, textAlign: 'center' }}>
          <Box sx={{ position: 'relative', width: '100%', height: isCover ? height : 'auto' }}>
            <Image
              aria-label={caption || 'image-with-caption'}
              src={image}
              alt={caption || ''}
              fill={isCover}
              {...(!isCover && { width: 600, height: 400 })}
              style={{
                objectFit: backgroundSize,
                width: '100%',
                height: isCover ? undefined : 'auto',
                ...sx
              }}
            />
          </Box>

          {caption && (
            <Typography variant="caption" sx={styles.caption(align)}>
              {caption}
            </Typography>
          )}
        </Box>
      )}

      {children}
    </Box>
  );
};

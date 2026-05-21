'use client';

import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';

import { loggerErrors } from '~/constants/errors';

import { type CropRect } from '~/lib/utils/cropUtils';
import { useImageCrop } from '~/shared/hooks/use-image-crop/useImageCrop';

const EDITOR_PREVIEW_W = 600;
const EDITOR_PREVIEW_H = 400;

interface CroppedBlockImageProps {
  src: string;
  alt: string;
  caption: string;
  cropData: string;
  blockWidth: number;
}

function parseCrop(cropData: string): CropRect | null {
  try {
    const parsed = JSON.parse(cropData) as Record<string, unknown>;
    const rect = parsed.rect as Record<string, unknown> | undefined;
    if (
      rect &&
      typeof rect.x === 'number' &&
      typeof rect.y === 'number' &&
      typeof rect.width === 'number' &&
      typeof rect.height === 'number'
    ) {
      return rect as unknown as CropRect;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(loggerErrors.CROP_DATA_PARSE_FAILED, error);
  }
  return null;
}

export function CroppedBlockImage({ src, alt, caption, cropData, blockWidth }: Readonly<CroppedBlockImageProps>) {
  const crop = useMemo(() => parseCrop(cropData), [cropData]);
  const { containerRef, imgRef, handleImageLoad, croppedImgStyle } = useImageCrop(crop);

  return (
    <Box sx={{ my: 3 }}>
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: blockWidth,
          aspectRatio: `${EDITOR_PREVIEW_W} / ${EDITOR_PREVIEW_H}`,
          overflow: 'hidden'
        }}
      >
        {}
        <img ref={imgRef} src={src} alt={alt} loading="lazy" onLoad={handleImageLoad} style={croppedImgStyle} />
      </Box>
      {caption && (
        <Typography variant="caption" component="figcaption" sx={{ mt: 1, textAlign: 'center', display: 'block' }}>
          {caption}
        </Typography>
      )}
    </Box>
  );
}

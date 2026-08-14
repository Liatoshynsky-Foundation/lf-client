'use client';

import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

import { type CropRect } from '~/lib/utils/cropUtils';
import { useImageCrop } from '~/shared/hooks/use-image-crop/useImageCrop';

interface CroppedImageProps {
  src: string;
  alt: string;
  crop?: CropRect | { rect: CropRect } | null;
  width?: number;
  height?: number;
  fill?: boolean;
  imageStyle?: React.CSSProperties;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

export default function CroppedImage({
  src,
  alt,
  crop,
  width,
  height,
  fill,
  imageStyle,
  onError,
  loading = 'lazy',
  sizes
}: Readonly<CroppedImageProps>) {
  const parseCrop = (crop: CropRect | { rect: CropRect } | null | undefined): CropRect | null => {
    if (!crop) return null;
    if ('rect' in crop) return crop.rect;
    return crop;
  };
  const parsedCrop = parseCrop(crop);
  const isValidCrop = !!(parsedCrop && parsedCrop.width > 0 && parsedCrop.height > 0);

  const { containerRef, imgRef, handleImageLoad, croppedImgStyle } = useImageCrop(isValidCrop ? parsedCrop : null);

  const shouldFill = fill || (!width && !height);

  if (!src) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: shouldFill ? '100%' : width || '100%',
        height: shouldFill ? '100%' : height || '100%',
        aspectRatio: width && height && !shouldFill ? `${width} / ${height}` : 'auto'
      }}
    >
      {isValidCrop ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={onError}
          style={{ ...imageStyle, ...croppedImgStyle }}
          loading={loading}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={shouldFill}
          width={shouldFill ? undefined : width}
          height={shouldFill ? undefined : height}
          style={{ objectFit: 'cover', ...imageStyle }}
          onError={onError}
          loading={loading}
          sizes={sizes}
        />
      )}
    </Box>
  );
}

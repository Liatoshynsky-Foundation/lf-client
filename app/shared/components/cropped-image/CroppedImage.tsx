'use client';

import Box from '@mui/material/Box';
import Image from 'next/image';

import { type CropRect } from '~/lib/utils/cropUtils';
import { useImageCrop } from '~/shared/hooks/use-image-crop/useImageCrop';

interface CroppedImageProps {
  src: string;
  alt: string;
  crop?: CropRect | null;
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
  const { containerRef, imgRef, handleImageLoad, croppedImgStyle } = useImageCrop(crop);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        aspectRatio: width && height ? `${width} / ${height}` : 'auto'
      }}
    >
      {crop ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={onError}
          style={croppedImgStyle}
          loading={loading}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          style={imageStyle}
          onError={onError}
          loading={loading}
          sizes={sizes}
        />
      )}
    </Box>
  );
}

import type React from 'react';

export type CropRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function buildCroppedStyle(
  crop: CropRect,
  natW: number,
  natH: number,
  containerW: number,
  containerH: number
): React.CSSProperties {
  const scaleX = containerW / crop.width;
  const scaleY = containerH / crop.height;
  const scale = Math.max(scaleX, scaleY);
  const translateX = -(crop.x * scale) + (containerW - crop.width * scale) / 2;
  const translateY = -(crop.y * scale) + (containerH - crop.height * scale) / 2;

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: natW,
    height: natH,
    maxWidth: 'none',
    transformOrigin: '0 0',
    transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
  };
}

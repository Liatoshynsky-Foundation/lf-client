import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { type CropRect } from '~/lib/utils/cropUtils';

type UseImageCropOptions = {
  safeInsetY?: number;
};

function buildCropStyle(
  crop: CropRect,
  natW: number,
  natH: number,
  containerW: number,
  containerH: number,
  safeInsetY: number
): React.CSSProperties {
  const safeH = containerH * (1 - 2 * safeInsetY);

  let scale = Math.min(containerW / crop.width, safeH / crop.height);

  const minScale = Math.max(containerW / natW, containerH / natH);
  scale = Math.max(scale, minScale);

  let translateX = containerW / 2 - (crop.x + crop.width / 2) * scale;
  let translateY = containerH / 2 - (crop.y + crop.height / 2) * scale;

  translateX = Math.min(0, Math.max(containerW - natW * scale, translateX));
  translateY = Math.min(0, Math.max(containerH - natH * scale, translateY));

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

export function useImageCrop(crop?: CropRect | null, options: UseImageCropOptions = {}) {
  const { safeInsetY = 0 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [natSize, setNatSize] = useState({ w: 0, h: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!crop) return;

    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [crop]);

  useEffect(() => {
    if (!crop) return;
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth) {
      setNatSize({ w: img.naturalWidth, h: img.naturalHeight });
    }
  }, [crop]);

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setNatSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight });
  }, []);

  const croppedImgStyle = useMemo((): React.CSSProperties => {
    if (!natSize.w || !natSize.h || !containerSize.w || !containerSize.h || !crop || !crop.width || !crop.height) {
      return { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' };
    }
    return buildCropStyle(crop, natSize.w, natSize.h, containerSize.w, containerSize.h, safeInsetY);
  }, [crop, natSize, containerSize, safeInsetY]);

  return { containerRef, imgRef, handleImageLoad, croppedImgStyle };
}

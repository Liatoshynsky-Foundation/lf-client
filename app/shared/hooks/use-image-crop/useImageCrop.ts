import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { buildCroppedStyle, type CropRect } from '~/lib/utils/cropUtils';

export function useImageCrop(crop?: CropRect | null) {
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
    if (!natSize.w || !natSize.h || !containerSize.w || !containerSize.h || !crop) {
      return { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' };
    }
    return buildCroppedStyle(crop, natSize.w, natSize.h, containerSize.w, containerSize.h);
  }, [crop, natSize, containerSize]);

  return { containerRef, imgRef, handleImageLoad, croppedImgStyle };
}

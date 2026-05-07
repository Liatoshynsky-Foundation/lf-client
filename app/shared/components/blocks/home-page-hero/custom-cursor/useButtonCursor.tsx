import { MotionValue, useMotionValue } from 'framer-motion';
import { MouseEvent, RefObject, useEffect, useRef, useState } from 'react';

interface UseButtonCursorReturn {
  ref: RefObject<HTMLDivElement | null>;
  cursorConfig: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    isHovering: boolean;
  };
  eventHandlers: {
    onMouseEnter: (e: MouseEvent<HTMLElement>) => void;
    onMouseLeave: () => void;
    onMouseMove: (e: MouseEvent<HTMLElement>) => void;
  };
}

export const useButtonCursor = (): UseButtonCursorReturn => {
  const [isHovering, setIsHovering] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!isHovering || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const currentX = x.get();
      const currentY = y.get();

      const isInside =
        currentX >= rect.left && currentX <= rect.right && currentY >= rect.top && currentY <= rect.bottom;

      if (!isInside) {
        setIsHovering(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true });
  }, [isHovering, x, y]);

  useEffect(() => {
    if (isHovering) {
      document.body.style.setProperty('cursor', 'none', 'important');
    } else {
      document.body.style.removeProperty('cursor');
    }

    return () => {
      document.body.style.removeProperty('cursor');
    };
  }, [isHovering]);

  const eventHandlers = {
    onMouseEnter: (e: MouseEvent<HTMLElement>) => {
      setIsHovering(true);
      x.set(e.clientX);
      y.set(e.clientY);
    },
    onMouseLeave: () => setIsHovering(false),
    onMouseMove: (e: MouseEvent<HTMLElement>) => {
      x.set(e.clientX);
      y.set(e.clientY);
    }
  };

  return {
    ref,
    cursorConfig: {
      x,
      y,
      isHovering
    },
    eventHandlers
  };
};

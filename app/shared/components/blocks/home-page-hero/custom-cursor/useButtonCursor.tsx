import { MotionValue, useMotionValue } from 'framer-motion';
import { MouseEvent, useState } from 'react';

interface UseButtonCursorReturn {
  cursorConfig: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    isHovering: boolean;
  };
  eventHandlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseMove: (e: MouseEvent<HTMLElement>) => void;
  };
}

export const useButtonCursor = (): UseButtonCursorReturn => {
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const eventHandlers = {
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
    onMouseMove: (e: MouseEvent<HTMLElement>) => {
      x.set(e.clientX);
      y.set(e.clientY);
    }
  };

  return {
    cursorConfig: {
      x,
      y,
      isHovering
    },
    eventHandlers
  };
};

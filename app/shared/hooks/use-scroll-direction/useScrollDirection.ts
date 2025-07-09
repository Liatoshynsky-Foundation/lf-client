import { useEffect, useRef, useState } from 'react';

import type { ScrollDirection } from '~/types/types/common.types';

export function useScrollDirection(threshold = 0) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('up');
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      const lastScrollTop = lastScrollTopRef.current;

      if (Math.abs(currentScrollTop - lastScrollTop) < threshold) {
        return;
      }

      setScrollDirection(currentScrollTop > lastScrollTop ? 'down' : 'up');
      lastScrollTopRef.current = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrollDirection;
}

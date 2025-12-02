'use client';
import { Box, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { styles } from '~/components/year-tabs/YearTabs.styles';
import ButtonGroup from '~/ds-components/button-group/ButtonGroup';
import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';
import { useScrollDirection } from '~/hooks/use-scroll-direction/useScrollDirection';

const HEADER_OFFSET = 100;

interface Data {
  years: string[];
}

export default function YearTabs({ years }: Readonly<Data>) {
  const { isMobile } = useBreakpoints();
  const [year, setYear] = useState<string>(years[0] ?? '');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const isClickScrolling = useRef(false);
  const scrollDirection = useScrollDirection(100);

  useEffect(() => {
    if (isMobile) return;

    const handleVisibility = () => {
      const isScrollingDown = scrollDirection === 'down';
      const isBelowHeader = window.scrollY > HEADER_OFFSET;
      const shouldHideOnScroll = isScrollingDown && isBelowHeader;
      setIsVisible(!shouldHideOnScroll);
    };

    handleVisibility();

    window.addEventListener('scroll', handleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', handleVisibility);
  }, [scrollDirection, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const selector = '[id^="year-"]';
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!elements.length) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px`,
      threshold: 0.1
    };

    const callback: IntersectionObserverCallback = (entries) => {
      if (isClickScrolling.current) return;
      let closestTarget: HTMLElement | null = null;
      let closestDistance = Infinity;

      for (const entry of entries) {
        if (!entry.isIntersecting) return;

        const top = entry.boundingClientRect.top;
        const distance = Math.abs(top - HEADER_OFFSET);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestTarget = entry.target as HTMLElement;
        }
      }

      if (closestTarget) {
        const id = closestTarget.id;
        const newYear = id.replace('year-', '');
        if (newYear) {
          setYear((prevYear) => (newYear === prevYear ? prevYear : newYear));
        }
      }
    };

    const observer = new IntersectionObserver(callback, options);

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  const handleYearChange = (selectedYear: string) => {
    isClickScrolling.current = true;
    setYear(selectedYear);
    const element = document.getElementById(`year-${selectedYear}`);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    }
  };

  if (isMobile) return null;

  return (
    <Box data-testid="YearTabs">
      <ButtonGroup
        palette="secondary"
        sx={{
          ...styles.buttonGroup,
          transform: isVisible ? 'translate(-50%)' : 'translate(-50%, calc(100% + 5vh))',
          transition: 'transform 0.4s ease'
        }}
        activeButton={years.indexOf(year)}
        defaultActiveButton={0}
        buttons={years.map((year) => (
          <Button sx={styles.yearButton} value={year} key={year} onClick={() => handleYearChange(year)}>
            {year}
          </Button>
        ))}
        data-testid="YearTabs-yearsGroup"
      />
    </Box>
  );
}

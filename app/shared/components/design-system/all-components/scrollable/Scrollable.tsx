'use client';
import { BoxProps } from '@mui/material';
import React, { useEffect, useRef } from 'react';

import { ScrollableContainer, ScrollableContent, Thumb, Track } from './Scrollable.style';

interface ScrollableProps extends BoxProps {
  children: React.ReactNode;
}

const Scrollable = ({ children, sx, ...props }: ScrollableProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const thumb = thumbRef.current;
    if (!content || !thumb) return;

    const updateThumb = () => {
      const { scrollTop, scrollHeight, clientHeight } = content;
      const visiblePortion = clientHeight / scrollHeight;

      if (visiblePortion >= 1) {
        thumb.style.top = '0px';
        thumb.style.height = '0px';
        return;
      }

      const newThumbHeight = visiblePortion * clientHeight;
      const newThumbTop = (scrollTop / scrollHeight) * clientHeight;

      thumb.style.top = `${newThumbTop}px`;
      thumb.style.height = `${newThumbHeight}px`;
    };

    updateThumb();

    const onThumbCapture = (e: MouseEvent) => {
      e.preventDefault();
      thumb.style.transition = 'none';
      const startY = e.clientY;
      const startTop = thumb.offsetTop;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaY = moveEvent.clientY - startY;
        const newTop = Math.min(Math.max(startTop + deltaY, 0), content.clientHeight - thumb.offsetHeight);
        thumb.style.top = `${newTop}px`;
        content.scrollTop = (newTop / content.clientHeight) * content.scrollHeight;
      };

      const onMouseUp = () => {
        thumb.style.transition = 'height 0.2s, top 0.2s';
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    thumb.addEventListener('mousedown', onThumbCapture);
    content.addEventListener('scroll', updateThumb);
    window.addEventListener('resize', updateThumb);

    return () => {
      content.removeEventListener('scroll', updateThumb);
      window.removeEventListener('resize', updateThumb);
      thumb.removeEventListener('mousedown', onThumbCapture);
    };
  }, [children]);

  return (
    <ScrollableContainer sx={sx} {...props}>
      <ScrollableContent ref={contentRef}>{children}</ScrollableContent>
      <Track aria-label="scrollbar track">
        <Thumb ref={thumbRef} aria-label="scrollbar thumb" />
      </Track>
    </ScrollableContainer>
  );
};

export default Scrollable;

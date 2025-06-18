'use client';
import { BoxProps, ButtonGroup as MUIButtonGroup } from '@mui/material';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { StyledButtonItem, StyledIndicator } from './ButtonGroup.styles';
import { ButtonGroupPaletteOptions, ButtonGroupSizeOptions } from '~/types/types/common.types';

interface ButtonGroupProps extends BoxProps {
  buttons: React.ReactNode[];
  defaultActiveButton?: number;
  size?: ButtonGroupSizeOptions;
  palette?: ButtonGroupPaletteOptions;
}

const ButtonGroup = ({
  buttons,
  defaultActiveButton,
  size = 'small',
  palette = 'primary',
  sx,
  ...props
}: ButtonGroupProps) => {
  const [activeButton, setActiveButton] = useState<number | null>(defaultActiveButton ?? null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      if (activeButton === null || !buttonRefs.current[activeButton] || !containerRef.current) {
        setIndicatorStyle({ left: 0, width: 0 });
        return;
      }
      const currentButton = buttonRefs.current[activeButton]!;
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = currentButton.getBoundingClientRect();
      const left = buttonRect.left - containerRect.left;
      const width = buttonRect.width;

      setIndicatorStyle({ left, width });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeButton, buttons]);

  const { color: _, ...restProps } = props;

  return (
    <MUIButtonGroup component="div" sx={sx} ref={containerRef} aria-label="Button Group" {...restProps}>
      <StyledIndicator
        palette={palette}
        left={indicatorStyle.left}
        width={indicatorStyle.width}
        role="presentation"
        aria-hidden="true"
      />
      {buttons.map((button, idx) => (
        <StyledButtonItem
          key={(button?.toString?.() ?? 'button') + idx}
          ref={(el: HTMLDivElement | null) => {
            buttonRefs.current[idx] = el;
          }}
          onClick={() => setActiveButton(idx)}
          palette={palette}
          size={size}
          active={idx === activeButton}
        >
          {button}
        </StyledButtonItem>
      ))}
    </MUIButtonGroup>
  );
};
export default ButtonGroup;

'use client';
import { BoxProps, ButtonGroup as MUIButtonGroup } from '@mui/material';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { StyledButtonItem, StyledIndicator } from './ButtonGroup.styles';
import { ButtonGroupPaletteOptions, ButtonGroupSizeOptions } from '~/types/types/common.types';

interface ButtonGroupProps extends Omit<BoxProps, 'color' | 'size'> {
  buttons: React.ReactNode[];
  defaultActiveButton?: number;
  activeButton?: number;
  size?: ButtonGroupSizeOptions;
  palette?: ButtonGroupPaletteOptions;
  animateIndicator?: boolean;
}

const ButtonGroup = ({
  buttons,
  defaultActiveButton,
  activeButton: controlledActiveButton,
  size = 'small',
  palette = 'primary',
  animateIndicator = true,
  sx,
  ...props
}: ButtonGroupProps) => {
  const isControlled = controlledActiveButton !== undefined;

  const [uncontrolledActive, setUncontrolledActive] = useState<number | null>(defaultActiveButton ?? null);
  const activeButton = isControlled ? controlledActiveButton : uncontrolledActive;

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

    const resizeObserver = new ResizeObserver(() => {
      updateIndicator();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeButton, buttons]);

  return (
    <MUIButtonGroup component="div" sx={sx} ref={containerRef} aria-label="Button Group" color={palette} {...props}>
      <StyledIndicator
        palette={palette}
        left={indicatorStyle.left}
        width={indicatorStyle.width}
        animate={animateIndicator}
        aria-label="indicator"
        aria-hidden="true"
      />
      {buttons.map((button, idx) => (
        <StyledButtonItem
          key={(button?.toString?.() ?? 'button') + idx}
          ref={(el: HTMLDivElement | null) => {
            buttonRefs.current[idx] = el;
          }}
          onClick={() => {
            if (!isControlled) {
              setUncontrolledActive(idx);
            }
          }}
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

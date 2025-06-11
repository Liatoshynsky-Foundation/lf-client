'use client';
import { Box, BoxProps, ButtonGroup as MUIButtonGroup } from '@mui/material';
import React, { useLayoutEffect } from 'react';

import { defaultButtonGroupColorScheme, styles } from './ButtonGroup.styles';

interface ButtonGroupColorSettings {
  selectedButtonColor: string;
  selectedButtonTextColor: string;
  groupBackgroundColor: string;
  buttonTextColor: string;
}

interface ButtonGroupProps extends BoxProps {
  buttons: React.ReactNode[];
  defaultActiveButton?: number;
  colorSettings?: ButtonGroupColorSettings;
}

const ButtonGroup = ({ buttons, sx, defaultActiveButton, colorSettings, ...props }: ButtonGroupProps) => {
  const [activeButton, setActiveButton] = React.useState<number | null>(defaultActiveButton ?? null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<{ left: number; width: number }>({
    left: 0,
    width: 0
  });

  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  const { selectedButtonColor, selectedButtonTextColor, groupBackgroundColor, buttonTextColor } =
    colorSettings ?? defaultButtonGroupColorScheme;

  let padding = 4;
  if (sx && typeof sx === 'object' && !Array.isArray(sx) && 'padding' in sx) {
    const paddingVal = (sx as { padding?: number | string }).padding ?? 4;
    if (typeof paddingVal === 'number') {
      padding = paddingVal;
    } else if (typeof paddingVal === 'string') {
      const paddingMatch = paddingVal.replace(/px$/, '');
      if (!/^\d{1,5}(\.\d{1,3})?$/.test(paddingMatch)) {
        throw new Error(`Invalid padding value: ${paddingVal}, must be a number or a string ending with 'px'.`);
      }
      padding = parseFloat(paddingMatch);
    }
  }

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
  }, [activeButton, buttons, padding]);

  return (
    <MUIButtonGroup
      ref={containerRef}
      sx={{
        ...styles.defaultButtonGroup,
        ...sx,
        backgroundColor: groupBackgroundColor,
        color: buttonTextColor,
        position: 'relative'
      }}
      aria-label="Button Group"
      {...props}
    >
      <Box
        sx={{
          ...styles.selectedButton,
          height: `calc(100% - ${2 * padding}px)`,
          top: `${padding}px`,
          backgroundColor: selectedButtonColor,
          color: selectedButtonTextColor,
          left: indicatorStyle.left,
          width: indicatorStyle.width
        }}
        role="presentation"
        aria-hidden="true"
      />
      {buttons.map((button, idx) => (
        <Box
          key={(button?.toString?.() ?? 'button') + idx}
          ref={(el: HTMLDivElement | null) => {
            buttonRefs.current[idx] = el;
          }}
          onClick={() => setActiveButton(idx)}
          sx={{
            ...styles.defaultButton,
            color: idx === activeButton ? selectedButtonTextColor : buttonTextColor
          }}
        >
          {button}
        </Box>
      ))}
    </MUIButtonGroup>
  );
};
export default ButtonGroup;

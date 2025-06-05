'use client';
import React, { useState, useLayoutEffect, useRef } from 'react';
import { Box, BoxProps } from '@mui/material';
import { styles, defaultButtonGroupColorScheme } from './ButtonGroup.styles';

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
  const [activeButton, setActiveButton] = useState<number | null>(defaultActiveButton ?? null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0
  });

  const buttonRefs = useRef<Array<HTMLDivElement | null>>([]);

  const { selectedButtonColor, selectedButtonTextColor, groupBackgroundColor, buttonTextColor } =
    colorSettings ?? defaultButtonGroupColorScheme;

  useLayoutEffect(() => {
    if (activeButton === null || !buttons[activeButton]) {
      setIndicatorStyle({ left: 0, width: 0 });
      return;
    }

    const currentButton = buttonRefs.current[activeButton];
    if (currentButton?.parentElement) {
      const buttonRect = currentButton.getBoundingClientRect();
      const containerRect = currentButton.parentElement.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left - 5,
        width: buttonRect.width + 10
      });
    }
  }, [activeButton, buttons]);

  return (
    <Box
      sx={{
        ...sx,
        ...styles.defaultButtonGroup,
        backgroundColor: groupBackgroundColor,
        color: buttonTextColor
      }}
      aria-label="Button Group"
      {...props}
    >
      <Box
        sx={{
          ...styles.selectedButton,
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
          key={(button as React.ReactElement).key}
          ref={(el: HTMLDivElement | null) => {
            buttonRefs.current[idx] = el;
          }}
          sx={{
            color: idx === activeButton ? selectedButtonTextColor : buttonTextColor
          }}
          onClick={() => setActiveButton(idx)}
        >
          {button}
        </Box>
      ))}
    </Box>
  );
};

export default ButtonGroup;

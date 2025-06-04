'use client';
import React, { useState, useLayoutEffect, useRef } from 'react';
import { Box, BoxProps } from '@mui/material';
import { styles } from './ButtonGroup.styles';

interface ButtonGroupColorSettings {
  selectedButtonColor: string;
  selectedButtonTextColor: string;
  groupBackgroundColor: string;
  buttonTextColor: string;
}

interface ButtonGroupProps extends BoxProps {
  buttons: string[];
  defaultActiveButton?: number;
  colorSettings?: ButtonGroupColorSettings;
}

const ButtonGroup = ({ buttons, sx, defaultActiveButton, colorSettings }: ButtonGroupProps) => {
  const [activeButton, setActiveButton] = useState<number | null>(defaultActiveButton ?? null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0
  });

  const {
    selectedButtonColor = '#190D03',
    selectedButtonTextColor = '#FCFCFC',
    groupBackgroundColor = '#f0f0f0',
    buttonTextColor = '#190D03'
  } = colorSettings || {};

  // Create a ref array
  const buttonRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Update the indicator position/width when activeButton or buttons change.
  useLayoutEffect(() => {
    if (activeButton === null || !buttons[activeButton]) {
      // Reset indicator if no active button
      setIndicatorStyle({ left: 0, width: 0 });
      return;
    }

    const currentButton = buttonRefs.current[activeButton];
    if (currentButton && currentButton.parentElement) {
      // Get bounding rects in relation to the container
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
        ...styles.defaultButtonGroup,
        backgroundColor: groupBackgroundColor,
        color: buttonTextColor,
        ...sx
      }}
    >
      {/* Animated indicator */}
      <Box
        sx={{
          ...styles.selectedButton,
          backgroundColor: selectedButtonColor,
          color: selectedButtonTextColor,
          left: indicatorStyle.left,
          width: indicatorStyle.width
        }}
      />
      {buttons.map((buttonName, idx) => (
        <Box
          key={idx}
          ref={(el: HTMLDivElement | null) => {
            buttonRefs.current[idx] = el;
          }}
          sx={{
            ...styles.defaultButton,
            color: idx === activeButton ? selectedButtonTextColor : buttonTextColor
          }}
          onClick={() => setActiveButton(idx)}
        >
          {buttonName}
        </Box>
      ))}
    </Box>
  );
};

export default ButtonGroup;

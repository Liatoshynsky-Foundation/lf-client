'use client';
import { alpha, Box, BoxProps, ButtonGroup as MUIButtonGroup, SxProps, Theme } from '@mui/material';
import React, { useLayoutEffect } from 'react';

import { defaultButtonGroupColorScheme, styles } from './ButtonGroup.styles';
import { ButtonGroupSize } from '~/types/enums/common.enums';

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
  variant?: ButtonGroupSize;
}

const ButtonGroup = ({ buttons, sx, defaultActiveButton, colorSettings, variant, ...props }: ButtonGroupProps) => {
  const [activeButton, setActiveButton] = React.useState<number | null>(defaultActiveButton ?? null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<{ left: number; width: number }>({
    left: 0,
    width: 0
  });

  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  const { selectedButtonColor, selectedButtonTextColor, groupBackgroundColor, buttonTextColor } =
    colorSettings ?? defaultButtonGroupColorScheme;

  const paddingSize = variant && variant === ButtonGroupSize.Big ? '8px 22px' : '2px 16px';

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
    <MUIButtonGroup
      component="div"
      ref={containerRef}
      sx={
        {
          ...styles.defaultButtonGroup,
          ...sx,
          backgroundColor: groupBackgroundColor,
          color: buttonTextColor,
          position: 'relative'
        } as SxProps<Theme>
      }
      aria-label="Button Group"
      {...restProps}
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
          key={(button?.toString?.() ?? 'button') + idx}
          ref={(el: HTMLDivElement | null) => {
            buttonRefs.current[idx] = el;
          }}
          onClick={() => setActiveButton(idx)}
          sx={{
            ...styles.defaultButton,
            padding: paddingSize,
            color: idx === activeButton ? selectedButtonTextColor : buttonTextColor,
            '&:hover': {
              backgroundColor: alpha(selectedButtonColor, 0.1)
            },
            '&:active': {
              backgroundColor: alpha(selectedButtonColor, 0.2)
            }
          }}
        >
          {button}
        </Box>
      ))}
    </MUIButtonGroup>
  );
};
export default ButtonGroup;

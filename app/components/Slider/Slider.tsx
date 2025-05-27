import React from 'react';
import { Box, Typography, Slider, SliderProps } from '@mui/material';
import { sliderStyles } from './Slider.styles';

export interface CustomSliderProps extends Omit<SliderProps, 'size' | 'valueLabelDisplay'> {
  size?: 'small' | 'big';
}

export const DesignSystemSlider: React.FC<CustomSliderProps> = ({
  size = 'big',
  min = 0,
  max = 100,
  value,
  ...props
}) => {
  const marks = Array.isArray(value)
    ? Array.from({ length: Math.floor((max - min) / 5) + 1 }, (_, i) => ({
      value: min + i * 5,
    }))
    : undefined;

  return (
    <Box sx={sliderStyles.base}>
      {Array.isArray(value) && (
        <Box sx={sliderStyles.valueContainer}>
          <Typography
            variant='body2'
            sx={{
              ...sliderStyles.valueLabel,
              left: `${((value[0] - min) / (max - min)) * 100}%`,
              fontSize: sliderStyles.valueLabel.fontSize(size),
            }}
          >
            {value[0]}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              ...sliderStyles.valueLabel,
              left: `${((value[1] - min) / (max - min)) * 100}%`,
              fontSize: sliderStyles.valueLabel.fontSize(size),
            }}
          >
            {value[1]}
          </Typography>
        </Box>
      )}
      <Slider
        {...props}
        value={value}
        min={min}
        max={max}
        marks={marks}
        sx={{
          ...sliderStyles.slider,
          '& .MuiSlider-thumb': {
            ...sliderStyles.slider['& .MuiSlider-thumb'],
            width: sliderStyles.slider['& .MuiSlider-thumb'].width(size),
            height: sliderStyles.slider['& .MuiSlider-thumb'].height(size),
          },
          '& .MuiSlider-track': {
            ...sliderStyles.slider['& .MuiSlider-track'],
            height: sliderStyles.slider['& .MuiSlider-track'].height(size),
          },
          '& .MuiSlider-rail': {
            ...sliderStyles.slider['& .MuiSlider-rail'],
            height: sliderStyles.slider['& .MuiSlider-rail'].height(size),
          },
        }}
      />
      <Box sx={sliderStyles.minMaxContainer}>
        <Typography
          variant='body2'
          sx={{
            fontSize: sliderStyles.minMaxLabel.fontSize(size),
          }}
        >
          {min}
        </Typography>
        <Typography
          variant='body2'
          sx={{
            fontSize: sliderStyles.minMaxLabel.fontSize(size),
          }}
        >
          {max}
        </Typography>
      </Box>
    </Box>
  );
};

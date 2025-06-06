import React from 'react';
import { Switch, SwitchProps } from '@mui/material';
import { switchStyles } from './Switch.styles';

interface CustomSwitchProps extends Omit<SwitchProps, 'onChange'> {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'medium',
  ...props
}) => {
  return <Switch sx={switchStyles} checked={checked} onChange={onChange} disabled={disabled} size={size} {...props} />;
};

export default CustomSwitch;

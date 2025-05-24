'use client';
import { Checkbox } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel , { FormControlLabelProps }from '@mui/material/FormControlLabel';
import { CheckboxProps } from '@mui/material/Checkbox';
import { checkboxStyles } from './Checkbox.styles';

type OverlappingKeys = keyof CheckboxProps | 'control' 
type AllowedSizes = 'medium' | 'large'
export interface CustomCheckboxProps
  extends Omit<FormControlLabelProps, OverlappingKeys>,
          Omit<CheckboxProps, 'size'> {
  size?: AllowedSizes;
}
export default function CustomCheckbox({ disabled, defaultChecked, size, label } : CustomCheckboxProps) {
    return (
        <FormGroup>
            <FormControlLabel control={
                <Checkbox
                sx={checkboxStyles}
                size={size}
                disabled={disabled}
                defaultChecked={defaultChecked}
            />}
                label={label}
            />
        </FormGroup>
    );
}
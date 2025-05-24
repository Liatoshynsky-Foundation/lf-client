'use client';
import { Checkbox } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CheckboxProps } from '@mui/material/Checkbox';
import { checkboxStyles } from './Checkbox.styles';


interface CustomCheckboxProps extends CheckboxProps {
    label: React.ReactNode;
    size?: 'medium' | 'large';
}
type ReadonlyCustomCheckboxProps = Readonly<CustomCheckboxProps>;
export default function CustomCheckbox({ disabled, defaultChecked, size, label } : ReadonlyCustomCheckboxProps) {
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
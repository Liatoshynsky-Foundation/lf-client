'use client';
import { Box, Checkbox } from '@mui/material';
import { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

interface CustomCheckboxProps extends CheckboxProps {
  label: React.ReactNode;
  size?: 'medium' | 'large';
}
type ReadonlyCustomCheckboxProps = Readonly<CustomCheckboxProps>;
export const CustomCheckbox: React.FC<ReadonlyCustomCheckboxProps> = ({
  disabled,
  defaultChecked,
  size,
  label,
  onChange
}: ReadonlyCustomCheckboxProps) => {
  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox size={size} disabled={disabled} defaultChecked={defaultChecked} onChange={onChange} />}
          label={label}
        />
      </FormGroup>
    </Box>
  );
};

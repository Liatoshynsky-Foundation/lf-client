import { render, screen, fireEvent } from '@testing-library/react';
import CustomTextField from './CustomTextField';

describe('Footer', () => {
  test('renders with label and placeholder', () => {
    render(<CustomTextField label="Label" placeholder="Enter text..." />);
    expect(screen.getByLabelText('Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  test('renders with a value', () => {
    render(<CustomTextField value="Value" label="Label" />);
    const input = screen.getByLabelText('Label') as HTMLInputElement;
    expect(input.value).toBe('Value');
  });

  test('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(
      <CustomTextField
        label="Input"
        value=""
        onChange={handleChange}
        placeholder="Enter text..."
      />,
    );
    const input = screen.getByPlaceholderText('Enter text...');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<CustomTextField label="Disabled" disabled value="Value" />);
    const input = screen.getByLabelText('Disabled');
    expect(input).toBeDisabled();
  });

  test('shows error style when error is true', () => {
    render(<CustomTextField label="Error" error />);
    const input = screen.getByLabelText('Error');
    expect(input).toHaveClass('Mui-error');
  });

  test('uses outlined variant when passed', () => {
    render(<CustomTextField label="Outlined" variant="outlined" />);
    const input = screen.getByLabelText('Outlined');
    expect(input.closest('.MuiOutlinedInput-root')).toBeInTheDocument();
  });

  test('uses standard variant by default', () => {
    render(<CustomTextField label="Standard" />);
    const input = screen.getByLabelText('Standard');
    expect(input.closest('.MuiInput-root')).toBeInTheDocument();
  });

  test('uses default id when label is not provided', () => {
    render(<CustomTextField value="Value" />);
    const input = screen.getByDisplayValue('Value');
    expect(input).toHaveAttribute('id', 'custom-text-field');
  });
});

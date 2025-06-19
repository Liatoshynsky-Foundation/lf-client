import { fireEvent, render, screen } from '@testing-library/react';

import TextField from './TextField';

describe('TextField', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });
  afterEach(() => jest.clearAllMocks());

  it('should render with label and placeholder', () => {
    render(<TextField onChange={handleChange} label="Label" placeholder="Enter text..." />);
    expect(screen.getByLabelText('Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('should render with a value', () => {
    render(<TextField onChange={handleChange} value="Value" label="Label" />);
    const input = screen.getByLabelText('Label') as HTMLInputElement;
    expect(input.value).toBe('Value');
  });

  it('should call onChange when typing', () => {
    render(<TextField label="Input" value="" onChange={handleChange} placeholder="Enter text..." />);
    const input = screen.getByPlaceholderText('Enter text...');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<TextField onChange={handleChange} label="Disabled" disabled value="Value" />);
    const input = screen.getByLabelText('Disabled');
    expect(input).toBeDisabled();
  });

  it('should show error style when error is true', () => {
    render(<TextField onChange={handleChange} label="Error" error />);
    const input = screen.getByLabelText('Error');
    expect(input.closest('.MuiInput-root')).toHaveClass('Mui-error');
  });

  it('should use outlined variant when passed', () => {
    render(<TextField onChange={handleChange} label="Outlined" variant="outlined" />);
    const input = screen.getByLabelText('Outlined');
    expect(input.closest('.MuiOutlinedInput-root')).toBeInTheDocument();
  });

  it('should use standard variant by default', () => {
    render(<TextField onChange={handleChange} label="Standard" />);
    const input = screen.getByLabelText('Standard');
    expect(input.closest('.MuiInput-root')).toBeInTheDocument();
  });

  it('should use default id when label is not provided', () => {
    render(<TextField onChange={handleChange} value="Value" />);
    const input = screen.getByDisplayValue('Value');
    expect(input).toHaveAttribute('id', 'custom-text-field');
  });
});

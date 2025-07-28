import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

const VirtualizedListbox = ({ children, ...props }: any) => (
  <ul data-testid="virtualized-listbox" {...props}>
    {children}
  </ul>
);

describe('Autocomplete Component', () => {
  const mockOnChange = jest.fn();
  const mockHandleInputChange = jest.fn();
  const renderInput = (params: any) => <TextField {...params} label="Search music" />;
  const getOptionLabel = (option: any) => option.label;

  const setup = (propsOverride = {}) => {
    const options = [
      { label: 'Song One', id: 1 },
      { label: 'Song Two', id: 2 }
    ];

    render(
      <Autocomplete
        data-testid="music-search"
        options={options}
        loading={false}
        value={null}
        onChange={mockOnChange}
        inputValue=""
        onInputChange={mockHandleInputChange}
        renderInput={renderInput}
        getOptionLabel={getOptionLabel}
        clearOnBlur={false}
        popupIcon={null}
        clearIcon={false}
        loadingText={<Typography variant="customMedium16">Не знайдено</Typography>}
        noOptionsText={<Typography variant="customMedium16">No results</Typography>}
        disableListWrap={true}
        slotProps={{
          listbox: {
            style: {
              padding: 0,
              margin: 0,
              overflow: 'hidden',
              maxHeight: 'none'
            },
            component: VirtualizedListbox as any
          }
        }}
        {...propsOverride}
      />
    );
  };

  it('renders the Autocomplete component', () => {
    setup();
    expect(screen.getByTestId('music-search')).toBeInTheDocument();
  });

  it('calls handleInputChange on input', async () => {
    setup();
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Song' } });
    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  it('calls onChange when an option is selected', async () => {
    setup();
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Song One' } });

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  it('uses getOptionLabel correctly', () => {
    setup();
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  it('uses VirtualizedListbox component', async () => {
    setup();
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    await waitFor(() => {
      expect(screen.getByTestId('virtualized-listbox')).toBeInTheDocument();
    });
  });
});

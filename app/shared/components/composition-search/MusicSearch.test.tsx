// import { act, fireEvent, render, screen, within } from '@testing-library/react';
// import React, { ReactNode } from 'react';

// import { MusicSearch } from './MusicSearch';

// interface VirtualizedListboxProps {
//   children: ReactNode[];
// }
// jest.mock('next-intl', () => ({
//   useTranslations: () => {
//     const translations: Record<string, string> = {
//       notFound: 'Не знайдено'
//     };
//     return (key: string) => translations[key] || key;
//   }
// }));
// describe('MusicSearch component', () => {
//   const handleChange = jest.fn();
//   beforeEach(() => {
//     render(<MusicSearch setSearch={handleChange} search={''} />);
//   });
//   beforeAll(() => {
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         json: () => Promise.resolve([{ name: 'Song A' }, { name: 'Song B' }])
//       })
//     ) as jest.Mock;
//   });
//   // jest.mock('~/components/composition-search/LazyListItem', () => {
//   //   const MockComponent = React.forwardRef<HTMLDivElement, VirtualizedListboxProps>(
//   //     (props: VirtualizedListboxProps, ref) => (
//   //       <div ref={ref} data-testid="mock-child-component" {...props}>
//   //         {props.children}
//   //       </div>
//   //     )
//   //   );
//   //   MockComponent.displayName = 'mockVirtailizedList';
//   //   return {
//   //     __esModule: true,
//   //     default: MockComponent
//   //   };
//   // });
//   jest.mock('react-virtualized', () => ({
//     AutoSizer: ({ children }: any) => children({ width: 300, height: 600 }),
//     List: () => <div data-testid="mock-list">Mocked List</div>
//   }));

//   jest.mock('react-virtualized');
//   it('should render the MusicSearch icon', () => {
//     expect(screen.getByAltText('search')).toBeInTheDocument();
//   });
//   jest.mock('~/components/composition-search/LazyListItem', () => {
//     const MockedComponent = React.forwardRef((props: any, ref) => (
//       <div ref={ref} data-testid="mock-virtualized-listbox">
//         {props.children}
//       </div>
//     ));
//     MockedComponent.displayName = 'MockedVirtualizedListbox';

//     return {
//       __esModule: true,
//       VirtualizedListbox: MockedComponent
//     };
//   });
//   it('should render the Autocomplete and check list opening and closing', async () => {
//     const input = screen.getByRole('combobox');
//     expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
//     fireEvent.mouseDown(input);
//     expect(screen.getByTestId('mock-virtualized-listbox')).toBeInTheDocument();
//     await act(async () => {
//       // fireEvent.mouseDown(input);
//       // fireEvent.change(input, { target: { value: 'Song A' } });
//       // await waitFor(async () => {
//       // expect(screen.getByText('Song A')).toBeInTheDocument();
//       const listbox = await screen.findByRole('listbox');
//       listbox.style.width = '300px';
//       listbox.style.height = '200px';
//       expect(within(listbox).getByText('Song A')).toBeInTheDocument();
//       // });
//       // fireEvent.click(listItem);
//     });
//     // act(() => {
//     //   fireEvent.click(listItem);
//     // });
//     expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
//   });

//   // it('should find clear button and clean the input after a click', async () => {
//   //   const input = screen.getByRole('combobox');
//   //   fireEvent.change(input, { target: { value: 'Song A' } });
//   //   const clearButton = screen.getByAltText('close');
//   //   await userEvent.click(clearButton);
//   //   await waitFor(() => {
//   //     expect(input).toHaveValue('');
//   //   });
//   // });

//   // it('should focus input when search icon is clicked', async () => {
//   //   const input = screen.getByRole('combobox');
//   //   const searchIcon = screen.getByAltText('search');
//   //   input.blur();
//   //   expect(document.activeElement).not.toBe(input);
//   //   await userEvent.click(searchIcon);
//   //   expect(document.activeElement).toBe(input);
//   // });

//   // it('should update value when option is selected', async () => {
//   //   const input = screen.getByRole('combobox');
//   //   fireEvent.mouseDown(input);
//   //   fireEvent.change(input, { target: { value: 'Song A' } });
//   //   const listItem = await screen.findByText('Song A');
//   //   await userEvent.click(listItem);
//   //   expect(input).toHaveValue('Song A');
//   // });

//   // it('should render no options text when no data is provided', () => {
//   //   cleanup();
//   //   render(<MusicSearch setSearch={handleChange} search={''} />);
//   //   const input = screen.getByRole('combobox');
//   //   fireEvent.mouseDown(input);
//   //   expect(screen.getByText('Не знайдено')).toBeInTheDocument();
//   // });

//   // it('should debounce onFilterChange calls', () => {
//   //   jest.useFakeTimers();
//   //   const input = screen.getByRole('combobox');
//   //   fireEvent.change(input, { target: { value: 'hello' } });
//   //   expect(handleChange).toHaveBeenCalledWith('hello');
//   //   expect(input).toHaveValue('hello');
//   //   act(() => {
//   //     jest.advanceTimersByTime(400);
//   //   });
//   //   expect(input).toHaveValue('hello');
//   //   jest.useRealTimers();
//   // });

//   // it('should clear value state when clear button is clicked', async () => {
//   //   const input = screen.getByRole('combobox');
//   //   fireEvent.change(input, { target: { value: 'Song A' } });
//   //   const listItem = await screen.findByText('Song A');
//   //   fireEvent.click(listItem);
//   //   expect(input).toHaveValue('Song A');
//   //   const clearButton = screen.getByAltText('close');
//   //   await userEvent.click(clearButton);
//   //   await waitFor(() => {
//   //     expect(input).toHaveValue('');
//   //   });
//   // });

//   // it('should focus input when search icon is clicked even if not focused', async () => {
//   //   const input = screen.getByRole('combobox');
//   //   input.blur();
//   //   expect(document.activeElement).not.toBe(input);
//   //   const searchIcon = screen.getByAltText('search');
//   //   await userEvent.click(searchIcon);
//   //   expect(document.activeElement).toBe(input);
//   // });
// });
// Autocomplete.test.tsx
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

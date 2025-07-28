ніка, [28.07.2025 13:44]
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

  // it('should find clear button and clean the input after a click', async () => {
  //   const input = screen.getByRole('combobox');
  //   fireEvent.change(input, { target: { value: 'Song A' } });
  //   const clearButton = screen.getByAltText('close');
  //   await userEvent.click(clearButton);
  //   await waitFor(() => {
  //     expect(input).toHaveValue('');
  //   });
  // });

//   it('should focus input when search icon is clicked', async () => {
//     const input = screen.getByRole('combobox');
//     const searchIcon = screen.getByAltText('search');
//     input.blur();
//     expect(document.activeElement).not.toBe(input);
//     await userEvent.click(searchIcon);
//     expect(document.activeElement).toBe(input);
//   });

ніка, [28.07.2025 13:44]
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

//   it('should debounce onFilterChange calls', () => {
//     jest.useFakeTimers();
//     const input = screen.getByRole('combobox');
//     fireEvent.change(input, { target: { value: 'hello' } });
//     expect(handleChange).toHaveBeenCalledWith('hello');
//     expect(input).toHaveValue('hello');
//     act(() => {
//       jest.advanceTimersByTime(400);
//     });
//     expect(input).toHaveValue('hello');
//     jest.useRealTimers();
//   });

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

//   it('should focus input when search icon is clicked even if not focused', async () => {
//     const input = screen.getByRole('combobox');
//     input.blur();
//     expect(document.activeElement).not.toBe(input);
//     const searchIcon = screen.getByAltText('search');
//     await userEvent.click(searchIcon);
//     expect(document.activeElement).toBe(input);
//   });
// });
// Autocomplete.test.tsx
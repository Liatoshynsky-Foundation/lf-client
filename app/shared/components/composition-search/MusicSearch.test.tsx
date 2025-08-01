import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { MusicSearch } from './MusicSearch';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: Record<string, string> = {
      notFound: 'Not found',
      loading: 'Loading...'
    };

    return (key: string) => translations[key] || key;
  }
}));
jest.mock('./LazyListItem', () => ({
  VirtualizedListbox: ({ children }: any) => <ul>{children}</ul>
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ _id: '1', title: 'Test Song' }])
  })
) as jest.Mock;
describe('MusicSearch', () => {
  it('should display loading text', async () => {
    render(<MusicSearch search="" setSearch={jest.fn()} />);

    const input = screen.getByRole('combobox');
    input.focus();
    fireEvent.change(input, { target: { value: 't' } });
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
  it('should render the input and fetches options', async () => {
    const setSearch = jest.fn();

    render(<MusicSearch search="" setSearch={setSearch} />);

<<<<<<< HEAD
=======
  beforeEach(() => {
    render(<MusicSearch onFilterChange={handleChange} data={mockMusicData} />);
  });

  it('should render the MusicSearch icon', () => {
    expect(screen.getByAltText('search')).toBeInTheDocument();
  });

  it('should render the Autocomplete and check list opening and closing', () => {
>>>>>>> 54b88d8 (fix: revert music search test)
    const input = screen.getByRole('combobox');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    input.focus();
    fireEvent.change(input, { target: { value: 'T' } });
    await waitFor(() => {
      expect(screen.getByText('Test Song')).toBeInTheDocument();
    });
  });

  it('should call setSearch on input change', async () => {
    const setSearch = jest.fn();

    render(<MusicSearch search="" setSearch={setSearch} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Bohemian' } });

    await waitFor(() => {
      expect(setSearch).toHaveBeenCalledWith('Bohemian');
    });
  });

  it('should display no options text when no results', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve([])
    });

    render(<MusicSearch search="xyz" setSearch={jest.fn()} />);

    const input = screen.getByRole('combobox');
    input.focus();
    fireEvent.change(input, { target: { value: 'Bohemian' } });
    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });

  it('should find clear button and clean the input after a click', async () => {
    render(<MusicSearch search="" setSearch={jest.fn()} />);
    const input = screen.getByRole('combobox');
<<<<<<< HEAD
    fireEvent.change(input, { target: { value: 'Bohemian' } });
    const clearButton = screen.getByAltText('close');
    fireEvent.click(clearButton);
=======
    fireEvent.change(input, { target: { value: mockMusicData[1].name } });
    const clearButton = screen.getByAltText('close');
    await userEvent.click(clearButton);
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should focus input when search icon is clicked', async () => {
    const input = screen.getByRole('combobox');
    const searchIcon = screen.getByAltText('search');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    await userEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });

  it('should update value when option is selected', async () => {
    const input = screen.getByRole('combobox');
    fireEvent.mouseDown(input);
    fireEvent.change(input, { target: { value: mockMusicData[0].name } });
    const listItem = await screen.findByText(mockMusicData[0].name);
    await userEvent.click(listItem);
    expect(input).toHaveValue(mockMusicData[0].name);
  });

  it('should render no options text when no data is provided', () => {
    cleanup();
    render(<MusicSearch onFilterChange={handleChange} data={[]} />);
    const input = screen.getByRole('combobox');
    fireEvent.mouseDown(input);
    expect(screen.getByText('Не знайдено')).toBeInTheDocument();
  });

  it('should debounce onFilterChange calls', () => {
    jest.useFakeTimers();
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(handleChange).toHaveBeenCalledWith('hello');
    expect(input).toHaveValue('hello');
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(input).toHaveValue('hello');
    jest.useRealTimers();
  });

  it('should clear value state when clear button is clicked', async () => {
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: mockMusicData[0].name } });
    const listItem = await screen.findByText(mockMusicData[0].name);
    fireEvent.click(listItem);
    expect(input).toHaveValue(mockMusicData[0].name);
    const clearButton = screen.getByAltText('close');
    await userEvent.click(clearButton);
>>>>>>> 54b88d8 (fix: revert music search test)
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
  it('should focus input when search icon is clicked', async () => {
    const setSearch = jest.fn();

    render(<MusicSearch search="" setSearch={setSearch} />);

    const input = screen.getByRole('combobox');
    const searchIcon = screen.getByAltText('search');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });
  it('should focus input when search icon is clicked even if not focused', async () => {
    const setSearch = jest.fn();

    render(<MusicSearch search="" setSearch={setSearch} />);
    const input = screen.getByRole('combobox');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    const searchIcon = screen.getByAltText('search');
    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });
});

import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MusicSearch } from './MusicSearch';

// Mocking translations
jest.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: Record<string, string> = {
      notFound: 'Не знайдено'
    };
    return (key: string) => translations[key] || key;
  }
}));

describe('MusicSearch component', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    render(<MusicSearch onFilterChange={handleChange} />);
  });
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ name: 'Song A' }, { name: 'Song B' }])
      })
    ) as jest.Mock;
  });
  it('should render the MusicSearch icon', () => {
    expect(screen.getByAltText('search')).toBeInTheDocument();
  });

  it('should render the Autocomplete and check list opening and closing', () => {
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('id', 'music-search');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    fireEvent.mouseDown(input);
    fireEvent.change(input, { target: { value: 'Song A' } });
    const listItem = screen.getByText('Song A');
    fireEvent.click(listItem);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should find clear button and clean the input after a click', async () => {
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Song A' } });
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
    fireEvent.change(input, { target: { value: 'Song A' } });
    const listItem = await screen.findByText('Song A');
    await userEvent.click(listItem);
    expect(input).toHaveValue('Song A');
  });

  it('should render no options text when no data is provided', () => {
    cleanup();
    render(<MusicSearch onFilterChange={handleChange} />);
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
    fireEvent.change(input, { target: { value: 'Song A' } });
    const listItem = await screen.findByText('Song A');
    fireEvent.click(listItem);
    expect(input).toHaveValue('Song A');
    const clearButton = screen.getByAltText('close');
    await userEvent.click(clearButton);
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should focus input when search icon is clicked even if not focused', async () => {
    const input = screen.getByRole('combobox');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    const searchIcon = screen.getByAltText('search');
    await userEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });
});

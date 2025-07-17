import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { MusicSearch } from './MusicSearch';

jest.useFakeTimers();

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
  const mockMusicData = [
    {
      id: '6866df63724297c970de7741',
      name: 'Елегія',
      year: 1998,
      audioAvailable: false,
      sheetAvailable: true,
      sheetMusic: [{ fileName: 'elegy.pdf', url: '/sheets/elegy.pdf' }],
      createdAt: new Date('2025-07-03T19:52:03.274Z'),
      updatedAt: new Date('2025-07-03T19:52:03.274Z'),
      opus: 'op.2',
      opusTitle: 'Симфонія No. 1 B-moll',
      genre: ['Романс', 'Мистецька пісня']
    },
    {
      id: '6866df63724297c970de7742',
      name: 'Ноктюрн',
      year: 1998,
      audioAvailable: false,
      sheetAvailable: true,
      sheetMusic: [{ fileName: 'nocturne.pdf', url: '/sheets/nocturne.pdf' }],
      createdAt: new Date('2025-07-03T19:52:03.274Z'),
      updatedAt: new Date('2025-07-03T19:52:03.274Z'),
      opus: 'op.2',
      opusTitle: 'Симфонія No. 1 B-moll',
      genre: ['Романс', 'Мистецька пісня']
    }
  ];

  beforeEach(() => {
    render(<MusicSearch onFilterChange={handleChange} data={mockMusicData} />);
  });

  it('should render the MusicSearch icon', () => {
    expect(screen.getByAltText('search')).toBeInTheDocument();
  });

  it('should render the Autocomplete and check list opening and closing', async () => {
    const Input = screen.getByRole('combobox');
    expect(Input).toHaveAttribute('id', 'music-search');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    fireEvent.mouseDown(Input);
    fireEvent.change(Input, { target: { value: mockMusicData[0].name } });
    const ListItem = screen.getByText(mockMusicData[0].name);
    fireEvent.click(ListItem);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should find clear button and clean the input after a click', async () => {
    const Input = screen.getByRole('combobox');
    expect(Input).toHaveAttribute('id', 'music-search');
    fireEvent.change(Input, { target: { value: mockMusicData[1].name } });
    const clearButton = screen.getByAltText('close');
    clearButton.click();
    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(Input).toHaveValue('');
    });
  });

  it('should focus input when search icon is clicked', () => {
    const input = screen.getByRole('combobox');
    const searchIcon = screen.getByAltText('search');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    searchIcon.click();
    expect(document.activeElement).toBe(input);
  });

  it('should update value when option is selected', async () => {
    const input = screen.getByRole('combobox');
    fireEvent.mouseDown(input);
    fireEvent.change(input, { target: { value: mockMusicData[0].name } });
    const listItem = await screen.findByText(mockMusicData[0].name);
    fireEvent.click(listItem);
    expect(input).toHaveValue(mockMusicData[0].name);
  });

  it('should render no options text when no data is provided', () => {
    cleanup();
    render(<MusicSearch onFilterChange={handleChange} data={[]} />);
    const input = screen.getByRole('combobox');
    fireEvent.mouseDown(input);
    expect(screen.getByText('Не знайдено')).toBeInTheDocument();
  });

  it('should debounce onFilterChange calls', async () => {
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(handleChange).toHaveBeenCalledWith('hello');
    expect(input).toHaveValue('hello');
    expect(screen.getByRole('combobox')).toHaveValue('hello');
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(screen.getByRole('combobox')).toHaveValue('hello');
  });

  it('should clear value state when clear button is clicked', async () => {
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: mockMusicData[0].name } });
    const listItem = await screen.findByText(mockMusicData[0].name);
    fireEvent.click(listItem);
    expect(input).toHaveValue(mockMusicData[0].name);
    const clearButton = screen.getByAltText('close');
    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should focus input when search icon is clicked even if not focused', () => {
    const input = screen.getByRole('combobox');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    const searchIcon = screen.getByAltText('search');
    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });
});

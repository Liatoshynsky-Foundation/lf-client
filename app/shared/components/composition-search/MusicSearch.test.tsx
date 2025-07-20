<<<<<<< HEAD
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
=======
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
>>>>>>> dcb062c (removed all tests)
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

<<<<<<< HEAD
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
=======
// Mock global fetch
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { name: 'Song A' },
          { name: 'Song B' }
        ])
    })
  ) as jest.Mock;
});

describe('MusicSearch component', () => {
  const handleChange = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      render(<MusicSearch onFilterChange={handleChange} />);
    });
>>>>>>> dcb062c (removed all tests)
  });

  it('should render the MusicSearch icon', () => {
    expect(screen.getByAltText('search')).toBeInTheDocument();
  });

<<<<<<< HEAD
  it('should render the Autocomplete and check list opening and closing', () => {
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('id', 'music-search');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    fireEvent.mouseDown(input);
    fireEvent.change(input, { target: { value: mockMusicData[0].name } });
    const listItem = screen.getByText(mockMusicData[0].name);
    fireEvent.click(listItem);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should find clear button and clean the input after a click', async () => {
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: mockMusicData[1].name } });
    const clearButton = screen.getByAltText('close');
    await userEvent.click(clearButton);
    await waitFor(() => {
      expect(input).toHaveValue('');
=======
  it('should render Autocomplete and check list opening and closing', async () => {
    const input = screen.getByRole('combobox');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Song' } });
    });

    // Wait for one of the list items to appear
    await waitFor(() => {
      expect(screen.getByText('Song A')).toBeInTheDocument();
    });

    const listItem = screen.getByText('Song A');
    await act(async () => {
      fireEvent.click(listItem);
    });

    // Wait for list to close
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('should clear input when clear button is clicked', async () => {
    const input = screen.getByTestId('music-search') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Song B' } });
    });

    const clearButton = screen.getByAltText('close');

    await act(async () => {
      fireEvent.click(clearButton);
    });

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  it('should display "Не знайдено" if no results found', async () => {
    // Override fetch to return an empty list
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([])
      })
    );

    await act(async () => {
      render(<MusicSearch onFilterChange={handleChange} />);
    });

    const input = screen.getByRole('combobox');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Unknown Song' } });
    });

    await waitFor(() => {
      expect(screen.getByText('Не знайдено')).toBeInTheDocument();
>>>>>>> dcb062c (removed all tests)
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

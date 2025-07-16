import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { MusicSearch } from './MusicSearch';

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
  it('should render the Autcomplete and check list opening and closing', async () => {
    const Input = screen.getByRole('combobox');
    expect(Input).toHaveAttribute('id', 'music-search');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    fireEvent.mouseDown(Input);
    fireEvent.change(Input, { target: { value: 'Довше ім’я...' } });
    const ListItem = await screen.getByText('Довше ім’я...');
    fireEvent.click(ListItem);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('should find clear button and clean the input after a click', async () => {
    const Input = screen.getByRole('combobox');
    expect(Input).toHaveAttribute('id', 'music-search');
    fireEvent.change(Input, { target: { value: 'Довше ім’я...' } });
    const clearButton = screen.getByAltText('close');
    clearButton.click();
    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(Input).toHaveValue('');
    });
  });
});

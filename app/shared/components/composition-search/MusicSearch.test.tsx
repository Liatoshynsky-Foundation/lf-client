import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { MusicSearch } from './MusicSearch';

describe('MusicSearch component', () => {
  const handleChange = jest.fn();
  beforeEach(() => {
    render(<MusicSearch onFilterChange={handleChange} />);
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

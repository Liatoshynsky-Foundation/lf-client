import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { MusicSearch } from './MusicSearch';

describe('MusicSearch component', () => {
  const handleChange = jest.fn();
  beforeEach(() => {
    render(<MusicSearch onFilterChange={handleChange} />);
  });

  it('should render the MusicSearch icon', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  it('should render the Autcomplete and check functionality', async () => {
    const Input = screen.getByRole('combobox');
    expect(Input).toHaveAttribute('id', 'music-search');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    fireEvent.mouseDown(Input);
    fireEvent.change(Input, { target: { value: 'Довше ім’я...' } });
    const ListItem = await screen.getByText('Довше ім’я...');
    fireEvent.click(ListItem);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});

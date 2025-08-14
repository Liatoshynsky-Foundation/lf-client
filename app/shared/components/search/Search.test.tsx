import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { Search } from './Search';

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
jest.mock('@mui/material/useMediaQuery', () => {
  return jest.fn().mockImplementation(() => false);
});
describe('Search', () => {
  it('should display loading text', async () => {
    render(<Search search="" setSearch={jest.fn()} />);

    const input = screen.getByRole('combobox');
    input.focus();
    fireEvent.change(input, { target: { value: 'es' } });
    await waitFor(() => {
      expect(screen.queryByText('Loading...') || screen.getByText('Test Song')).toBeInTheDocument();
    });
  });
  it('should render the input and fetches options', async () => {
    const setSearch = jest.fn();

    render(<Search search="" setSearch={setSearch} />);

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

    render(<Search search="" setSearch={setSearch} />);

    const input = screen.getByRole('combobox');
    input.focus();
    fireEvent.change(input, { target: { value: 'Bohemian' } });

    await waitFor(() => {
      expect(setSearch).toHaveBeenCalledWith('Bohemian');
    });
  });

  it('should display no options text when no results', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve([])
    });

    render(<Search search="xyz" setSearch={jest.fn()} />);

    const input = screen.getByRole('combobox');
    input.focus();
    fireEvent.change(input, { target: { value: 'Bohemian' } });
    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });

  it('should find clear button and clean the input after a click', async () => {
    render(<Search search="" setSearch={jest.fn()} />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Bohemian' } });
    const clearButton = screen.getByAltText('close');
    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
  it('should focus input when search icon is clicked', async () => {
    const setSearch = jest.fn();

    render(<Search search="" setSearch={setSearch} />);

    const input = screen.getByRole('combobox');
    const searchIcon = screen.getByAltText('search');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });
  it('should focus input when search icon is clicked even if not focused', async () => {
    const setSearch = jest.fn();

    render(<Search search="" setSearch={setSearch} />);
    const input = screen.getByRole('combobox');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    const searchIcon = screen.getByAltText('search');
    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });
});

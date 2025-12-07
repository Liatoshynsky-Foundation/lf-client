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

jest.mock('@mui/material/useMediaQuery', () => {
  return jest.fn().mockImplementation(() => false);
});

describe('Search', () => {
  const options = [
    { _id: '1', title: 'Test Song' },
    { _id: '2', title: 'Another Song' }
  ];

  const renderSearch = (opts = options, initialSearch = '') => {
    const setSearch = jest.fn();
    render(<Search<{ _id: string; title: string }> search={initialSearch} setSearch={setSearch} options={opts} />);
    const input = screen.getByRole('combobox');
    const searchIcon = screen.queryByAltText('search');
    return { setSearch, input, searchIcon };
  };

  it('should render the input and fetches options', async () => {
    const { input } = renderSearch();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    input.focus();
    fireEvent.change(input, { target: { value: 'T' } });

    await waitFor(() => {
      expect(screen.getByText('Test Song')).toBeInTheDocument();
    });
  });

  it('should NOT call setSearch on input change', async () => {
    const { setSearch, input } = renderSearch();
    fireEvent.change(input, { target: { value: 'Bohemian' } });

    await waitFor(() => {
      expect(setSearch).not.toHaveBeenCalled();
    });
  });

  it('should call setSearch when Enter is pressed', async () => {
    const { setSearch, input } = renderSearch();
    fireEvent.change(input, { target: { value: 'Bohemian' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(setSearch).toHaveBeenCalledWith('Bohemian');
    });
  });

  it('should call setSearch when option is selected', async () => {
    const { setSearch, input } = renderSearch();
    input.focus();
    fireEvent.change(input, { target: { value: 'Test' } });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Test Song'));
    });

    expect(setSearch).toHaveBeenCalledWith('Test Song');
  });

  it('should display no options text when no results', async () => {
    const { input } = renderSearch([], 'xyz');
    input.focus();
    fireEvent.change(input, { target: { value: 'Bohemian' } });
    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });

  it('should focus input when search icon is clicked', async () => {
    const { input, searchIcon } = renderSearch();
    input.blur();
    expect(document.activeElement).not.toBe(input);
    if (!searchIcon) throw new Error('search icon not found');
    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });

  it('should focus input when search icon is clicked even if not focused', async () => {
    const { input, searchIcon } = renderSearch();
    input.blur();
    expect(document.activeElement).not.toBe(input);
    if (!searchIcon) throw new Error('search icon not found');
    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });
});

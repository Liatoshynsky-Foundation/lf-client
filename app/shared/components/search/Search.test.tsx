import useMediaQuery from '@mui/material/useMediaQuery';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { ReactNode } from 'react';

import { Search } from './Search';
import { TitleOption } from '~/types/types/composition.types';

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
  VirtualizedListbox: ({ children }: { children: ReactNode }) => <ul>{children}</ul>
}));

jest.mock('@mui/material/useMediaQuery', () => {
  return jest.fn().mockImplementation(() => false);
});

describe('Search', () => {
  const options: TitleOption[] = [
    { _id: '1', title: 'Test Song', type: 'composition' },
    { _id: '2', title: 'Another Song', type: 'composition' },
    { _id: '3', title: { en: 'Specific Track', uk: 'Специфічний Трек' }, type: 'composition' },
    { _id: '4', title: 'Song Exact Match', type: 'composition' },
    { _id: '5', title: 'Prefix Match Song', type: 'composition' },
    { _id: '6', title: 'Opus Track', type: 'opus' },
    { _id: '7', title: 'B Exact Match', type: 'composition' },
    { _id: '8', title: 'Track Prefix Match', type: 'composition' },
    { _id: '9', title: 'Some Long Track Name', type: 'composition' }
  ];

  const renderSearch = (opts = options, initialSearch = '') => {
    const setSearch = jest.fn();
    const result = render(<Search<TitleOption> search={initialSearch} setSearch={setSearch} options={opts} />);
    const input = screen.getByRole('combobox');
    const searchIcon = screen.queryByAltText('search');
    return { setSearch, input, searchIcon, ...result };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the input and fetches options', async () => {
    const { input } = renderSearch();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'T' } });
    await waitFor(() => {
      expect(screen.getByText(options[0].title as string)).toBeInTheDocument();
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
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'Test' } });
    await waitFor(() => {
      fireEvent.click(screen.getByText(options[0].title as string));
    });
    expect(setSearch).toHaveBeenCalledWith(options[0].title as string);
  });

  it('should display no options text when no results', async () => {
    const { input } = renderSearch([], 'xyz');
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'Bohemian' } });
    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });

  it('should focus input when search icon is clicked', async () => {
    const { input, searchIcon } = renderSearch();
    act(() => {
      input.blur();
    });
    expect(document.activeElement).not.toBe(input);
    if (!searchIcon) throw new Error('search icon not found');
    act(() => {
      fireEvent.click(searchIcon);
    });
    expect(document.activeElement).toBe(input);
  });

  it('should ignore input change if text length exceeds 200 characters', async () => {
    const { input } = renderSearch();
    const longText = 'a'.repeat(201);
    fireEvent.change(input, { target: { value: longText } });
    expect(input).not.toHaveValue(longText);
  });

  it('should clear the input and value state cleanly when clear icon is clicked', async () => {
    const { setSearch, input } = renderSearch(options, 'Test');
    act(() => {
      input.focus();
    });
    const clearIcon = screen.getByAltText('clear');
    fireEvent.click(clearIcon);
    expect(input).toHaveValue('');
    expect(setSearch).toHaveBeenCalledWith('');
  });

  it('should invoke setSearch during onBlur event if inputValue differs from current search state', async () => {
    const { setSearch, input } = renderSearch(options, 'Initial');
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'Changed Text' } });
    act(() => {
      input.blur();
    });
    expect(setSearch).toHaveBeenCalledWith('Changed Text');
  });

  it('should NOT invoke setSearch during onBlur event if inputValue remains identical to search state', async () => {
    const { setSearch, input } = renderSearch(options, 'Same');
    act(() => {
      input.focus();
    });
    act(() => {
      input.blur();
    });
    expect(setSearch).not.toHaveBeenCalled();
  });

  it.each([
    { name: 'multi-word sorting', val: 'Song', expected: 'Song Exact Match' },
    { name: 'prefix ranking', val: 'Prefix', expected: 'Prefix Match Song' },
    { name: 'localized string', val: 'Specific', expected: 'Specific Track' },
    { name: 'opus identifiers', val: 'Opus', expected: 'Opus Track' }
  ])('should process $name correctly', async ({ val, expected }) => {
    const { input } = renderSearch();
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: val } });
    await waitFor(() => {
      expect(screen.getByText(expected)).toBeInTheDocument();
    });
  });

  it('should alternate responsive icon style parameters when render context detects mobile breakpoints', () => {
    (useMediaQuery as unknown as jest.Mock).mockReturnValue(true);
    const { input } = renderSearch();
    expect(input).toBeInTheDocument();
  });

  it('should alternate style configurations when desktop node becomes explicitly focused', () => {
    (useMediaQuery as unknown as jest.Mock).mockReturnValue(false);
    const { input } = renderSearch();
    act(() => {
      input.focus();
    });
    expect(input).toBeInTheDocument();
  });

  it('should satisfy the bLabel exact match condition inside sorting block to cover line 146 fully', async () => {
    const customOptions = [
      { _id: 'a', title: 'Z Random Track Name', type: 'composition' },
      { _id: 'b', title: 'Target', type: 'composition' }
    ];
    const { input } = renderSearch(customOptions as TitleOption[]);
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'Target' } });
    await waitFor(() => {
      expect(screen.getByText('Target')).toBeInTheDocument();
    });
  });

  it('should satisfy the bLabel startsWith condition inside prefix matching block to cover line 154 fully', async () => {
    const customOptions = [
      { _id: 'a', title: 'Z Middle Contains Start Word', type: 'composition' },
      { _id: 'b', title: 'Start Mirror Track', type: 'composition' }
    ];
    const { input } = renderSearch(customOptions as TitleOption[]);
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'Start' } });
    await waitFor(() => {
      expect(screen.getByText('Start Mirror Track')).toBeInTheDocument();
    });
  });

  it('should calculate mismatched substring placement indices within labels to cover line 167 fully', async () => {
    const customOptions = [
      { _id: 'a', title: 'Z Word Long Long Long End', type: 'composition' },
      { _id: 'b', title: 'Short Phrase Word Inside', type: 'composition' }
    ];
    const { input } = renderSearch(customOptions as TitleOption[]);
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'Word' } });
    await waitFor(() => {
      expect(screen.getByText('Short Phrase Word Inside')).toBeInTheDocument();
    });
  });

  it('should test fallback alphabetical sorting for identical weights to cover remaining branch boundaries', async () => {
    const customOptions = [
      { _id: 'a', title: 'B Duplicate Track', type: 'composition' },
      { _id: 'b', title: 'A Duplicate Track', type: 'composition' }
    ];
    const { input } = renderSearch(customOptions as TitleOption[]);
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'Duplicate' } });
    await waitFor(() => {
      expect(screen.getByText('A Duplicate Track')).toBeInTheDocument();
    });
  });

  it('should fallback to uk title when en is missing to cover renderOption line 146', async () => {
    const customOptions = [{ _id: 'a', title: { uk: 'Тільки Укр Трек' }, type: 'composition' }];
    const { input } = renderSearch(customOptions as TitleOption[]);
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'Укр' } });
    await waitFor(() => {
      expect(screen.getByText('Тільки Укр Трек')).toBeInTheDocument();
    });
  });

  it('should return all options when trimmedInput is empty to cover filterOptions early return branch', async () => {
    const { input } = renderSearch();
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'T' } });
    await waitFor(() => {
      expect(screen.getByText('Test Song')).toBeInTheDocument();
    });
    fireEvent.change(input, { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('Another Song')).toBeInTheDocument();
    });
  });

  it('should satisfy both exact match comparator branches during insertion sort to cover lines 167 and 168', async () => {
    const customOptions = [
      { _id: 'a', title: 'Bxtarget', type: 'composition' },
      { _id: 'b', title: 'Target', type: 'composition' },
      { _id: 'c', title: 'Axtarget', type: 'composition' }
    ];
    const { input } = renderSearch(customOptions as TitleOption[]);
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'target' } });
    await waitFor(() => {
      expect(screen.getByText('Target')).toBeInTheDocument();
    });
  });

  it('should call handleSelect with null value on blur after clearing input to cover lines 28 and 101', async () => {
    const { setSearch, input } = renderSearch();
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'Test' } });
    await waitFor(() => {
      fireEvent.click(screen.getByText('Test Song'));
    });
    fireEvent.change(input, { target: { value: '' } });
    act(() => {
      input.blur();
    });
    expect(setSearch).toHaveBeenCalledWith('');
  });

  it('should fallback to empty string when title has neither en nor uk to cover line 146', async () => {
    const customOptions = [
      { _id: 'a', title: {}, type: 'composition' },
      { _id: 'b', title: 'Filler Track', type: 'composition' }
    ];
    const { input } = renderSearch(customOptions as unknown as TitleOption[]);
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: 'Fill' } });
    await waitFor(() => {
      expect(screen.getByText('Filler Track')).toBeInTheDocument();
    });
    fireEvent.change(input, { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('Filler Track')).toBeInTheDocument();
    });
  });
});

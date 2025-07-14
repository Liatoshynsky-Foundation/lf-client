import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { CookiePreferencesModal } from './CookiePreferencesModal';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: Record<string, string> = {
      title: 'Cookie Settings',
      description: 'We respect your right to privacy.',
      analytics: 'Analytics',
      analyticsDescription:
        'Allows us to collect anonymous data about how you use the site — to make it more user-friendly and intuitive',
      selectAllButton: 'Select All',
      saveSettingsButton: 'Save Settings'
    };

    return (key: string) => translations[key] || key;
  }
}));

const onCloseMock = jest.fn();
const onCheckedMock = jest.fn();

const props = {
  open: true,
  onClose: onCloseMock,
  checked: true,
  onChecked: onCheckedMock
};

describe('CookiePreferences Modal', () => {
  beforeEach(() => {
    onCloseMock.mockClear();
    onCheckedMock.mockClear();
    render(<CookiePreferencesModal {...props} />);
  });

  it('should renders modal with title and description', () => {
    expect(screen.getByText('Cookie Settings')).toBeInTheDocument();
    expect(screen.getByText('We respect your right to privacy.')).toBeInTheDocument();
  });

  it('should renders analytics section and toggle', () => {
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should calls onChecked when toggle is clicked', () => {
    fireEvent.click(screen.getByRole('checkbox'));
    expect(props.onChecked).toHaveBeenCalled();
  });

  it('should renders both buttons with correct labels', () => {
    expect(screen.getByRole('button', { name: 'Select All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Settings' })).toBeInTheDocument();
  });

  it('should calls onClose when Save Settings button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Save Settings' }));
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should calls onClose when Save Settings button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Save Settings' }));
    expect(props.onClose).toHaveBeenCalled();
  });

  it('calls onChecked(true) when "Select All" button is clicked', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Select All' }));
    expect(onCheckedMock).toHaveBeenCalledWith(true);
  });
});

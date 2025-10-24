import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '../../../../../../i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

jest.mock('~/../i18n/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

jest.mock('next-intl', () => ({
  useLocale: jest.fn()
}));

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  SvgImage: () => <span data-testid="svg-image" />
}));

describe('LanguageSwitcher', () => {
  const mockReplace = jest.fn();
  const mockPush = jest.fn();
  const mockPathname = '/test-path';

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace, push: mockPush });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  describe('icon variant', () => {
    it('should render icon and handles language switch', () => {
      (useLocale as jest.Mock).mockReturnValue('uk');

      render(<LanguageSwitcher variant="icon" />);

      const iconBtn = screen.getByRole('button');
      expect(iconBtn).toBeInTheDocument();

      fireEvent.click(iconBtn);
      expect(screen.getByRole('menu')).toBeInTheDocument();

      const englishOption = screen.getByText('English');
      fireEvent.click(englishOption);
      expect(mockReplace).toHaveBeenCalledWith(mockPathname, { locale: 'en', scroll: false });
    });

    it('should show check icon for current locale', () => {
      (useLocale as jest.Mock).mockReturnValue('en');

      render(<LanguageSwitcher variant="icon" />);
      fireEvent.click(screen.getByRole('button'));

      const selectedOption = screen.getByText('English');
      expect(selectedOption).toBeInTheDocument();
      expect(screen.getAllByTestId('svg-image').length).toBeGreaterThan(0);
    });

    it('should not call router.push if selected locale is already active', () => {
      (useLocale as jest.Mock).mockReturnValue('en');

      render(<LanguageSwitcher variant="icon" />);
      fireEvent.click(screen.getByRole('button'));

      const englishOption = screen.getByText('English');
      fireEvent.click(englishOption);

      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  describe('toggle variant', () => {
    it('should render toggle and switches language', () => {
      (useLocale as jest.Mock).mockReturnValue('en');

      render(<LanguageSwitcher variant="toggle" />);

      const toggleButton = screen.getByRole('button', { name: 'Українською' });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton.textContent).toContain('Українською');

      fireEvent.click(toggleButton);
      expect(mockReplace).toHaveBeenCalledWith(mockPathname, { locale: 'uk', scroll: false });
    });
  });

  it('should close menu after selecting a language', async () => {
    (useLocale as jest.Mock).mockReturnValue('uk');
    render(<LanguageSwitcher variant="icon" />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('English'));
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });
});

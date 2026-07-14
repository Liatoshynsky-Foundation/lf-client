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
    it('should render toggle and switch language from en to uk', () => {
      const mockedUseLocale = useLocale as jest.MockedFunction<typeof useLocale>;
      mockedUseLocale.mockReturnValue('en');

      render(<LanguageSwitcher variant="toggle" />);

      const toggleButton = screen.getByRole('button', { name: 'Українською' });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton.textContent).toContain('Українською');

      fireEvent.click(toggleButton);
      expect(mockReplace).toHaveBeenCalledWith(mockPathname, { locale: 'uk', scroll: false });
    });

    it('should render toggle and switch language from uk to en', () => {
      const mockedUseLocale = useLocale as jest.MockedFunction<typeof useLocale>;
      mockedUseLocale.mockReturnValue('uk');

      render(<LanguageSwitcher variant="toggle" />);

      const toggleButton = screen.getByRole('button', { name: 'In English' });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton.textContent).toContain('In English');

      fireEvent.click(toggleButton);
      expect(mockReplace).toHaveBeenCalledWith(mockPathname, { locale: 'en', scroll: false });
    });

    it('should cover early return in toggleLocale when currentLocale is missing', () => {
      const mockedUseLocale = useLocale as jest.MockedFunction<typeof useLocale>;

      mockedUseLocale.mockImplementation(() => '' as unknown as never);

      render(<LanguageSwitcher variant="toggle" />);
      const toggleButton = screen.getByRole('button');

      fireEvent.click(toggleButton);
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  describe('mobile variant', () => {
    it('should render mobile layout and switch to EN when clicking EN', () => {
      (useLocale as jest.Mock).mockReturnValue('uk');
      render(<LanguageSwitcher variant="mobile" />);

      const enSpan = screen.getByText('EN');
      const uaSpan = screen.getByText('UA');

      expect(enSpan).toBeInTheDocument();
      expect(uaSpan).toBeInTheDocument();

      fireEvent.click(enSpan);
      expect(mockReplace).toHaveBeenCalledWith(mockPathname, { locale: 'en', scroll: false });
    });

    it('should render mobile layout and switch to UA when clicking UA', () => {
      (useLocale as jest.Mock).mockReturnValue('en');
      render(<LanguageSwitcher variant="mobile" />);

      const uaSpan = screen.getByText('UA');
      fireEvent.click(uaSpan);

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

  describe('scrollDirection tracking', () => {
    it('should close the dropdown menu when scrollDirection changes to down', async () => {
      (useLocale as jest.Mock).mockReturnValue('uk');
      const { rerender } = render(<LanguageSwitcher variant="icon" />);

      const iconBtn = screen.getByRole('button');
      fireEvent.click(iconBtn);
      expect(screen.getByRole('menu')).toBeInTheDocument();

      rerender(<LanguageSwitcher variant="icon" scrollDirection="down" />);

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('should do nothing when scrollDirection is down but the menu is already closed', () => {
      (useLocale as jest.Mock).mockReturnValue('uk');
      const { rerender } = render(<LanguageSwitcher variant="icon" />);

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();

      expect(() => {
        rerender(<LanguageSwitcher variant="icon" scrollDirection="down" />);
      }).not.toThrow();

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });
});

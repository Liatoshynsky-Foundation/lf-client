import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import DonationForm from './DonationForm';

jest.mock('~/ds-components/button/Button', () => {
  const MockButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { fullWidth?: boolean }> = ({
    children,
    fullWidth: _fullWidth,
    ...props
  }) => <button {...props}>{children}</button>;

  return {
    __esModule: true,
    default: MockButton
  };
});

jest.mock('~/components/turnstileWidget/TurnstileWidget', () => ({
  __esModule: true,
  default: () => <div data-testid="TurnstileWidget-mock" />
}));

const mockDonate = jest.fn();
jest.mock('~/hooks/use-donation/useDonation', () => ({
  useDonation: () => ({
    donate: mockDonate,
    isPending: false
  })
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      donationTitle: 'ШВИДКО ЗАДОНАТИТИ:',
      subscribeTitle: 'ПІДПИСАТИСЯ:',
      donationSwitch: 'Разовий внесок',
      subscribeSwitch: 'Підписка',
      donationButton: 'Зробити внесок',
      subscribeButton: 'Підписатися'
    };
    return messages[key] || key;
  },
  useLocale: () => 'uk'
}));

describe('DonationForm', () => {
  beforeAll(() => {
    class ResizeObserver {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    }

    Object.defineProperty(global, 'ResizeObserver', {
      writable: true,
      configurable: true,
      value: ResizeObserver
    });
  });

  beforeEach(() => {
    render(<DonationForm />);
  });

  it('should render default donation form', () => {
    expect(screen.getByText('ШВИДКО ЗАДОНАТИТИ:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('should show entered value', () => {
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '100' } });
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('should switch currency', () => {
    fireEvent.click(screen.getByText('200'));
    expect(screen.getByDisplayValue('200')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('USD'));
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('should show error after submitting invalid amount and clear it after changing value', () => {
    const input = screen.getByRole('spinbutton');
    const button = screen.getByText('Зробити внесок');

    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.click(button);
    expect(input).toHaveAttribute('aria-invalid', 'true');

    fireEvent.change(input, { target: { value: '100' } });
    expect(input).not.toHaveAttribute('aria-invalid', 'true');
  });

  it('should NOT show error before submit even if value is 0', () => {
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '0' } });

    expect(input).not.toHaveAttribute('aria-invalid', 'true');
  });
});

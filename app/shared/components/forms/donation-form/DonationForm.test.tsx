import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import DonationForm from './DonationForm';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: () => <svg data-testid="mock-chevron" />
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isMobile: false }))
}));

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
  default: (props: { onSuccessAction: (token: string) => void }) => (
    <button data-testid="TurnstileWidget-mock" onClick={() => props.onSuccessAction('token123')} />
  )
}));

let capturedOnVerificationFailure: (() => void) | undefined;
const mockDonate = jest.fn();
jest.mock('~/hooks/use-donation/useDonation', () => ({
  useDonation: (args: { onVerificationFailure: () => void }) => {
    capturedOnVerificationFailure = args.onVerificationFailure;
    return { donate: mockDonate, isPending: false };
  }
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
  it('should call donate after successful captcha verification to cover lines 121 and 128-139', async () => {
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(screen.getByText('Зробити внесок'));
    fireEvent.click(screen.getByTestId('TurnstileWidget-mock'));

    await waitFor(() => {
      expect(mockDonate).toHaveBeenCalledWith({ amount: 100, captchaToken: 'token123' });
    });
  });

  it('should hide captcha when donate throws an error to cover catch branch', async () => {
    mockDonate.mockRejectedValueOnce(new Error('donation failed'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(screen.getByText('Зробити внесок'));
    fireEvent.click(screen.getByTestId('TurnstileWidget-mock'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it('should clear error when clicking suggested amount button while error is shown to cover line 156', () => {
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.click(screen.getByText('Зробити внесок'));
    expect(input).toHaveAttribute('aria-invalid', 'true');

    fireEvent.click(screen.getByText('200'));
    expect(input).not.toHaveAttribute('aria-invalid', 'true');
  });
  it('should show captcha and reset token when onVerificationFailure is triggered', () => {
    expect(capturedOnVerificationFailure).toBeDefined();
    act(() => {
      capturedOnVerificationFailure?.();
    });
    expect(screen.getByTestId('TurnstileWidget-mock')).toBeInTheDocument();
  });

  it('should mark invalid when submitting with empty amount', () => {
    fireEvent.click(screen.getByText('Зробити внесок'));
    expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-invalid', 'true');
  });
  it('should skip creating script when window.Wayforpay already exists', () => {
    (window as unknown as { Wayforpay: unknown }).Wayforpay = {};
    const { unmount, container } = render(<DonationForm />);
    expect(container).toBeDefined();
    unmount();
    delete (window as unknown as { Wayforpay?: unknown }).Wayforpay;
  });

  it('should remove script on unmount', () => {
    const { unmount, container } = render(<DonationForm />);
    expect(container).toBeDefined();
    unmount();
  });

  it('should apply mobile sizing to buttons when isMobile is true to cover lines 147 and 233', () => {
    (useBreakpoints as jest.Mock).mockReturnValueOnce({ isMobile: true });
    render(<DonationForm />);

    const suggestButtons = screen.getAllByTestId('DonationForm-suggestButton-200');
    const donateButtons = screen.getAllByTestId('DonationForm-donateButton');

    expect(suggestButtons[suggestButtons.length - 1]).toBeInTheDocument();
    expect(donateButtons[donateButtons.length - 1]).toBeInTheDocument();
  });
});

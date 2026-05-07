import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import { useDonation } from './useDonation';
import { errors } from '~/constants/errors';

import { paymentService } from '~/services/client/wayForPayService';

jest.mock('~/services/client/wayForPayService', () => ({
  paymentService: {
    verifyCaptcha: jest.fn(),
    createInvoice: jest.fn()
  }
}));

const mockRun = jest.fn();

const MockWayforpay = jest.fn().mockImplementation(() => ({
  run: mockRun
}));

beforeAll(() => {
  globalThis.window.Wayforpay = MockWayforpay;
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = 'QueryClientWrapper';
  return Wrapper;
};

describe('useDonation', () => {
  const mockProps = {
    lang: 'uk' as any,
    currency: 'UAH' as any,
    onVerificationFailure: jest.fn()
  };

  const donationVars = {
    amount: 100,
    captchaToken: 'test-token'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully process donation and run Wayforpay widget', async () => {
    const mockInvoice = { id: 'inv_123' };
    (paymentService.verifyCaptcha as jest.Mock).mockResolvedValue({ success: true });
    (paymentService.createInvoice as jest.Mock).mockResolvedValue(mockInvoice);

    const { result } = renderHook(() => useDonation(mockProps), {
      wrapper: createWrapper()
    });

    await act(async () => {
      await result.current.donate(donationVars);
    });

    expect(paymentService.verifyCaptcha).toHaveBeenCalledWith(donationVars.captchaToken);
    expect(paymentService.createInvoice).toHaveBeenCalledWith({
      amount: donationVars.amount,
      lang: mockProps.lang,
      currency: mockProps.currency
    });

    expect(mockRun).toHaveBeenCalledWith(mockInvoice);
  });

  it('should handle captcha failure and call onVerificationFailure', async () => {
    (paymentService.verifyCaptcha as jest.Mock).mockResolvedValue({ success: false });

    const { result } = renderHook(() => useDonation(mockProps), {
      wrapper: createWrapper()
    });

    await act(async () => {
      try {
        await result.current.donate(donationVars);
      } catch (e: any) {
        expect(e.message).toBe(errors.CAPTCHA_FAILED);
      }
    });

    expect(mockProps.onVerificationFailure).toHaveBeenCalled();
    expect(paymentService.createInvoice).not.toHaveBeenCalled();
    expect(mockRun).not.toHaveBeenCalled();
  });

  it('should handle general errors (not captcha)', async () => {
    (paymentService.verifyCaptcha as jest.Mock).mockResolvedValue({ success: true });
    (paymentService.createInvoice as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useDonation(mockProps), {
      wrapper: createWrapper()
    });

    act(() => {
      result.current.donate(donationVars).catch(() => {});
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error?.message).toBe('Network Error');
    });
  });

  it('should update isPending state during mutation', async () => {
    let resolveCaptcha: (value: any) => void;
    const captchaPromise = new Promise((resolve) => {
      resolveCaptcha = resolve;
    });

    (paymentService.verifyCaptcha as jest.Mock).mockReturnValue(captchaPromise);
    (paymentService.createInvoice as jest.Mock).mockResolvedValue({ id: 'inv_123' });

    const { result } = renderHook(() => useDonation(mockProps), {
      wrapper: createWrapper()
    });

    act(() => {
      result.current.donate(donationVars).catch(() => {});
    });

    await waitFor(() => {
      expect(result.current.isPending).toBe(true);
    });

    act(() => {
      resolveCaptcha({ success: true });
    });

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });
  });
});

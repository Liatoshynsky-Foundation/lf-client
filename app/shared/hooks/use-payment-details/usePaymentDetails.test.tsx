import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import { usePaymentDetails } from './usePaymentDetails';

import { paymentDetailsClientService } from '~/services/client/paymentDetailsService';

jest.mock('~/services/client/paymentDetailsService', () => ({
  paymentDetailsClientService: { getPaymentDetails: jest.fn() }
}));

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe('usePaymentDetails', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns the tabs from the api', async () => {
    const tabs = [{ id: 'tab-uah', name: 'UAH', content: { type: 'doc' }, order: 0 }];
    (paymentDetailsClientService.getPaymentDetails as jest.Mock).mockResolvedValue({ tabs });

    const { result } = renderHook(() => usePaymentDetails(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.tabs).toEqual(tabs));
    expect(result.current.isError).toBe(false);
  });

  it('returns an empty list while loading and when the request fails', async () => {
    (paymentDetailsClientService.getPaymentDetails as jest.Mock).mockRejectedValue(new Error('network'));

    const { result } = renderHook(() => usePaymentDetails(), { wrapper: createWrapper() });

    expect(result.current.tabs).toEqual([]);
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.tabs).toEqual([]);
  });
});

import { paymentDetailsClientService } from './paymentDetailsService';

import { baseService } from '~/services/client/baseService';

jest.mock('~/services/client/baseService', () => ({
  baseService: { request: jest.fn() }
}));

jest.mock('~/lib/utils/getFullUrl', () => ({
  getFullUrl: jest.fn(({ pathname }: { pathname: string }) => `http://localhost${pathname}`)
}));

describe('paymentDetailsClientService', () => {
  it('requests the payment details api route', async () => {
    const response = { tabs: [] };
    (baseService.request as jest.Mock).mockResolvedValue(response);

    await expect(paymentDetailsClientService.getPaymentDetails()).resolves.toBe(response);
    expect(baseService.request).toHaveBeenCalledWith({
      method: 'GET',
      url: 'http://localhost/api/payment-details'
    });
  });
});

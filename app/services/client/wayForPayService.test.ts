import { paymentService } from './wayForPayService';
import { ApiRoutes } from '~/constants/routes/api-routes';

import { baseService } from '~/services/client/baseService';
jest.mock('~/services/client/baseService', () => ({
  baseService: {
    request: jest.fn()
  }
}));

describe('paymentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createInvoice', () => {
    it('should call baseService.request with correct parameters for creating an invoice', async () => {
      const mockParams = {
        amount: 100,
        lang: 'uk',
        currency: 'UAH'
      };

      const mockResponse = { invoiceUrl: 'https://wayforpay.com/pay/some-token' };
      (baseService.request as jest.Mock).mockResolvedValue(mockResponse);

      const result = await paymentService.createInvoice(mockParams);

      expect(baseService.request).toHaveBeenCalledWith({
        method: 'POST',
        url: ApiRoutes.CREATE_INVOICE,
        data: mockParams
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('verifyCaptcha', () => {
    it('should call baseService.request with correct parameters for captcha verification', async () => {
      const mockToken = 'test-captcha-token';
      const mockResponse = { success: true };

      (baseService.request as jest.Mock).mockResolvedValue(mockResponse);

      const result = await paymentService.verifyCaptcha(mockToken);

      expect(baseService.request).toHaveBeenCalledWith({
        method: 'POST',
        url: ApiRoutes.VERIFY,
        data: { token: mockToken }
      });
      expect(result).toEqual(mockResponse);
    });
  });
});

import { ApiRoutes } from '~/constants/routes/api-routes';
import { WayforPayInvoice } from '~/types/types/wayForPay';

import { baseService } from '~/services/client/baseService';

interface CreateInvoiceParams {
  amount: number;
  lang: string;
  currency: string;
}

interface VerifyCaptchaResponse {
  success: boolean;
}

const createInvoice = async (params: CreateInvoiceParams): Promise<WayforPayInvoice> => {
  return baseService.request<WayforPayInvoice>({
    method: 'POST',
    url: ApiRoutes.CREATE_INVOICE,
    data: params
  });
};

const verifyCaptcha = async (token: string): Promise<VerifyCaptchaResponse> => {
  return baseService.request<VerifyCaptchaResponse>({
    method: 'POST',
    url: ApiRoutes.VERIFY,
    data: { token }
  });
};

export const paymentService = {
  createInvoice,
  verifyCaptcha
};

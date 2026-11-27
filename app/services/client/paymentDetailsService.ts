import { ApiRoutes } from '~/constants/routes/api-routes';

import type { PaymentDetailsTabDTO } from '~/domain/dto/paymentDetails.dto';
import { getFullUrl } from '~/lib/utils/getFullUrl';
import { baseService } from '~/services/client/baseService';

export type PaymentDetailsResponse = {
  tabs: PaymentDetailsTabDTO[];
};

export const paymentDetailsClientService = {
  async getPaymentDetails(): Promise<PaymentDetailsResponse> {
    return baseService.request<PaymentDetailsResponse>({
      method: 'GET',
      url: getFullUrl({ pathname: ApiRoutes.PAYMENT_DETAILS })
    });
  }
};

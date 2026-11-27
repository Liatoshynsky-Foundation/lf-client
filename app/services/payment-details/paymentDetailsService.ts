import type { PaymentDetailsTabDTO } from '~/domain/dto/paymentDetails.dto';
import type { PaymentDetailsRepository } from '~/infrastructure/repositories/payment-details/paymentDetails.repo';
import { parseArraySafely } from '~/lib/utils/parseArraySafely';
import { extractTextFromTipTap } from '~/lib/utils/tiptapHelpers';
import logger from '~/middleware/logger/logger';
import { paymentDetailsTabSchema } from '~/validators/paymentDetails.schema';

interface PaymentDetailsServiceDeps {
  paymentDetailsRepository: PaymentDetailsRepository;
}

const isPublicTab = (tab: PaymentDetailsTabDTO): boolean =>
  tab.name.length > 0 && extractTextFromTipTap(tab.content).trim().length > 0;

export const createPaymentDetailsService = ({ paymentDetailsRepository }: PaymentDetailsServiceDeps) => ({
  async getPublicTabs(): Promise<PaymentDetailsTabDTO[]> {
    try {
      const paymentDetails = await paymentDetailsRepository.getPaymentDetails();

      if (!paymentDetails?.tabs?.length) return [];

      const { validItems, invalidCount } = parseArraySafely(paymentDetails.tabs, paymentDetailsTabSchema);

      if (invalidCount > 0) {
        logger.warn(`[SERVICE:PaymentDetails:getPublicTabs] Skipped ${invalidCount} invalid payment details tabs`);
      }

      return validItems.filter(isPublicTab).sort((first, second) => first.order - second.order);
    } catch (error) {
      logger.error('[SERVICE:PaymentDetails:getPublicTabs] Failed to fetch payment details', error);

      return [];
    }
  }
});

export type PaymentDetailsService = ReturnType<typeof createPaymentDetailsService>;

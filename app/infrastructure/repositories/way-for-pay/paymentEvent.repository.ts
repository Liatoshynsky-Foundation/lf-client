import type { CreatePaymentEventInput, PaymentEventRepository } from './paymentEvent.repo.d';

import PaymentEventModel from '~/infrastructure/models/way-for-pay/paymentEvent.model';

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'number' &&
    (error as { code: number }).code === 11000
  );
}

async function createIfNotExists(input: CreatePaymentEventInput): Promise<boolean> {
  try {
    await PaymentEventModel.create(input);

    return true;
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return false;
    }

    throw error;
  }
}

const newPaymentEventRepository = (): PaymentEventRepository => ({
  createIfNotExists
});

export default newPaymentEventRepository;

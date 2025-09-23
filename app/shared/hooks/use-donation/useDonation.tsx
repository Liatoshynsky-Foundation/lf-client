import { useMutation } from '@tanstack/react-query';
import { Locale } from 'next-intl';
import { useCallback } from 'react';

import { errors } from '~/constants/errors';
import { Currency } from '~/types/types/common.types';
import { WayforPayInvoice } from '~/types/types/wayForPay';

import { paymentService } from '~/services/client/wayForPayService';

interface DonationVariables {
  amount: number;
  captchaToken: string;
}

interface UseDonationProps {
  lang: Locale;
  currency: Currency;
  onVerificationFailure?: () => void;
}

export function useDonation({ lang, currency, onVerificationFailure }: UseDonationProps) {
  const mutationFn = useCallback(
    async ({ amount, captchaToken }: DonationVariables) => {
      const verification = await paymentService.verifyCaptcha(captchaToken);
      if (!verification.success) {
        throw new Error(errors.CAPTCHA_FAILED);
      }
      return await paymentService.createInvoice({ amount, lang, currency });
    },
    [lang, currency]
  );

  const onError = useCallback(
    (error: Error) => {
      if (error.message === errors.CAPTCHA_FAILED) {
        onVerificationFailure?.();
      }
    },
    [onVerificationFailure]
  );

  const mutation = useMutation<WayforPayInvoice, Error, DonationVariables>({
    mutationFn,
    onSuccess: (invoice) => {
      new window.Wayforpay().run(invoice);
    },
    onError
  });

  return {
    donate: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error
  };
}

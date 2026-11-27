import type { PaymentDetailsTabDTO } from '~/domain/dto/paymentDetails.dto';
import { paymentDetailsClientService } from '~/services/client/paymentDetailsService';
import useQuery from '~/shared/hooks/query/useQuery';

const EMPTY_TABS: PaymentDetailsTabDTO[] = [];

export function usePaymentDetails() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['payment-details'],
    queryFn: () => paymentDetailsClientService.getPaymentDetails()
  });

  return {
    tabs: data?.tabs ?? EMPTY_TABS,
    isLoading,
    isError
  } as const;
}

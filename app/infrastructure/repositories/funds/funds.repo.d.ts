import type { FundDTO } from '~/domain/dto/funds.dto';

export type FundsRepository = {
  getFunds(): Promise<FundDTO[]>;
};

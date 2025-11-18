import type { FundDTO } from '../dto/funds.dto';

export type FundsRepository = {
  getFunds(): Promise<FundDTO[]>;
};

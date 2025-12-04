import type { CaseDetailsDTO, FundDetailsDTO, FundDTO } from '~/domain/dto/funds.dto';

export type FundsRepository = {
  getFunds(): Promise<FundDTO[]>;
  getFundById(id: number): Promise<FundDetailsDTO | null>;
  getCaseById(caseId: string): Promise<CaseDetailsDTO | null>;
};

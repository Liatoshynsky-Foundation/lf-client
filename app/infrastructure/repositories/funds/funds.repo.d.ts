import type { CaseDetailsDTO, FundBaseDTO, FundDetailsDTO } from '~/domain/dto/funds.dto';

export type FundsRepository = {
  getFunds(): Promise<FundBaseDTO[]>;
  getFundById(id: number): Promise<FundDetailsDTO | null>;
  getCaseById(caseId: string): Promise<CaseDetailsDTO | null>;
};

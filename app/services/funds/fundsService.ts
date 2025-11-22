import type { FundsRepository } from '~/infrastructure/repositories/funds/funds.repo';

interface FundsServiceDeps {
  fundsRepository: FundsRepository;
}

export const createFundsService = ({ fundsRepository }: FundsServiceDeps) => ({
  getFunds: () => fundsRepository.getFunds(),
  getFundById: (id: number) => fundsRepository.getFundById(id),
  getCaseById: (caseId: string) => fundsRepository.getCaseById(caseId)
});

export type FundsService = ReturnType<typeof createFundsService>;

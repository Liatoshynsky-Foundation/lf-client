import type { FundsRepository } from '~/infrastructure/repositories/funds/funds.repo';

export const createFundsService = (repo: FundsRepository) => ({
  getFunds: () => repo.getFunds()
});

export type FundsService = ReturnType<typeof createFundsService>;

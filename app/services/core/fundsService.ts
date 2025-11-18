import type { FundsRepository } from '~/domain/repositories/funds.repository';

export const createFundsService = (repo: FundsRepository) => ({
  getFunds: () => repo.getFunds()
});

export type FundsService = ReturnType<typeof createFundsService>;

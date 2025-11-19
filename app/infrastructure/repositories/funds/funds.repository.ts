import type { FundsRepository } from './funds.repo';

import type { FundDTO } from '~/domain/dto/funds.dto';
import dbConnect from '~/infrastructure/db/connect';
import { Fund } from '~/infrastructure/models/archive/Fund';

export const fundsRepository: FundsRepository = {
  async getFunds(): Promise<FundDTO[]> {
    await dbConnect();

    const funds = await Fund.find().sort({ id: 1 }).lean();

    return funds.map((fund) => ({
      id: fund.id as number,
      number: fund.number as string,
      title: fund.title as string
    }));
  }
};

function newFundsRepository(): typeof fundsRepository {
  return fundsRepository;
}

export default newFundsRepository;

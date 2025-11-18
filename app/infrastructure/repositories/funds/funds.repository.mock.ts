import type { FundDTO } from '~/domain/dto/funds.dto';
import type { FundsRepository } from '~/domain/repositories/funds.repository';

const MOCK_FUNDS: FundDTO[] = [
  { id: 1, number: 'Фонд 1', title: 'АУДІОЗАПИСИ' },
  { id: 2, number: 'Фонд 2', title: 'ОСОБИСТІ ДОКУМЕНТИ' },
  { id: 3, number: 'Фонд 3', title: 'ЛИСТИ' },
  { id: 4, number: 'Фонд 4', title: 'АФІШІ' },
  { id: 5, number: 'Фонд 5', title: 'НОТНІ РУКОПИСИ' },
  { id: 6, number: 'Фонд 6', title: 'ТЕКСТИ' },
  { id: 7, number: 'Фонд 7', title: 'ДОГОВОРИ НА ВИДАННЯ ТВОРІВ, ЛИСТУВАННЯ З ВИДАВНИЦТВАМИ' },
  { id: 8, number: 'Фонд 8', title: 'ОПЕРА "ЗОЛОТИЙ ОБРУЧ"' },
  { id: 9, number: 'Фонд 9', title: 'КРИТИЧНІ МАТЕРІАЛИ' },
  { id: 10, number: 'Фонд 10', title: 'ПРОГРАМКИ КОНЦЕРТІВ' }
];

export const fundsRepositoryMock: FundsRepository = {
  async getFunds() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MOCK_FUNDS;
  }
};

import { createFundsService } from './fundsService';

import { FundsRepository } from '~/infrastructure/repositories/funds/funds.repo';

describe('fundsService', () => {
  const fundsRepositoryMock = {
    getFunds: jest.fn(),
    getFundById: jest.fn(),
    getCaseById: jest.fn()
  } as unknown as jest.Mocked<FundsRepository>;

  const fundsService = createFundsService({
    fundsRepository: fundsRepositoryMock
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFunds', () => {
    it('should call fundsRepository.getFunds and return data', async () => {
      const mockFunds = [{ id: 1, name: 'Fund 1' }];
      fundsRepositoryMock.getFunds.mockResolvedValue(mockFunds as any);

      const result = await fundsService.getFunds();

      expect(fundsRepositoryMock.getFunds).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockFunds);
    });
  });

  describe('getFundById', () => {
    it('should call fundsRepository.getFundById with correct id', async () => {
      const fundId = 42;
      const mockFund = { id: fundId, name: 'Special Fund' };
      fundsRepositoryMock.getFundById.mockResolvedValue(mockFund as any);

      const result = await fundsService.getFundById(fundId);

      expect(fundsRepositoryMock.getFundById).toHaveBeenCalledWith(fundId);
      expect(result).toEqual(mockFund);
    });
  });

  describe('getCaseById', () => {
    it('should call fundsRepository.getCaseById with correct caseId', async () => {
      const caseId = 'case-uuid-123';
      const mockCase = { _id: caseId, title: 'Medical Case' };
      fundsRepositoryMock.getCaseById.mockResolvedValue(mockCase as any);

      const result = await fundsService.getCaseById(caseId);

      expect(fundsRepositoryMock.getCaseById).toHaveBeenCalledWith(caseId);
      expect(result).toEqual(mockCase);
    });
  });
});

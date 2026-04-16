import newFundsRepository from './funds.repository';

import { Case } from '~/infrastructure/models/archive/Case';
import { Fund } from '~/infrastructure/models/archive/Fund';

jest.mock('~/infrastructure/db/connect', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('~/infrastructure/models/archive/Fund', () => ({
  Fund: {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn()
  }
}));
jest.mock('~/infrastructure/models/archive/Case', () => ({
  Case: {
    findById: jest.fn(),
    findOne: jest.fn()
  }
}));
jest.mock('~/infrastructure/models/archive/Document', () => ({}));

const fundsRepository = newFundsRepository();

const createFakeId = () => '65f1d5f2' + Date.now().toString(16).slice(-8);

const mockMongooseChain = (resolvedValue: any) => ({
  sort: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue(resolvedValue)
});

describe('fundsRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFunds', () => {
    it('should return funds sorted by id', async () => {
      const mockFunds = [{ id: 1, number: 'F1', title: 'Fund 1' }];
      (Fund.find as jest.Mock).mockReturnValue(mockMongooseChain(mockFunds));
      const result = await fundsRepository.getFunds();
      expect(result).toEqual(mockFunds);
    });
  });

  describe('getFundById', () => {
    const fundId = 123;

    it('should return fund details and map cases correctly (covers lines 53-61)', async () => {
      const mockFund = {
        id: fundId,
        number: '100',
        title: 'Archive Fund',
        numberOfDescriptions: 5,
        cases: [
          {
            _id: createFakeId(),
            cipher: 'C1',
            name: 'Case 1',
            dates: '2020',
            sheets: '10',
            contentDescription: 'Desc',
            pdfUrl: 'https://link.com',
            order: 1
          }
        ]
      };
      (Fund.findOne as jest.Mock).mockReturnValue(mockMongooseChain(mockFund));

      const result = await fundsRepository.getFundById(fundId);

      expect(result).not.toBeNull();
      if (!result) throw new Error('Result is null');

      const { cases = [], id, numberOfDescriptions } = result;

      expect(cases.length).toBe(1);
      expect(cases[0].name).toBe('Case 1');
      expect(cases[0].cipher).toBe('C1');
      expect(id).toBe(fundId);
      expect(numberOfDescriptions).toBe(5);
    });

    it('should handle fund without cases (covers line 34)', async () => {
      const mockFund = { id: fundId, number: '100' };
      (Fund.findOne as jest.Mock).mockReturnValue(mockMongooseChain(mockFund));

      const result = await fundsRepository.getFundById(fundId);

      if (!result) throw new Error('Result is null');

      const { cases = [] } = result;
      expect(cases).toEqual([]);
    });

    it('should return null if fund not found', async () => {
      (Fund.findOne as jest.Mock).mockReturnValue(mockMongooseChain(null));
      const result = await fundsRepository.getFundById(999);
      expect(result).toBeNull();
    });
  });

  describe('getCaseById', () => {
    const caseId = createFakeId();
    const fundObjectId = createFakeId();

    it('should return null if case not found (covers line 71)', async () => {
      (Case.findById as jest.Mock).mockReturnValue(mockMongooseChain(null));
      const result = await fundsRepository.getCaseById(caseId);
      expect(result).toBeNull();
    });

    it('should handle case without documents and without neighbors (covers lines 73-91)', async () => {
      const mockCaseDoc = {
        _id: caseId,
        fundId: fundObjectId,
        order: 1,
        name: 'First Case'
      };

      (Case.findById as jest.Mock).mockReturnValue(mockMongooseChain(mockCaseDoc));
      (Fund.findById as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });

      (Case.findOne as jest.Mock)
        .mockReturnValueOnce(mockMongooseChain(null))
        .mockReturnValueOnce(mockMongooseChain(null));

      const result = await fundsRepository.getCaseById(caseId);

      if (!result) throw new Error('Result should be defined');

      expect(result.documents).toEqual([]);
      expect(result.prevCase).toBeNull();
      expect(result.nextCase).toBeNull();
      expect(result.fundNumber).toBe('');
    });

    it('should return full case details with navigation', async () => {
      const mockCaseDoc = {
        _id: caseId,
        fundId: fundObjectId,
        order: 5,
        documents: [{ _id: createFakeId(), order: 1, text: 'Doc' }]
      };
      (Case.findById as jest.Mock).mockReturnValue(mockMongooseChain(mockCaseDoc));
      (Fund.findById as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue({ number: '1', title: 'T' }) });

      (Case.findOne as jest.Mock)
        .mockReturnValueOnce(mockMongooseChain({ _id: createFakeId(), name: 'P', cipher: 'C' }))
        .mockReturnValueOnce(mockMongooseChain({ _id: createFakeId(), name: 'N', cipher: 'C' }));

      const result = await fundsRepository.getCaseById(caseId);
      if (!result) throw new Error('Result should be defined');
      expect(result.prevCase).not.toBeNull();
      expect(result.nextCase).not.toBeNull();
    });
  });
});

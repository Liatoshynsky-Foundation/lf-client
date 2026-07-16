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

const createFakeId = () => '507f191e810c19729de860ea';

const mockMongooseChain = (resolvedValue: unknown) => ({
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

    it('should return fund details and map cases correctly when cases exist', async () => {
      const mockFund = {
        id: fundId,
        number: '100',
        title: 'Archive Fund',
        numberOfDescriptions: 5,
        numberOfCases: 10,
        organizationForm: 'Form',
        documentCreationDate: '2026',
        chronologicalBoundaries: 'Boundaries',
        documentLanguages: 'UA',
        characterAndContent: 'Content',
        accessConditions: 'Open',
        compilerInfo: 'Compiler',
        cases: [
          {
            _id: createFakeId(),
            cipher: 'C2',
            name: 'Case 2',
            dates: '2021',
            sheets: '20',
            contentDescription: 'Desc 2',
            pdfUrl: 'https://2.com',
            order: 2
          },
          {
            _id: createFakeId(),
            cipher: 'C1',
            name: 'Case 1',
            dates: '2020',
            sheets: '10',
            contentDescription: 'Desc 1',
            pdfUrl: 'https://1.com',
            order: 1
          }
        ]
      };

      (Fund.findOne as jest.Mock).mockReturnValue(mockMongooseChain(mockFund));

      const result = await fundsRepository.getFundById(fundId);

      expect(result).not.toBeNull();
      if (!result) {
        throw new Error('Result should be defined');
      }

      const cases = result.cases ?? [];

      expect(cases).toHaveLength(2);
      expect(cases.map((c) => c.order)).toEqual([1, 2]);
      expect(cases[0]?.name).toBe('Case 1');
      expect(cases[1]?.name).toBe('Case 2');
    });

    it('should handle fund without cases and use defaults for missing properties', async () => {
      const mockFund = {
        id: fundId,
        number: '100',
        title: 'Archive Fund',
        cases: null as unknown as undefined
      };

      (Fund.findOne as jest.Mock).mockReturnValue(mockMongooseChain(mockFund));

      const result = await fundsRepository.getFundById(fundId);

      if (!result) throw new Error('Result is null');

      expect(result.cases).toEqual([]);
      expect(result.numberOfDescriptions).toBe(0);
      expect(result.organizationForm).toBe('');
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

    it('should return null if case not found', async () => {
      (Case.findById as jest.Mock).mockReturnValue(mockMongooseChain(null));

      const result = await fundsRepository.getCaseById(caseId);

      expect(result).toBeNull();
    });

    it('should handle case without documents and without neighbors', async () => {
      const mockCaseDoc = {
        _id: caseId,
        fundId: fundObjectId,
        order: 1,
        name: 'First Case',
        documents: null as unknown as undefined
      };

      (Case.findById as jest.Mock).mockReturnValue(mockMongooseChain(mockCaseDoc));
      (Fund.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null)
      });

      (Case.findOne as jest.Mock)
        .mockReturnValueOnce(mockMongooseChain(null))
        .mockReturnValueOnce(mockMongooseChain(null));

      const result = await fundsRepository.getCaseById(caseId);

      if (!result) throw new Error('Result should be defined');

      expect(result.documents).toEqual([]);
      expect(result.prevCase).toBeNull();
      expect(result.nextCase).toBeNull();
      expect(result.fundNumber).toEqual({ en: '', uk: '' });
    });

    it('should return full case details with navigation and documents', async () => {
      const mockCaseDoc = {
        _id: caseId,
        fundId: fundObjectId,
        order: 5,
        cipher: 'C',
        name: 'Case',
        dates: '2020',
        sheets: '10',
        contentDescription: 'Desc',
        pdfUrl: 'url',
        documents: [
          {
            _id: createFakeId(),
            order: 2,
            text: 'Second'
          },
          {
            _id: createFakeId(),
            order: 1,
            text: 'First'
          }
        ]
      };

      (Case.findById as jest.Mock).mockReturnValue(mockMongooseChain(mockCaseDoc));

      (Fund.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          number: '1',
          title: 'T'
        })
      });

      (Case.findOne as jest.Mock)
        .mockReturnValueOnce(
          mockMongooseChain({
            _id: createFakeId(),
            name: 'Previous',
            cipher: 'P'
          })
        )
        .mockReturnValueOnce(
          mockMongooseChain({
            _id: createFakeId(),
            name: 'Next',
            cipher: 'N'
          })
        );

      const result = await fundsRepository.getCaseById(caseId);

      if (!result) {
        throw new Error('Result should be defined');
      }

      expect(result.prevCase).not.toBeNull();
      expect(result.nextCase).not.toBeNull();

      const documents = result.documents ?? [];

      expect(documents).toHaveLength(2);
      expect(documents.map((d) => d.order)).toEqual([1, 2]);
      expect(documents[0]?.text).toBe('First');
      expect(documents[1]?.text).toBe('Second');
    });
  });
});

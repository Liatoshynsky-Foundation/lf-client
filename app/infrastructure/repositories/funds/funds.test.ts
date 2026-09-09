import newFundsRepository from './funds.repository';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

import { FundStatus } from '~/domain/dto/funds.dto';
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
    it('should return published funds sorted by id', async () => {
      const mockFunds = [{ id: 1, title: { uk: 'Фонд 1', en: 'Fund 1' }, status: FundStatus.Published }];
      (Fund.find as jest.Mock).mockReturnValue(mockMongooseChain(mockFunds));

      const result = await fundsRepository.getFunds();

      expect(Fund.find).toHaveBeenCalledWith({ status: FundStatus.Published });
      expect(result).toEqual([
        {
          id: 1,
          number: { uk: 'Фонд 1', en: 'Fund 1' },
          title: { uk: 'Фонд 1', en: 'Fund 1' },
          status: FundStatus.Published
        }
      ]);
    });
  });

  describe('getFundById', () => {
    const fundId = 123;

    it('should return fund details and map cases correctly when cases exist', async () => {
      const mockFund = {
        id: fundId,
        title: { uk: 'Архівний фонд', en: 'Archive Fund' },
        numberOfDescriptions: 5,
        numberOfCases: 10,
        organizationForm: { uk: 'Форма', en: 'Form' },
        documentCreationDate: '2026',
        chronologicalBoundaries: 'Boundaries',
        documentLanguages: 'UA',
        characterAndContent: {
          uk: { type: TipTapNodeTypes.doc, content: [] },
          en: { type: TipTapNodeTypes.doc, content: [] }
        },
        accessConditions: 'Open',
        compilerInfo: 'Compiler',
        status: FundStatus.Published,
        cases: [
          {
            _id: createFakeId(),
            descriptionNumber: 1,
            caseNumber: 2,
            caseName: { uk: 'Справа 2', en: 'Case 2' },
            caseDate: { uk: '2021', en: '2021' },
            sheetsNumber: 20,
            caseDescriptions: { uk: 'Опис 2', en: 'Desc 2' },
            pdfFile: { url: 'https://2.com' },
            status: FundStatus.Published
          },
          {
            _id: createFakeId(),
            descriptionNumber: 1,
            caseNumber: 1,
            caseName: { uk: 'Справа 1', en: 'Case 1' },
            caseDate: { uk: '2020', en: '2020' },
            sheetsNumber: 10,
            caseDescriptions: { uk: 'Опис 1', en: 'Desc 1' },
            pdfFile: { url: 'https://1.com' },
            status: FundStatus.Published
          }
        ]
      };

      (Fund.findOne as jest.Mock).mockReturnValue(mockMongooseChain(mockFund));

      const result = await fundsRepository.getFundById(fundId);

      expect(result).not.toBeNull();
      if (!result) {
        throw new Error('Result should be defined');
      }

      expect(Fund.findOne).toHaveBeenCalledWith({ id: fundId, status: FundStatus.Published });
      expect(result.number).toEqual({ uk: `Фонд ${fundId}`, en: `Fund ${fundId}` });
      expect(result.organizationForm).toEqual({ uk: 'Форма', en: 'Form' });
      expect(result.characterAndContent).toEqual(mockFund.characterAndContent);

      const cases = result.cases;
      expect(cases).toHaveLength(2);
      expect(cases.map((c) => c.order)).toEqual([100001, 100002]);
      expect(cases[0]?.cipher).toBe(`Ф. ${fundId}, оп. 1, спр. 1`);
      expect(cases[0]?.name).toEqual({ uk: 'Справа 1', en: 'Case 1' });
      expect(cases[1]?.name).toEqual({ uk: 'Справа 2', en: 'Case 2' });
    });

    it('should handle fund without cases and avoid fallback strings for localized optional properties', async () => {
      const mockFund = {
        id: fundId,
        title: { uk: 'Архівний фонд', en: 'Archive Fund' },
        status: FundStatus.Published,
        cases: null as unknown as undefined
      };

      (Fund.findOne as jest.Mock).mockReturnValue(mockMongooseChain(mockFund));

      const result = await fundsRepository.getFundById(fundId);

      if (!result) throw new Error('Result is null');

      expect(result.cases).toEqual([]);
      expect(result.numberOfDescriptions).toBe(0);
      expect(result.organizationForm).toBeUndefined();
      expect(result.characterAndContent).toBeUndefined();
    });

    it('should not expose empty localized optional fund fields as fallback objects', async () => {
      const mockFund = {
        id: fundId,
        title: { uk: 'Архівний фонд', en: 'Archive Fund' },
        organizationForm: { uk: '', en: '' },
        status: FundStatus.Published,
        cases: []
      };

      (Fund.findOne as jest.Mock).mockReturnValue(mockMongooseChain(mockFund));

      const result = await fundsRepository.getFundById(fundId);

      if (!result) throw new Error('Result is null');

      expect(result.organizationForm).toBeUndefined();
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
        status: FundStatus.Published,
        documents: null as unknown as undefined
      };

      (Case.findById as jest.Mock).mockReturnValue(mockMongooseChain(mockCaseDoc));
      (Fund.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          id: 1,
          title: { uk: 'Фонд', en: 'Fund' },
          status: FundStatus.Published
        })
      });

      (Case.findOne as jest.Mock)
        .mockReturnValueOnce(mockMongooseChain(null))
        .mockReturnValueOnce(mockMongooseChain(null));

      const result = await fundsRepository.getCaseById(caseId);

      if (!result) throw new Error('Result should be defined');

      expect(result.documents).toEqual([]);
      expect(result.prevCase).toBeNull();
      expect(result.nextCase).toBeNull();
      expect(result.fundNumber).toEqual({ en: 'Fund 1', uk: 'Фонд 1' });
    });

    it('should return full case details with navigation and documents', async () => {
      const mockCaseDoc = {
        _id: caseId,
        fundId: fundObjectId,
        descriptionNumber: 1,
        caseNumber: 5,
        caseName: { uk: 'Справа', en: 'Case' },
        caseDate: { uk: '2020', en: '2020' },
        sheetsNumber: 10,
        caseDescriptions: { uk: 'Опис', en: 'Desc' },
        pdfFile: { url: 'url' },
        status: FundStatus.Published,
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

      (Fund.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          id: 1,
          title: { uk: 'Фонд', en: 'Fund' },
          status: FundStatus.Published
        })
      });

      (Case.findOne as jest.Mock)
        .mockReturnValueOnce(
          mockMongooseChain({
            _id: createFakeId(),
            descriptionNumber: 1,
            caseNumber: 4,
            caseName: { uk: 'Попередня', en: 'Previous' }
          })
        )
        .mockReturnValueOnce(
          mockMongooseChain({
            _id: createFakeId(),
            descriptionNumber: 1,
            caseNumber: 6,
            caseName: { uk: 'Наступна', en: 'Next' }
          })
        );

      const result = await fundsRepository.getCaseById(caseId);

      if (!result) {
        throw new Error('Result should be defined');
      }

      expect(result.prevCase).not.toBeNull();
      expect(result.nextCase).not.toBeNull();
      expect(result.cipher).toBe('Ф. 1, оп. 1, спр. 5');
      expect(result.name).toBe('Справа');

      const documents = result.documents ?? [];

      expect(documents).toHaveLength(2);
      expect(documents.map((d) => d.order)).toEqual([1, 2]);
      expect(documents[0]?.text).toBe('First');
      expect(documents[1]?.text).toBe('Second');
    });

    it('should return null for unpublished case details', async () => {
      (Case.findById as jest.Mock).mockReturnValue(
        mockMongooseChain({
          _id: caseId,
          fundId: fundObjectId,
          status: FundStatus.Draft
        })
      );

      const result = await fundsRepository.getCaseById(caseId);

      expect(result).toBeNull();
      expect(Fund.findOne).not.toHaveBeenCalled();
    });

    it('should return null when the case parent fund is not published or does not exist', async () => {
      (Case.findById as jest.Mock).mockReturnValue(
        mockMongooseChain({
          _id: caseId,
          fundId: fundObjectId,
          status: FundStatus.Published
        })
      );

      (Fund.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null)
      });

      const result = await fundsRepository.getCaseById(caseId);

      expect(Fund.findOne).toHaveBeenCalledWith({ _id: fundObjectId, status: FundStatus.Published });
      expect(result).toBeNull();
      expect(Case.findOne).not.toHaveBeenCalled();
    });
  });
});

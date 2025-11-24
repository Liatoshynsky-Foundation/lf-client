import '~/infrastructure/models/archive/Document';

import type { FundsRepository } from './funds.repo';

import type { CaseDetailsDTO, CaseDTO, DocumentDTO, FundDetailsDTO, FundDTO } from '~/domain/dto/funds.dto';
import dbConnect from '~/infrastructure/db/connect';
import { Case, ICase } from '~/infrastructure/models/archive/Case';
import { Fund, IFund } from '~/infrastructure/models/archive/Fund';

type FundWithCases = IFund & { cases?: ICase[] };
type CaseWithDocuments = ICase & { documents?: { _id: string; order: number; text: string }[] };

export const fundsRepository: FundsRepository = {
  async getFunds(): Promise<FundDTO[]> {
    await dbConnect();

    const funds = await Fund.find().sort({ id: 1 }).lean<IFund[]>();

    return funds.map((fund) => ({
      id: fund.id,
      number: fund.number,
      title: fund.title
    }));
  },

  async getFundById(id: number): Promise<FundDetailsDTO | null> {
    await dbConnect();

    const fund = await Fund.findOne({ id }).populate('cases').lean<FundWithCases>();

    if (!fund) return null;

    const cases = fund.cases || [];

    return {
      id: fund.id,
      number: fund.number,
      title: fund.title,
      numberOfDescriptions: fund.numberOfDescriptions ?? 0,
      numberOfCases: fund.numberOfCases ?? 0,
      organizationForm: fund.organizationForm ?? '',
      documentCreationDate: fund.documentCreationDate ?? '',
      chronologicalBoundaries: fund.chronologicalBoundaries ?? '',
      documentLanguages: fund.documentLanguages ?? '',
      characterAndContent: fund.characterAndContent ?? '',
      accessConditions: fund.accessConditions ?? '',
      compilerInfo: fund.compilerInfo ?? '',
      cases: cases
        .sort((a, b) => a.order - b.order)
        .map(
          (c): CaseDTO => ({
            _id: c._id.toString(),
            cipher: c.cipher,
            name: c.name,
            dates: c.dates,
            sheets: c.sheets,
            contentDescription: c.contentDescription,
            pdfUrl: c.pdfUrl,
            order: c.order
          })
        )
    };
  },

  async getCaseById(caseId: string): Promise<CaseDetailsDTO | null> {
    await dbConnect();

    const caseDoc = await Case.findById(caseId).populate('documents').lean<CaseWithDocuments>();

    if (!caseDoc) return null;

    const fund = await Fund.findById(caseDoc.fundId).lean<IFund>();

    const allCases = await Case.find({ fundId: caseDoc.fundId }).sort({ order: 1 }).lean<ICase[]>();
    const currentIndex = allCases.findIndex((c) => c._id.toString() === caseId);

    const prevCase = currentIndex > 0 ? allCases[currentIndex - 1] : null;
    const nextCase = currentIndex < allCases.length - 1 ? allCases[currentIndex + 1] : null;

    const documents = caseDoc.documents || [];

    return {
      _id: caseDoc._id.toString(),
      cipher: caseDoc.cipher,
      name: caseDoc.name,
      dates: caseDoc.dates,
      sheets: caseDoc.sheets,
      contentDescription: caseDoc.contentDescription,
      pdfUrl: caseDoc.pdfUrl,
      fundId: caseDoc.fundId.toString(),
      fundNumber: fund?.number ?? '',
      fundTitle: fund?.title ?? '',
      documents: documents
        .sort((a, b) => a.order - b.order)
        .map(
          (d): DocumentDTO => ({
            _id: d._id.toString(),
            order: d.order,
            text: d.text
          })
        ),
      prevCase: prevCase ? { _id: prevCase._id.toString(), name: prevCase.name } : null,
      nextCase: nextCase ? { _id: nextCase._id.toString(), name: nextCase.name } : null
    };
  }
};

function newFundsRepository(): typeof fundsRepository {
  return fundsRepository;
}

export default newFundsRepository;

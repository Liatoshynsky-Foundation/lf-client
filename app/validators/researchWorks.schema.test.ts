import { researchWorkPdfFileSchema, researchWorkSchema } from './researchWorks.schema';

import { ResearchWorkStatus } from '~/domain/dto/researchWorks.dto';

describe('researchWorkPdfFileSchema', () => {
  const validPdfFile = {
    filename: 'research.pdf',
    url: 'https://example.com/research.pdf',
    mimeType: 'application/pdf'
  };

  it('should validate valid PDF file', () => {
    expect(researchWorkPdfFileSchema.safeParse(validPdfFile).success).toBe(true);
  });

  it('should reject PDF file with missing required fields', () => {
    expect(
      researchWorkPdfFileSchema.safeParse({
        filename: 'research.pdf',
        url: 'https://example.com/research.pdf'
      }).success
    ).toBe(false);
  });

  it('should reject PDF file with invalid field types', () => {
    expect(
      researchWorkPdfFileSchema.safeParse({
        filename: 123,
        url: 'https://example.com/research.pdf',
        mimeType: 'application/pdf'
      }).success
    ).toBe(false);
  });
});

describe('researchWorkSchema', () => {
  const validResearchWork = {
    _id: '507f1f77bcf86cd799439011',
    bibliographicDescription: 'Research work description',
    year: '2020',
    keywords: 'music, history',
    pdfFile: {
      filename: 'research.pdf',
      url: 'https://example.com/research.pdf',
      mimeType: 'application/pdf'
    },
    url: 'https://example.com/research',
    status: ResearchWorkStatus.Published
  };

  it('should validate valid research work', () => {
    expect(researchWorkSchema.safeParse(validResearchWork).success).toBe(true);
  });

  it('should allow null and undefined for nullish fields', () => {
    const researchWork = {
      ...validResearchWork,
      keywords: null,
      pdfFile: undefined,
      url: null
    };
    expect(researchWorkSchema.safeParse(researchWork).success).toBe(true);
  });

  it('should reject research work with missing required fields', () => {
    const researchWork = {
      ...validResearchWork,
      bibliographicDescription: undefined
    };
    expect(researchWorkSchema.safeParse(researchWork).success).toBe(false);
  });

  it('should reject invalid research work status', () => {
    const researchWork = {
      ...validResearchWork,
      status: 'invalid-status'
    };
    expect(researchWorkSchema.safeParse(researchWork).success).toBe(false);
  });

  it('should reject invalid field types', () => {
    const researchWork = {
      ...validResearchWork,
      year: 2020
    };
    expect(researchWorkSchema.safeParse(researchWork).success).toBe(false);
  });
});

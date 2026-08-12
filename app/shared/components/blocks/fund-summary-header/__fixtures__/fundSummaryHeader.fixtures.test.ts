import { createMockTipTapDoc, mockFundSummaryData } from './fundSummaryHeader.fixtures';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

describe('FundSummaryHeader Fixtures', () => {
  describe('createMockTipTapDoc', () => {
    it('should create a valid TipTap document structure with provided text', () => {
      const testText = 'Hello World';
      const result = createMockTipTapDoc(testText);

      expect(result.type).toBe(TipTapNodeTypes.doc);
      expect(result.content).toHaveLength(1);

      const paragraph = result.content?.[0];
      expect(paragraph?.type).toBe(TipTapNodeTypes.paragraph);

      const textNode = paragraph?.content?.[0];
      expect(textNode?.type).toBe(TipTapNodeTypes.text);
      expect(textNode?.text).toBe(testText);
    });
  });

  describe('mockFundSummaryData', () => {
    it('should have the correct number of mock items', () => {
      expect(mockFundSummaryData.items).toHaveLength(3);
    });

    it('should contain valid localized data for each item', () => {
      mockFundSummaryData.items.forEach((item) => {
        expect(item.title.uk).toBeDefined();
        expect(item.title.en).toBeDefined();

        expect(item.description.uk.type).toBe(TipTapNodeTypes.doc);
        expect(item.description.en.type).toBe(TipTapNodeTypes.doc);
      });
    });

    it('should have specific content in the first item', () => {
      const firstItem = mockFundSummaryData.items[0];
      expect(firstItem.title.en).toBe('Fund Name');

      const ukText = firstItem.description.uk.content?.[0].content?.[0].text;
      expect(ukText).toBe('Опис українською');
    });
  });
  describe('FundSummaryHeader Content and Helpers', () => {
    it('should successfully execute getFundSummaryHeaderBacklinkUrl', async () => {
      jest.mock('~/lib/utils/navigationHelper', () => ({
        getNavigationLink: jest.fn().mockResolvedValue('/mocked-archive-path')
      }));

      const { getFundSummaryHeaderBacklinkUrl } = await import('../FundSummaryHeader.content');
      const url = await getFundSummaryHeaderBacklinkUrl();
      expect(url).toBeDefined();
    });

    it('should verify exported content structures', async () => {
      const { fundSummaryBacklinkText, fundSummaryTitle, fundSummaryContent } = await import(
        '../FundSummaryHeader.content'
      );

      expect(fundSummaryBacklinkText).toHaveProperty('uk');
      expect(fundSummaryBacklinkText).toHaveProperty('en');
      expect(fundSummaryTitle).toHaveProperty('uk');
      expect(fundSummaryTitle).toHaveProperty('en');
      expect(fundSummaryContent.items.length).toBeGreaterThan(0);
    });
  });
});

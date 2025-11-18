import { FundSummaryHeaderData } from '../FundSummaryHeader';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

export const createMockTipTapDoc = (text: string): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [{ type: TipTapNodeTypes.text, text }]
    }
  ]
});

export const mockFundSummaryData: FundSummaryHeaderData = {
  items: [
    {
      title: { uk: 'Назва фонду', en: 'Fund Name' },
      description: {
        uk: createMockTipTapDoc('Опис українською'),
        en: createMockTipTapDoc('Description in English')
      }
    },
    {
      title: { uk: 'Ціль фонду', en: 'Fund Purpose' },
      description: {
        uk: createMockTipTapDoc('Опис цілі українською'),
        en: createMockTipTapDoc('Purpose description in English')
      }
    },
    {
      title: { uk: 'Бенефіціари', en: 'Beneficiaries' },
      description: {
        uk: createMockTipTapDoc('Опис бенефіціарів українською'),
        en: createMockTipTapDoc('Beneficiaries description in English')
      }
    }
  ]
};

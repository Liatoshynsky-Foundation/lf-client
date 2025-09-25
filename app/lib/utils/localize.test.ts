import { localizeField, localizeList, localizeSections } from './localize';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/common.types';

const docEn: TipTapDoc = {
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [
        {
          type: TipTapNodeTypes.text,
          text: 'en'
        }
      ]
    }
  ]
};
const docUk: TipTapDoc = {
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [
        {
          type: TipTapNodeTypes.text,
          text: 'uk'
        }
      ]
    }
  ]
};

describe('localize', () => {
  it('should return the correct language value', () => {
    expect(localizeField({ en: docEn, uk: docUk }, 'en')).toBe(docEn);
    expect(localizeField({ en: docEn, uk: docUk }, 'uk')).toBe(docUk);
  });

  it('should return undefined if field is undefined', () => {
    expect(localizeField(undefined, 'en')).toBeUndefined();
  });

  it('should return an array of localized items', () => {
    const list = [
      { en: docEn, uk: docUk },
      { en: docEn, uk: docUk }
    ];
    expect(localizeList(list, 'en')).toEqual([docEn, docEn]);
    expect(localizeList(list, 'uk')).toEqual([docUk, docUk]);
  });

  it('should return empty array if list is undefined', () => {
    expect(localizeList(undefined, 'en')).toEqual([]);
  });

  it('should return mapped sections with localized fields', () => {
    const sections = [
      {
        subtitle: { en: docEn, uk: docUk },
        description: { en: docEn },
        note: { uk: docUk },
        list: [{ en: docEn, uk: docUk }]
      }
    ];
    expect(localizeSections(sections, 'en')).toEqual([
      {
        subtitle: docEn,
        description: docEn,
        note: undefined,
        list: [docEn]
      }
    ]);
    expect(localizeSections(sections, 'uk')).toEqual([
      {
        subtitle: docUk,
        description: undefined,
        note: docUk,
        list: [docUk]
      }
    ]);
  });

  it('should return empty array if sections is undefined', () => {
    expect(localizeSections(undefined as any, 'en')).toEqual([]);
  });
});

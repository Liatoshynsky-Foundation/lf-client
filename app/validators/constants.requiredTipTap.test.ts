import { Locale } from 'next-intl';

import { createFilledTipTapDoc, emptyTipTapDoc } from './__fixtures__/tiptap.fixtures';
import { requiredLocalizedTipTapDocSchema, requiredTranslatedTipTapSchema } from './constants';
import { LocalizationErrors } from '~/constants/errors';

describe('requiredTranslatedTipTapSchema', () => {
  const filledTipTap = createFilledTipTapDoc('Title');

  it('accepts non-empty TipTap for the active locale when the other locale is empty', () => {
    const schema = requiredTranslatedTipTapSchema('uk' as Locale);

    expect(
      schema.parse({
        uk: filledTipTap,
        en: emptyTipTapDoc
      })
    ).toEqual({
      uk: filledTipTap,
      en: emptyTipTapDoc
    });
  });

  it('rejects empty TipTap for the active locale', () => {
    const schema = requiredTranslatedTipTapSchema('en' as Locale);

    expect(() =>
      schema.parse({
        uk: filledTipTap,
        en: emptyTipTapDoc
      })
    ).toThrow(LocalizationErrors.MISSING_EN_ERROR);
  });
});

describe('requiredLocalizedTipTapDocSchema', () => {
  const filledTipTap = createFilledTipTapDoc('Body');

  it('accepts TipTap docs only and requires the active locale', () => {
    const schema = requiredLocalizedTipTapDocSchema('uk' as Locale);

    expect(
      schema.parse({
        uk: filledTipTap,
        en: emptyTipTapDoc
      })
    ).toEqual({
      uk: filledTipTap,
      en: emptyTipTapDoc
    });
  });

  it('rejects string values', () => {
    const schema = requiredLocalizedTipTapDocSchema('uk' as Locale);

    expect(() =>
      schema.parse({
        uk: 'plain string',
        en: emptyTipTapDoc
      })
    ).toThrow();
  });
});

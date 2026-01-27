import { z } from 'zod';

import { catchMissingTranslations } from './parseForMissingTranslations';
import { LocalizationErrors } from '~/constants/errors';
import { WrapError, WrapSuccess } from '~/types/types/result';

import { translatedFieldSchema } from '~/validators/constants';
import { TipTapDocSchema } from '~/validators/pagesSchemas/tiptap.schema';

describe('catchMissingTranslations', () => {
  const TranslatedTipTap = z.object({ uk: TipTapDocSchema, en: TipTapDocSchema });

  const validTranslatedField = { uk: 'УК', en: 'EN' };
  const missingUkField = { uk: '', en: 'EN' };
  const missingEnField = { uk: 'УК', en: '' };

  const validTipTapDoc = {
    type: 'doc' as const,
    content: [
      {
        type: 'paragraph' as const,
        content: [{ type: 'text' as const, text: 'Hello' }]
      }
    ]
  };

  it('returns success for a valid translated field', () => {
    const res = catchMissingTranslations(translatedFieldSchema, validTranslatedField);
    expect(res).toEqual(WrapSuccess(validTranslatedField));
  });

  it('returns MISSING_UK_ERROR when uk string is empty in translatedFieldSchema', () => {
    const res = catchMissingTranslations(translatedFieldSchema, missingUkField);
    expect(res).toEqual(WrapError(LocalizationErrors.MISSING_UK_ERROR));
  });

  it('returns MISSING_EN_ERROR when en string is empty in translatedFieldSchema', () => {
    const res = catchMissingTranslations(translatedFieldSchema, missingEnField);
    expect(res).toEqual(WrapError(LocalizationErrors.MISSING_EN_ERROR));
  });

  it('detects missing node translation under uk branch in TipTap docs', () => {
    const payload = {
      uk: {
        ...validTipTapDoc,
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: '' } // triggers MISSING_NODE_ERROR
            ]
          }
        ]
      },
      en: validTipTapDoc
    };
    const res = catchMissingTranslations(TranslatedTipTap, payload);
    expect(res).toEqual(WrapError(LocalizationErrors.MISSING_UK_ERROR));
  });

  it('detects missing node translation under en branch in TipTap docs', () => {
    const payload = {
      uk: validTipTapDoc,
      en: {
        ...validTipTapDoc,
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: '' } // triggers MISSING_NODE_ERROR
            ]
          }
        ]
      }
    };
    const res = catchMissingTranslations(TranslatedTipTap, payload);
    expect(res).toEqual(WrapError(LocalizationErrors.MISSING_EN_ERROR));
  });

  it('returns validation error wrapper for non-translation validation failures', () => {
    // e.g. completely wrong shape
    const res = catchMissingTranslations(TranslatedTipTap, { foo: 'bar' });
    // should be an error wrapper (not success) and contain the validation message
    expect(res.ok).toBe(false);
    // error should be a string starting with 'Validation error'
    expect(typeof (res as any).error).toBe('string');
    expect((res as any).error).toMatch(/Validation error/);
  });
});

import { Locale } from 'next-intl';

import { createFilledTipTapDoc, emptyTipTapDoc } from './__fixtures__/tiptap.fixtures';
import {
  doesTipTapHaveTranslations,
  fieldKeyFromPath,
  hasLocalizedContent,
  hasTipTapLocaleContent,
  isOptionalEmptyStringPath,
  isRecord
} from './localization.utils';

describe('localization.utils', () => {
  describe('isRecord', () => {
    it('returns true for plain objects', () => {
      expect(isRecord({ a: 1 })).toBe(true);
    });

    it('returns false for arrays, null and primitives', () => {
      expect(isRecord([])).toBe(false);
      expect(isRecord(null)).toBe(false);
      expect(isRecord('text')).toBe(false);
    });
  });

  describe('fieldKeyFromPath', () => {
    it('returns the last path segment without array indexes', () => {
      expect(fieldKeyFromPath('root.blocks.FoundationFounders.members[2].description')).toBe('description');
      expect(fieldKeyFromPath('root.photo.alt')).toBe('alt');
    });
  });

  describe('isOptionalEmptyStringPath', () => {
    it('treats alt, caption and genre as optional for any locale', () => {
      expect(isOptionalEmptyStringPath('root.photo.alt', 'uk' as Locale)).toBe(true);
      expect(isOptionalEmptyStringPath('root.image.caption', 'en' as Locale)).toBe(true);
      expect(isOptionalEmptyStringPath('root.genre', 'uk' as Locale)).toBe(true);
    });

    it('treats description as optional only for English', () => {
      expect(isOptionalEmptyStringPath('root.description', 'en' as Locale)).toBe(true);
      expect(isOptionalEmptyStringPath('root.description', 'uk' as Locale)).toBe(false);
    });
  });

  describe('doesTipTapHaveTranslations', () => {
    it('returns false for empty docs and missing content', () => {
      expect(doesTipTapHaveTranslations(emptyTipTapDoc)).toBe(false);
      expect(doesTipTapHaveTranslations({ type: 'doc' })).toBe(false);
      expect(
        doesTipTapHaveTranslations({
          type: 'doc',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }]
        })
      ).toBe(false);
    });

    it('returns true when a text node has content', () => {
      expect(doesTipTapHaveTranslations(createFilledTipTapDoc('Опис'))).toBe(true);
    });
  });

  describe('hasTipTapLocaleContent', () => {
    it('accepts non-empty strings and TipTap docs', () => {
      expect(hasTipTapLocaleContent('text')).toBe(true);
      expect(hasTipTapLocaleContent(createFilledTipTapDoc('text'))).toBe(true);
    });

    it('rejects empty strings and empty TipTap docs', () => {
      expect(hasTipTapLocaleContent('')).toBe(false);
      expect(hasTipTapLocaleContent(emptyTipTapDoc)).toBe(false);
    });
  });

  describe('hasLocalizedContent', () => {
    it('allows empty TipTap objects for any path', () => {
      expect(hasLocalizedContent(emptyTipTapDoc, 'root.title', 'uk' as Locale)).toBe(true);
      expect(hasLocalizedContent(emptyTipTapDoc, 'root.photo.alt', 'en' as Locale)).toBe(true);
    });

    it('allows empty English description strings and rejects empty Ukrainian ones', () => {
      expect(hasLocalizedContent('', 'root.description', 'en' as Locale)).toBe(true);
      expect(hasLocalizedContent('', 'root.description', 'uk' as Locale)).toBe(false);
    });
  });
});

import { Locale } from 'next-intl';

import { createFilledTipTapDoc, emptyTipTapDoc } from './__fixtures__/tiptap.fixtures';
import {
  doesTipTapHaveTranslations,
  fieldKeyFromPath,
  hasLocalizedContent,
  hasTipTapLocaleContent,
  isOptionalEmptyStringPath,
  isOptionalEmptyTipTapPath,
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

    it('treats nested description as optional only for English', () => {
      expect(isOptionalEmptyStringPath('root.blocks.item.description', 'en' as Locale)).toBe(true);
      expect(isOptionalEmptyStringPath('root.blocks.item.description', 'uk' as Locale)).toBe(false);
    });

    it('treats SEO root description, canonicalUrl and keywords as optional for any locale', () => {
      expect(isOptionalEmptyStringPath('root.description', 'uk' as Locale)).toBe(true);
      expect(isOptionalEmptyStringPath('root.canonicalUrl', 'uk' as Locale)).toBe(true);
      expect(isOptionalEmptyStringPath('root.keywords', 'en' as Locale)).toBe(true);
    });
  });

  describe('doesTipTapHaveTranslations', () => {
    it('returns false for empty docs and blank text nodes', () => {
      expect(doesTipTapHaveTranslations(emptyTipTapDoc)).toBe(false);
      expect(
        doesTipTapHaveTranslations({
          type: 'doc',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }]
        })
      ).toBe(false);
    });

    it('returns true when content is missing or a text node has content', () => {
      expect(doesTipTapHaveTranslations({ type: 'doc' })).toBe(true);
      expect(doesTipTapHaveTranslations(createFilledTipTapDoc('Опис'))).toBe(true);
    });
  });

  describe('isOptionalEmptyTipTapPath', () => {
    it('allows Foundation Team member name/description and image alt/caption', () => {
      expect(isOptionalEmptyTipTapPath('root.blocks.FoundationFounders.members[0].name')).toBe(true);
      expect(isOptionalEmptyTipTapPath('root.blocks.FoundationFounders.members[0].description')).toBe(true);
      expect(isOptionalEmptyTipTapPath('root.blocks.FoundationFounders.members[0].photo.alt')).toBe(true);
      expect(isOptionalEmptyTipTapPath('root.photo.caption')).toBe(true);
    });

    it('rejects unrelated TipTap paths such as mission/privacy list items', () => {
      expect(isOptionalEmptyTipTapPath('root.blocks.OurMission.list[0]')).toBe(false);
      expect(isOptionalEmptyTipTapPath('root.blocks.Cookies.list[1]')).toBe(false);
      expect(isOptionalEmptyTipTapPath('root.blocks.Cookies.description')).toBe(false);
      expect(isOptionalEmptyTipTapPath('root.title')).toBe(false);
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
    it('allows empty TipTap only on scoped optional paths', () => {
      expect(hasLocalizedContent(emptyTipTapDoc, 'root.photo.alt', 'en' as Locale)).toBe(true);
      expect(
        hasLocalizedContent(emptyTipTapDoc, 'root.blocks.FoundationFounders.members[0].name', 'uk' as Locale)
      ).toBe(true);
      expect(hasLocalizedContent(emptyTipTapDoc, 'root.title', 'uk' as Locale)).toBe(false);
      expect(hasLocalizedContent(emptyTipTapDoc, 'root.blocks.OurMission.list[0]', 'uk' as Locale)).toBe(false);
    });

    it('allows empty English nested description strings and rejects empty Ukrainian ones', () => {
      expect(hasLocalizedContent('', 'root.blocks.item.description', 'en' as Locale)).toBe(true);
      expect(hasLocalizedContent('', 'root.blocks.item.description', 'uk' as Locale)).toBe(false);
    });

    it('allows empty SEO strings, missing SEO values and boolean allowIndexation', () => {
      expect(hasLocalizedContent('', 'root.description', 'uk' as Locale)).toBe(true);
      expect(hasLocalizedContent(undefined, 'root.canonicalUrl', 'uk' as Locale)).toBe(true);
      expect(hasLocalizedContent(true, 'root.allowIndexation', 'en' as Locale)).toBe(true);
    });
  });
});

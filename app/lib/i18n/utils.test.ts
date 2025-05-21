import {
    extractLocaleFromPath,
    determineLocale
} from './utils';
import {
    SUPPORTED_LOCALES,
    DEFAULT_LOCALE
} from '~/constants';

describe('utils tests', () => {

    describe('extractLocaleFromPath', () => {
        it('should return the locale from a valid path', () => {
            for (const locale of SUPPORTED_LOCALES) {
                expect(extractLocaleFromPath(`/${locale}/some-page`)).toBe(locale);
            }
        });
        it('should returns null if locale is not exist', () => {
            expect(extractLocaleFromPath('/fr/some-page')).toBe(null);
            expect(extractLocaleFromPath('/invalid/path')).toBe(null);
        });
        it('should returns null for root path', () => {
            expect(extractLocaleFromPath('/')).toBe(null);
        });
    });

    describe('determineLocale', () => {
        it('should returns a valid locale if supported', () => {
            for (const locale of SUPPORTED_LOCALES) {
                expect(determineLocale(locale)).toBe(locale);
            }
        });

        it('should returns DEFAULT_LOCALE if the passed locale is invalid', () => {
            expect(determineLocale('fr')).toBe(DEFAULT_LOCALE);
            expect(determineLocale('')).toBe(DEFAULT_LOCALE);
        });
    });
});

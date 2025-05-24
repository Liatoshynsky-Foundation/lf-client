import {
    extractLocaleFromPath,
    determineLocale,
    isIcon
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
        it('should return null if locale does not exist', () => {
            expect(extractLocaleFromPath('/fr/some-page')).toBe(null);
            expect(extractLocaleFromPath('/invalid/path')).toBe(null);
        });
        it('should return null for root path', () => {
            expect(extractLocaleFromPath('/')).toBe(null);
        });
    });

    describe('determineLocale', () => {
        it('should return a valid locale if supported', () => {
            for (const locale of SUPPORTED_LOCALES) {
                expect(determineLocale(locale)).toBe(locale);
            }
        });

        it('should return DEFAULT_LOCALE if the passed locale is invalid', () => {
            expect(determineLocale('fr')).toBe(DEFAULT_LOCALE);
            expect(determineLocale('')).toBe(DEFAULT_LOCALE);
        });
    });

    describe('isIcon', () => {
        it('should return true for paths with file extensions', () => {
            expect(isIcon('/favicon.ico')).toBe(true);
            expect(isIcon('/images/logo.png')).toBe(true);
            expect(isIcon('/styles/main.css')).toBe(true);
        });

        it('should return false for paths without file extensions', () => {
            expect(isIcon('/about')).toBe(false);
            expect(isIcon('/')).toBe(false);
            expect(isIcon('.')).toBe(false);
        });
    })

});

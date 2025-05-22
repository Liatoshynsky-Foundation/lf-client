import { urlLocaleMiddleware } from './url-locale-middleware';
import {
    NextResponse,
    type NextRequest
} from 'next/server';
import {
    getCookie,
    setCookie
} from '~/lib/utils/cookies';
import {
    extractLocaleFromPath,
    determineLocale
} from '~/lib/i18n/utils';
import {
    DEFAULT_LOCALE,
    LANGUAGE_COOKIES,
    ONE_MONTH_IN_SECONDS
} from '~/constants';

const next = 'nextResponse';
const redirect = 'redirectResponse';
const exampleUrl = 'https://example.com/';

jest.mock('~/lib/utils/cookies');
jest.mock('~/lib/i18n/utils');
jest.mock('next/server', () => ({
    NextResponse: {
        next: jest.fn(() => ({ next })),
        redirect: jest.fn(() => ({ redirect })),
    }
}));

const getCookieMock = getCookie as jest.Mock;
const setCookieMock = setCookie as jest.Mock;
const extractLocaleMock = extractLocaleFromPath as jest.Mock;
const determineLocaleMock = determineLocale as jest.Mock;


describe('localBasedUrlMiddleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const expectSetCookieCalledWith = (
        response: NextResponse,
        locale: string
    ): void => {
        expect(setCookieMock).toHaveBeenCalledWith(
            response,
            locale,
            LANGUAGE_COOKIES,
            ONE_MONTH_IN_SECONDS
        );
    };

    const createRequest = (
        pathname: string
    ): NextRequest => {
        const url = `${exampleUrl}${pathname}`;
        return {
            nextUrl: new URL(url),
            cookies: {
                get: () => undefined,
            },
            url
        } as NextRequest;
    };

    it('should set cookie and redirect if locale is missing from path', () => {
        extractLocaleMock.mockReturnValue(null);
        getCookieMock.mockReturnValue('en');
        determineLocaleMock.mockReturnValue('en');

        const request = createRequest('test-page');
        const redirectSpy = jest.spyOn(NextResponse, 'redirect');
        const result = urlLocaleMiddleware(request);

        expect(determineLocaleMock).toHaveBeenCalledWith('en');
        expect(redirectSpy).toHaveBeenCalledWith(new URL(`${exampleUrl}test-page`, request.url));
        expectSetCookieCalledWith(result, 'en');
        expect(result).toStrictEqual({ redirect });
    });

    it('should set DEFAULT_LOCALE value there if users cookie is empty', () => {
        extractLocaleMock.mockReturnValue(null);
        getCookieMock.mockReturnValue('');
        determineLocaleMock.mockReturnValue(DEFAULT_LOCALE);

        const request = createRequest('test-page');
        const result = urlLocaleMiddleware(request);

        expectSetCookieCalledWith(result, DEFAULT_LOCALE);
        expect(result).toStrictEqual({ redirect });
    });

    it('should set cookie and return next if locale in path differs from cookie', () => {
        extractLocaleMock.mockReturnValue('uk');
        getCookieMock.mockReturnValue('en');

        const request = createRequest('uk/test-page');
        const result = urlLocaleMiddleware(request);

        expectSetCookieCalledWith(result, 'uk');
        expect(result).toStrictEqual({ next });
    });

    it('should return only next if locale matches cookie', () => {
        extractLocaleMock.mockReturnValue('uk');
        getCookieMock.mockReturnValue('uk');

        const request = createRequest('uk/test-page');
        const result = urlLocaleMiddleware(request);

        expect(setCookieMock).not.toHaveBeenCalled();
        expect(result).toStrictEqual({ next });
    });
});
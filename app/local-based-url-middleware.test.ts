import { localBasedUrlMiddleware } from './local-based-url-middleware';
import { NextResponse, NextRequest } from 'next/server';
import { getCookie, setCookie } from '~/lib/utils/cookies';
import { isStaticOrApiPath } from '~/lib/utils/is-static-or-api-path';
import { extractLocaleFromPath, determineLocale } from '~/lib/i18n/utils';
import {DEFAULT_LOCALE, LANGUAGE_COOKIES, ONE_MONTH_IN_SECONDS} from '~/constants';

const next = 'nextResponse';
const redirect = 'redirectResponse';
const exampleUrl = 'https://example.com/';

jest.mock('~/lib/utils/cookies');
jest.mock('~/lib/utils/is-static-or-api-path');
jest.mock('~/lib/i18n/utils');
jest.mock('next/server', () => ({
    NextResponse: {
        next: jest.fn(() => ({ next })),
        redirect: jest.fn(() => ({ redirect })),
    }
}));

const getCookieMock = getCookie as jest.Mock;
const setCookieMock = setCookie as jest.Mock;
const isStaticMock = isStaticOrApiPath as jest.Mock;
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

    it('should skip /api paths', () => {
        isStaticMock.mockReturnValue(true);

        const request = createRequest('api/test');
        const result = localBasedUrlMiddleware(request);

        expect(result).toStrictEqual({ next });
    });

    it('should set cookie and redirect if locale is missing from path', () => {
        isStaticMock.mockReturnValue(false);
        extractLocaleMock.mockReturnValue(null);
        getCookieMock.mockReturnValue('EN');
        determineLocaleMock.mockReturnValue('EN');

        const request = createRequest('test-page');
        const redirectSpy = jest.spyOn(NextResponse, 'redirect');
        const result = localBasedUrlMiddleware(request);

        expect(determineLocaleMock).toHaveBeenCalledWith('EN');
        expect(redirectSpy).toHaveBeenCalledWith(new URL(`${exampleUrl}test-page`, request.url));
        expectSetCookieCalledWith(result, 'EN');
        expect(result).toStrictEqual({ redirect });
    });

    it('should set DEFAULT_LOCALE value there if users cookie is empty', () => {
        isStaticMock.mockReturnValue(false);
        extractLocaleMock.mockReturnValue(null);
        getCookieMock.mockReturnValue('');
        determineLocaleMock.mockReturnValue(DEFAULT_LOCALE);

        const request = createRequest('test-page');
        const result = localBasedUrlMiddleware(request);

        expectSetCookieCalledWith(result, DEFAULT_LOCALE);
        expect(result).toStrictEqual({ redirect });
    });

    it('should set cookie and return next if locale in path differs from cookie', () => {
        isStaticMock.mockReturnValue(false);
        extractLocaleMock.mockReturnValue('UA');
        getCookieMock.mockReturnValue('EN');

        const request = createRequest('UA/test');
        const result = localBasedUrlMiddleware(request);

        expectSetCookieCalledWith(result, 'UA');
        expect(result).toStrictEqual({ next });
    });

    it('should return only next if locale matches cookie', () => {
        isStaticMock.mockReturnValue(false);
        extractLocaleMock.mockReturnValue('UA');
        getCookieMock.mockReturnValue('UA');

        const request = createRequest('UA/test');
        const result = localBasedUrlMiddleware(request);

        expect(setCookieMock).not.toHaveBeenCalled();
        expect(result).toStrictEqual({ next });
    });
});
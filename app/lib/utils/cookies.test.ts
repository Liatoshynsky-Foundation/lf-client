import {
    getCookie,
    setCookie
} from './cookies';
import { NextRequest } from 'next/server';

describe('cookie tests', () => {

    describe('getCookie', () => {
        it('should return the cookie value if it exists', () => {
            const request = {
                cookies: {
                    get: (name: string) => ({ value: 'UA' })
                }
            } as NextRequest;

            expect(getCookie('lang', request)).toBe('UA');
        });

        it('should return an empty string if there is no cookie', () => {
            const request = {
                cookies: {
                    get: (name: string) => undefined
                }
            } as NextRequest;

            expect(getCookie('lang', request)).toBe('');
        });
    });

    describe('setCookie', () => {
        it('should set a cookie with the required parameters', () => {
            const setCookieMock = jest.fn();

            const response = {
                cookies: {
                    set: setCookieMock,
                },
            };

            setCookie(response, 'en', 'lang', 3600);

            expect(setCookieMock).toHaveBeenCalledWith('lang', 'en', {
                maxAge: 3600,
                path: '/',
                sameSite: 'lax',
            });
        });
    });
});

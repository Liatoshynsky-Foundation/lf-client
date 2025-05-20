import { NextRequest } from "next/server";

type CookieSetter = {
    cookies: {
        set: (
            name: string,
            value: string,
            options: {
                maxAge: number;
                path: string;
                sameSite: 'lax'
            }
        ) => void;
    };
};

export const getCookie = (
    cookie: string,
    request: NextRequest
): string => {
    return request.cookies.get(cookie)?.value ?? ''
}

export const setCookie = (
    response: CookieSetter,
    cookieValue: string,
    cookie: string,
    maxAge: number
): void => {
    response.cookies.set(cookie, cookieValue, {
        maxAge: maxAge,
        path: '/',
        sameSite: 'lax'
    });
};


import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import {
    DEFAULT_LOCALE,
    SUPPORTED_LOCALES,
    DEFAULT_NS
} from '~/constants';
import {cacheAsync} from '~/lib/utils/cache';

export type Locale = typeof SUPPORTED_LOCALES[number];

export const getOptions = (lang = DEFAULT_LOCALE, ns: string | string[] = DEFAULT_NS) => {
    return {
        supportedLngs: SUPPORTED_LOCALES,
        DEFAULT_LOCALE,
        lng: lang,
        fallbackNS: DEFAULT_NS,
        DEFAULT_NS,
        ns,
    };
};

export const initI18next = async (lang: string, ns: string | string[]) => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend((language: string, namespace: string) =>
            import(`~/constants/locales/${language}/${namespace}.json`)
        ))
        .init(getOptions(lang, ns));
    return i18nInstance;
};

export async function getTranslations(lang: string, ns?: string | string[]) {
    const nsKey = Array.isArray(ns) ? ns.join(',') : ns ?? getOptions().DEFAULT_NS;
    const key = `${lang}:${nsKey}`;
    const i18n = await cacheAsync(key, () => initI18next(lang, nsKey));
    return {
        t: i18n.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
        i18n
    };
}
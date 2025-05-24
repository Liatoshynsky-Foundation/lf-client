import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import {
    DEFAULT_LOCALE,
    SUPPORTED_LOCALES,
    DEFAULT_NS
} from '~/constants';

export type Locale = typeof SUPPORTED_LOCALES[number];

const getOptions = (lang = DEFAULT_LOCALE, ns: string | string[] = DEFAULT_NS) => {
    return {
        supportedLngs: SUPPORTED_LOCALES,
        DEFAULT_LOCALE,
        lng: lang,
        fallbackNS: DEFAULT_NS,
        DEFAULT_NS,
        ns,
    };
};

const initI18next = async (lang: string, ns: string | string[]) => {
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
    const i18nextInstance = await initI18next(lang, ns || getOptions().DEFAULT_NS);
    return {
        t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
        i18n: i18nextInstance
    };
}
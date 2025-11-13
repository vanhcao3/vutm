import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '@/assets/languages/en.json';
import viTranslation from '@/assets/languages/vi.json';

const resources = {
    en: {
        translation: enTranslation
    },
    vi: {
        translation: viTranslation
    }
}
i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "vi",
        interpolation: {
            escapeValue: false,
        },

    });
i18n.languages = ['en', 'vi'];
export default i18n;

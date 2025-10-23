// client/src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Update the import paths to the new location
import en from '../locales/en/translation.json';
import hi from '../locales/hi/translation.json';
import te from '../locales/te/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      te: { translation: te },
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
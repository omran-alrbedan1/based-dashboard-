import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";
import enDashboard from "./locales/en/dashboard.json";
import arDashboard from "./locales/ar/dashboard.json";

const resources = {
  en: {
    translation: enTranslation,
    dashboard: enDashboard
  },
  ar: {
    translation: arTranslation,
    dashboard: arDashboard
  }
};

const updateDOM = (lng: string) => {
  const rtlLanguages = ['ar', 'he', 'fa'];
  const dir = rtlLanguages.includes(lng) ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    ns: ["translation", "dashboard"],
    defaultNS: "translation",
    detection: {
      order: ["localStorage", "cookie", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  updateDOM(lng);
});

updateDOM(i18n.language);

export default i18n;
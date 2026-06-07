import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";
import enDashboard from "./locales/en/dashboard.json";
import arDashboard from "./locales/ar/dashboard.json";
import enProductApproval from "./locales/en/productApproval.json";
import arProductApproval from "./locales/ar/productApproval.json";
import enCommon from "./locales/en/common.json";
import arCommon from "./locales/ar/common.json";
import enPayments from "./locales/en/payments.json";
import arPayments from "./locales/ar/payments.json";
import enOrders from "./locales/en/orders.json";
import arOrders from "./locales/ar/orders.json";
import enDrivers from "./locales/en/drivers.json";
import arDrivers from "./locales/ar/drivers.json";

const resources = {
  en: {
    translation: enTranslation,
    dashboard: enDashboard,
    productApproval: enProductApproval,
    common: enCommon,
    payments: enPayments,
    orders: enOrders,
    drivers: enDrivers,
  },
  ar: {
    translation: arTranslation,
    dashboard: arDashboard,
    productApproval: arProductApproval,
    common: arCommon,
    payments: arPayments,
    orders: arOrders,
    drivers: arDrivers,
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
    ns: ["translation", "dashboard", "productApproval", "common", "payments", "orders", "drivers"], 
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
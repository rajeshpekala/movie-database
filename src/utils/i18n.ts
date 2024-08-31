import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translateEnglish from "../locales/en/translation.json"
import translateTelugu from "../locales/te/translation.json";
import translateHindi from "../locales/hi/translation.json";
import translateTamil from "../locales/ta/translation.json";
import translateKannada from "../locales/ka/translation.json";

const resources = {
  en: {
    translation: translateEnglish,
  },
  te: {
    translation: translateTelugu,
  },
  hi: {
    translation: translateHindi,
  },
  ta: {
    translation: translateTamil,
  },
  ka: {
    translation: translateKannada,
  },
};

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  resources,
  lng: "en",
  returnNull: false,
  returnEmptyString: false,
});

export default i18next;
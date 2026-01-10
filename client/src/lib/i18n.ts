import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import JSON translation files - Vite handles JSON imports natively
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';
import frTranslations from '@/locales/fr.json';
import deTranslations from '@/locales/de.json';
import zhTranslations from '@/locales/zh.json';
import jaTranslations from '@/locales/ja.json';

// Helper function to deep merge translations (English as base, others override)
function deepMerge(base: any, overrides: any): any {
  const result = { ...base };
  for (const key in overrides) {
    if (overrides[key] && typeof overrides[key] === 'object' && !Array.isArray(overrides[key])) {
      result[key] = deepMerge(base[key] || {}, overrides[key]);
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
}

// Import the English translations as fallback and merge with others
// For missing translations, i18next will fall back to English
const resources = {
  en: { translation: enTranslations },
  es: { translation: deepMerge(enTranslations, esTranslations) },
  fr: { translation: deepMerge(enTranslations, frTranslations) },
  de: { translation: deepMerge(enTranslations, deTranslations) },
  zh: { translation: deepMerge(enTranslations, zhTranslations) },
  ja: { translation: deepMerge(enTranslations, jaTranslations) },
};

i18n
  .use(LanguageDetector) // Automatically detect user's language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Default language if detection fails or translation missing
    debug: false, // Set to true in development for debugging

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Order of language detection methods (most preferred first)
      // 1. localStorage - user's saved preference
      // 2. navigator - browser/system language
      // 3. htmlTag - HTML lang attribute
      // 4. path - language from URL path (e.g., /es/home)
      // 5. subdomain - language from subdomain (e.g., es.fortuna.ai)
      order: ['localStorage', 'navigator', 'htmlTag'],
      
      // Key to lookup language from localStorage
      lookupLocalStorage: 'fortuna_language',
      
      // Cache user language preference in localStorage
      caches: ['localStorage'],
      
      // Convert detected language codes (e.g., 'en-US' -> 'en', 'es-MX' -> 'es')
      convertDetectedLanguage: (lng: string | readonly string[]): string => {
        // Handle array (multiple detected languages)
        const lang = Array.isArray(lng) ? lng[0] : lng;
        // Extract base language code (e.g., 'en' from 'en-US')
        const baseLang = lang.split('-')[0].toLowerCase();
        // Map to supported languages, fallback to 'en' if not supported
        const supportedLangs = ['en', 'es', 'fr', 'de', 'zh', 'ja'];
        return supportedLangs.includes(baseLang) ? baseLang : 'en';
      },
    },

    // Language options
    supportedLngs: ['en', 'es', 'fr', 'de', 'zh', 'ja'],
    
    // Enable pluralization
    pluralSeparator: '_',
    
    // Namespace separator
    nsSeparator: '.',
    
    // Key separator (for nested translations)
    keySeparator: '.',
  });

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
});

// Set initial HTML lang attribute
if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language || 'en';
}

export default i18n;


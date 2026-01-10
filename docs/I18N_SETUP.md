# Internationalization (i18n) Setup Guide

## Current Status

This project uses **react-i18next** with **i18next-browser-languagedetector** for automatic language detection based on the user's location, browser settings, and preferences.

### Two Translation Systems (Dual Mode)

Currently, the project uses two translation systems side-by-side:

1. **i18next System** (NEW - Recommended): Full auto-translation support
   - Used in: Header component (with LanguageSwitcher)
   - Automatic language detection based on browser/system settings
   - Supports 6 languages: English, Spanish, French, German, Chinese, Japanese

2. **Static Translations** (LEGACY - Backward Compatible): English only
   - Used in: All other components (Home, Posts, Payment, Admin, etc.)
   - Static English translations for backward compatibility
   - Components continue to work but show English only

**Migration Path**: Gradually migrate components to use `useTranslation` hook for full i18n support.

## How Auto-Translation Works

### Automatic Language Detection

The system automatically detects the user's preferred language using this priority order:

1. **localStorage** (`fortuna_language`) - User's saved preference (if they've used LanguageSwitcher)
2. **Browser Language** (`navigator.language`) - Detects from browser/system settings
3. **HTML lang attribute** - Falls back to HTML tag if set

When a language is detected:
- Extracts base language code (e.g., 'en' from 'en-US', 'es' from 'es-MX')
- Maps to supported languages: `en`, `es`, `fr`, `de`, `zh`, `ja`
- Falls back to English if language not supported
- Saves preference to localStorage for future visits

### Example Detection Flow

```
User from Mexico visits site
  → Browser language: "es-MX"
  → Extract: "es"
  → Map to: Spanish (es)
  → Display Spanish translations
  → Save "es" to localStorage
```

```
User from France visits site  
  → Browser language: "fr-FR"
  → Extract: "fr"
  → Map to: French (fr)
  → Display French translations
  → Save "fr" to localStorage
```

## Using react-i18next (Recommended for New Code)

### Basic Usage

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  );
}
```

### With Interpolation (Variables)

```tsx
const { t } = useTranslation();
const username = 'John';
const planName = 'Premium';

// Translation key: payment.success.message
// JSON: "Welcome, {{username}}! Your {{planName}} subscription is now active."
<p>{t('payment.success.message', { username, planName })}</p>
```

### Arrays/Lists

```tsx
const { t } = useTranslation();

// Get array of features
const features = t('home.plans.free.features', { returnObjects: true }) as string[];

{features.map((feature, idx) => (
  <li key={idx}>{feature}</li>
))}
```

## Translation Files

All translation files are in `client/src/locales/`:

- **en.json** - English (complete, fallback language) ✅
- **es.json** - Spanish (partial, merges with English) 🌐
- **fr.json** - French (partial, merges with English) 🌐
- **de.json** - German (partial, merges with English) 🌐
- **zh.json** - Chinese (partial, merges with English) 🌐
- **ja.json** - Japanese (partial, merges with English) 🌐

Translation structure matches exactly:
```json
{
  "home": {
    "title": "Stay ahead with",
    "plans": {
      "free": {
        "name": "Free",
        "features": ["Feature 1", "Feature 2"]
      }
    }
  }
}
```

## Configuration

The i18next configuration is in `client/src/lib/i18n.ts`:

- **Fallback Language**: English (`en`)
- **Supported Languages**: `en`, `es`, `fr`, `de`, `zh`, `ja`
- **Detection Priority**: localStorage → navigator → htmlTag
- **Storage Key**: `fortuna_language` (in localStorage)
- **Auto-updates**: HTML `lang` attribute updates automatically

## Language Switcher Component

The `LanguageSwitcher` component is available in `client/src/components/LanguageSwitcher.tsx`.

**Features:**
- Globe icon + current language flag and name
- Dropdown menu with all 6 supported languages
- Automatically updates app language on selection
- Saves preference to localStorage
- Updates HTML `lang` attribute for accessibility

**Usage:**
```tsx
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

<LanguageSwitcher />
```

**Current Location**: Added to Header component (top navigation)

## Migration Guide

### Migrating a Component from Static Translations to i18next

**Before (Static - English only):**
```tsx
import { translations } from '@/lib/translations';

function MyComponent() {
  return <h1>{translations.home.title}</h1>;
}
```

**After (i18next - Auto-translation):**
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('home.title')}</h1>;
}
```

### For Function-based Translations

**Before:**
```tsx
translations.payment.success.message(username, planName)
```

**After:**
```tsx
const { t } = useTranslation();
t('payment.success.message', { username, planName })
```

**JSON structure:**
```json
{
  "payment": {
    "success": {
      "message": "Welcome, {{username}}! Your {{planName}} subscription is active."
    }
  }
}
```

## Adding New Languages

1. Create `client/src/locales/{lang-code}.json` (e.g., `ko.json` for Korean)
2. Add translations (can be partial - will merge with English)
3. Update `client/src/lib/i18n.ts`:
   ```ts
   import koTranslations from '@/locales/ko.json';
   
   const resources = {
     // ... existing
     ko: { translation: deepMerge(enTranslations, koTranslations) },
   };
   
   supportedLngs: ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko'],
   ```
4. Add to `LanguageSwitcher.tsx`:
   ```ts
   { code: 'ko', name: '한국어', flag: '🇰🇷' }
   ```

## Testing Auto-Translation

1. **Test Browser Detection:**
   - Change browser language to Spanish: Settings → Languages → Add Spanish → Set as primary
   - Clear localStorage: `localStorage.clear()` in browser console
   - Refresh page
   - Header should show Spanish translations

2. **Test Language Switcher:**
   - Click language switcher in header
   - Select a language (e.g., French)
   - All i18next-powered components update immediately
   - Refresh page - language preference persists

3. **Test localStorage:**
   - Select language via switcher
   - Check: `localStorage.getItem('fortuna_language')` should return selected language
   - Clear and refresh - should detect from browser again

## Component Migration Status

### ✅ Migrated to i18next (Auto-translation enabled)
- Header component
- LanguageSwitcher component

### 🔄 Still Using Static Translations (English only)
- Home page
- Posts page  
- Post Detail page
- Payment page
- Admin Login
- Admin Dashboard
- Footer
- NotFound page

**To enable auto-translation for these components**, migrate them to use `useTranslation` hook (see Migration Guide above).

## Best Practices

1. **Always use translation keys** - Never hardcode text in components
2. **Complete English first** - Ensure all keys exist in `en.json` (fallback)
3. **Use interpolation** - For dynamic content, use `{{variable}}` in JSON
4. **Test language switching** - Verify translations when switching languages
5. **Keep keys consistent** - Use same structure across all language files
6. **Gradual migration** - Migrate components one at a time to i18next

## Troubleshooting

**Language not detected correctly:**
- Check `convertDetectedLanguage` function in `i18n.ts`
- Verify language code is in `supportedLngs` array
- Clear localStorage and refresh

**Translation missing (shows key instead of text):**
- Ensure key exists in `en.json` (fallback)
- Check key path matches exactly (case-sensitive)
- Use `t('key', { defaultValue: 'Fallback' })` for debugging

**Component not updating when language changes:**
- Component must use `useTranslation()` hook
- Static `translations` object won't update (by design)
- Migrate component to use `useTranslation` hook

**Language switcher not appearing:**
- Check Header component imports LanguageSwitcher
- Verify i18n is initialized in `main.tsx`
- Check browser console for errors

## Dependencies

Required packages (already added to package.json):
```json
{
  "i18next": "^24.0.0",
  "i18next-browser-languagedetector": "^8.0.0",
  "react-i18next": "^15.0.0"
}
```

Install with:
```bash
npm install i18next i18next-browser-languagedetector react-i18next
```

## Examples

### Complete Component Example

```tsx
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('home.title')} {t('home.titleBrand')}</h1>
      <p>{t('home.description')}</p>
      
      {/* Arrays */}
      {t('home.plans.free.features', { returnObjects: true }).map((feature: string, idx: number) => (
        <li key={idx}>{feature}</li>
      ))}
      
      {/* Interpolation */}
      <p>{t('payment.success.message', { 
        username: 'John', 
        planName: 'Premium' 
      })}</p>
    </div>
  );
}
```

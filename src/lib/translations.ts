// BACKWARD COMPATIBILITY FILE
// This file maintains backward compatibility with existing components that use translations.home.title syntax
//
// IMPORTANT: New components should use react-i18next for auto-translation:
//   import { useTranslation } from 'react-i18next';
//   const { t } = useTranslation();
//   t('home.title')
//
// Components using this file will show English only (no auto-translation based on user's location)
// To enable auto-translation, migrate to useTranslation hook (see docs/I18N_SETUP.md)

import enTranslations from "@/locales/en.json";

// Create translations object with function support for backward compatibility
// Note: This uses static English values - components need to migrate to useTranslation() for auto-translation
export const translations = {
  home: {
    badge: enTranslations.home.badge,
    title: enTranslations.home.title,
    titleBrand: enTranslations.home.titleBrand,
    description: enTranslations.home.description,
    plans: {
      free: {
        name: enTranslations.home.plans.free.name,
        price: enTranslations.home.plans.free.price,
        period: enTranslations.home.plans.free.period,
        description: enTranslations.home.plans.free.description,
        features: enTranslations.home.plans.free.features,
        cta: enTranslations.home.plans.free.cta,
      },
      standard: {
        name: enTranslations.home.plans.standard.name,
        price: enTranslations.home.plans.standard.price,
        period: enTranslations.home.plans.standard.period,
        description: enTranslations.home.plans.standard.description,
        features: enTranslations.home.plans.standard.features,
        cta: enTranslations.home.plans.standard.cta,
      },
      premium: {
        name: enTranslations.home.plans.premium.name,
        price: enTranslations.home.plans.premium.price,
        period: enTranslations.home.plans.premium.period,
        description: enTranslations.home.plans.premium.description,
        features: enTranslations.home.plans.premium.features,
        cta: enTranslations.home.plans.premium.cta,
      },
    },
    mostPopular: enTranslations.home.mostPopular,
  },
  posts: {
    title: enTranslations.posts.title,
    description: enTranslations.posts.description,
    readMore: enTranslations.posts.readMore,
    noPosts: enTranslations.posts.noPosts,
    backToPosts: enTranslations.posts.backToPosts,
  },
  payment: {
    backToPlans: enTranslations.payment.backToPlans,
    title: enTranslations.payment.title,
    labels: {
      fullName: enTranslations.payment.labels.fullName,
      email: enTranslations.payment.labels.email,
      paymentDetails: enTranslations.payment.labels.paymentDetails,
      cardNumber: enTranslations.payment.labels.cardNumber,
      expiry: enTranslations.payment.labels.expiry,
      cvc: enTranslations.payment.labels.cvc,
    },
    placeholders: {
      name: enTranslations.payment.placeholders.name,
      email: enTranslations.payment.placeholders.email,
      cardNumber: enTranslations.payment.placeholders.cardNumber,
      expiry: enTranslations.payment.placeholders.expiry,
      cvc: enTranslations.payment.placeholders.cvc,
    },
    buttons: {
      processing: enTranslations.payment.buttons.processing,
      startFreePlan: enTranslations.payment.buttons.startFreePlan,
      subscribe: (price: string) => `Pay ${price}`,
    },
    secureCheckout: enTranslations.payment.secureCheckout,
    orderSummary: {
      title: enTranslations.payment.orderSummary.title,
      monthlySubscription:
        enTranslations.payment.orderSummary.monthlySubscription,
      total: enTranslations.payment.orderSummary.total,
    },
    success: {
      title: enTranslations.payment.success.title,
      message: (username: string, planName: string) =>
        `Welcome, ${username}! Your ${planName} subscription is now active. Check your email for confirmation.`,
      viewPosts: enTranslations.payment.success.viewPosts,
    },
    planDetails: {
      free: enTranslations.payment.planDetails.free,
      standard: enTranslations.payment.planDetails.standard,
      premium: enTranslations.payment.planDetails.premium,
    },
    messages: {
      fillRequiredFields: enTranslations.payment.messages.fillRequiredFields,
      enterPaymentDetails: enTranslations.payment.messages.enterPaymentDetails,
      subscriptionSuccessful:
        enTranslations.payment.messages.subscriptionSuccessful,
      subscriptionSuccessDescription: (planName: string) =>
        `You're now on the ${planName} plan.`,
    },
  },
  admin: {
    login: enTranslations.admin.login,
    dashboard: enTranslations.admin.dashboard,
  },
  common: enTranslations.common,
  footer: enTranslations.footer,
  notFound: enTranslations.notFound,
  postDetail: enTranslations.postDetail,
};

// Helper function to get nested translation with type safety (for backward compatibility)
export function getTranslation(path: string): string {
  const keys = path.split(".");
  let value: any = translations;
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) return path;
  }
  return typeof value === "string" ? value : path;
}

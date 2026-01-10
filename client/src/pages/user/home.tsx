import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles, Check } from 'lucide-react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { isPlanDisabled, isPlanPopular, type PlanId } from '@/lib/planConfig';

const planIds: PlanId[] = ['free', 'standard', 'premium'];

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleSelectPlan = (planId: string) => {
    if (isPlanDisabled(planId as PlanId)) {
      return; // Don't navigate if plan is disabled
    }
    
    // TODO: Payment integration with Stripe is coming soon
    // For now, only free plan is available
    if (planId === 'free') {
      // Free plan - can proceed without payment
    setLocation(`/payment?plan=${planId}`);
    } else {
      // Paid plans (standard/premium) - payment not available yet
      // Show message that Stripe integration is coming soon
      toast({
        title: t('payment.messages.paymentComingSoon', { defaultValue: 'Payment Coming Soon' }),
        description: t('payment.messages.stripeIntegration', { defaultValue: 'Stripe payment integration is under development. Please check back soon!' }),
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-24 pb-16 flex-1">
        <section className="max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            {t('home.badge')}
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
            {t('home.title')}{' '}
            <span className="gradient-text">{t('home.titleBrand')}</span>
          </h1>
          {t('home.description') && (
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-16">
              {t('home.description')}
          </p>
          )}

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {planIds.map((planId) => {
              const planName = t(`home.plans.${planId}.name`);
              const planPrice = t(`home.plans.${planId}.price`);
              const planPeriod = t(`home.plans.${planId}.period`);
              const planDescription = t(`home.plans.${planId}.description`);
              const planFeatures = t(`home.plans.${planId}.features`, { returnObjects: true }) as string[];
              const planCta = t(`home.plans.${planId}.cta`);
              const isDisabled = isPlanDisabled(planId);
              // A plan cannot be both popular and disabled - mutually exclusive
              const isPopular = !isDisabled && isPlanPopular(planId);
              
              return (
                <div
                  key={planId}
                  className={`relative rounded-2xl border p-8 text-left transition-all flex flex-col h-full ${
                    isDisabled
                      ? 'border-border bg-muted/50 opacity-60 cursor-not-allowed'
                      : isPopular
                        ? 'border-primary bg-primary/5 shadow-xl scale-105'
                        : 'border-border bg-card hover:border-primary/30'
                  }`}
                  data-testid={`card-plan-${planId}`}
                >
                  {/* Most Popular badge - only show if NOT disabled */}
                  {isPopular && !isDisabled && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      {t('home.mostPopular')}
                    </div>
                  )}
                  {/* Coming Soon badge - only show if disabled (mutually exclusive with Most Popular) */}
                  {isDisabled && !isPopular && (
                    <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                      {t('common.comingSoon', { defaultValue: 'Coming Soon' })}
                    </div>
                  )}
                  
                  {/* Plan Name - Aligned across all cards */}
                  <div className="mb-4 h-[32px] flex items-center">
                    <h3 className="font-display text-xl font-semibold leading-tight">
                      {planName}
                    </h3>
                  </div>
                  
                  {/* Price and Period - Aligned across all cards */}
                  <div className="mb-4 h-[56px] flex items-end">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold leading-none">{planPrice}</span>
                      <span className="text-muted-foreground text-base">{planPeriod}</span>
                    </div>
                  </div>
                  
                  {/* Description - Aligned across all cards */}
                  <div className="mb-6 h-[48px] flex items-start">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {planDescription}
                    </p>
                  </div>
                  
                  {/* Features - Flexible height, aligned start position */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {planFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button - Always at bottom, aligned */}
                  <div className="mt-auto pt-4">
                  <Button
                    onClick={() => handleSelectPlan(planId)}
                    disabled={isDisabled}
                      className={`w-full h-12 rounded-xl font-semibold ${
                      isDisabled
                        ? 'cursor-not-allowed'
                        : isPopular 
                          ? '' 
                          : 'bg-secondary hover:bg-secondary/90'
                    }`}
                    variant={isDisabled ? 'secondary' : isPopular ? 'default' : 'secondary'}
                    data-testid={`button-select-${planId}`}
                  >
                      {isDisabled ? t('common.comingSoon', { defaultValue: 'Coming Soon' }) : planCta}
                  </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

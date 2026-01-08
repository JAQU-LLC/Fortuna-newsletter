import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Sparkles, Check } from 'lucide-react';
import { useLocation } from 'wouter';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started with essential AI insights',
    features: [
      'Weekly newsletter',
      'Access to public posts',
      'Community updates',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$9',
    period: '/month',
    description: 'For professionals who want more depth',
    features: [
      'Everything in Free',
      'Daily AI briefings',
      'Exclusive analysis',
      'Early access to content',
      'Monthly webinars',
    ],
    cta: 'Subscribe',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$29',
    period: '/month',
    description: 'Full access for AI enthusiasts & teams',
    features: [
      'Everything in Standard',
      'Private Discord access',
      '1-on-1 monthly calls',
      'Custom research requests',
      'Team seats (up to 5)',
      'Priority support',
    ],
    cta: 'Go Premium',
    popular: false,
  },
];

export default function Home() {
  const [, setLocation] = useLocation();

  const handleSelectPlan = (planId: string) => {
    setLocation(`/payment?plan=${planId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Insights
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
            Stay ahead with{' '}
            <span className="gradient-text">Fortuna.ai</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-16">
            Get cutting-edge AI insights, industry trends, and exclusive content
            delivered straight to your inbox. Join thousands of forward-thinking
            professionals.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-8 text-left transition-all ${
                  plan.popular
                    ? 'border-primary bg-primary/5 shadow-xl scale-105'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
                data-testid={`card-plan-${plan.id}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full h-12 rounded-xl font-semibold ${
                    plan.popular ? '' : 'bg-secondary hover:bg-secondary/90'
                  }`}
                  variant={plan.popular ? 'default' : 'secondary'}
                  data-testid={`button-select-${plan.id}`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

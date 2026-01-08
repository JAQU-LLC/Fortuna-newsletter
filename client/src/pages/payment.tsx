import { useState } from 'react';
import { useLocation, useSearch } from 'wouter';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

const planDetails: Record<string, { name: string; price: string; features: string[] }> = {
  free: {
    name: 'Free',
    price: '$0/month',
    features: ['Weekly newsletter', 'Access to public posts', 'Community updates'],
  },
  standard: {
    name: 'Standard',
    price: '$9/month',
    features: ['Daily AI briefings', 'Exclusive analysis', 'Monthly webinars'],
  },
  premium: {
    name: 'Premium',
    price: '$29/month',
    features: ['Private Discord', '1-on-1 calls', 'Custom research', 'Team seats'],
  },
};

export default function Payment() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const planId = params.get('plan') || 'free';
  const plan = planDetails[planId] || planDetails.free;

  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    if (planId !== 'free' && (!form.cardNumber || !form.expiry || !form.cvc)) {
      toast({ title: 'Please enter payment details', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      toast({ title: 'Subscription successful!', description: `You're now on the ${plan.name} plan.` });
    }, 1500);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <div className="max-w-md w-full mx-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-4">Welcome to Fortuna.ai!</h1>
            <p className="text-muted-foreground mb-8">
              Your {plan.name} subscription is now active. Check your email for confirmation.
            </p>
            <Button onClick={() => setLocation('/posts')} className="h-12 px-8 rounded-xl" data-testid="button-view-posts">
              View Posts
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            Back to plans
          </Link>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl border border-border p-8">
                <h1 className="font-display text-2xl font-semibold mb-6">Complete your subscription</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="h-12 rounded-xl"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="h-12 rounded-xl"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  {planId !== 'free' && (
                    <>
                      <div className="border-t border-border pt-6">
                        <div className="flex items-center gap-2 mb-4">
                          <CreditCard className="w-5 h-5 text-muted-foreground" />
                          <span className="font-medium">Payment Details</span>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card">Card Number</Label>
                            <Input
                              id="card"
                              placeholder="4242 4242 4242 4242"
                              value={form.cardNumber}
                              onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                              className="h-12 rounded-xl"
                              data-testid="input-card"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                value={form.expiry}
                                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                                className="h-12 rounded-xl"
                                data-testid="input-expiry"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input
                                id="cvc"
                                placeholder="123"
                                value={form.cvc}
                                onChange={(e) => setForm({ ...form, cvc: e.target.value })}
                                className="h-12 rounded-xl"
                                data-testid="input-cvc"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Button type="submit" className="w-full h-12 rounded-xl font-semibold" disabled={isSubmitting} data-testid="button-subscribe">
                    {isSubmitting ? 'Processing...' : planId === 'free' ? 'Start Free Plan' : `Pay ${plan.price.split('/')[0]}`}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Lock className="w-3 h-3" />
                    Secure checkout powered by Stripe
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-muted/50 rounded-2xl border border-border p-6 sticky top-28">
                <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <div>
                      <div className="font-medium">{plan.name} Plan</div>
                      <div className="text-sm text-muted-foreground">Monthly subscription</div>
                    </div>
                    <div className="font-semibold">{plan.price.split('/')[0]}</div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border flex justify-between items-center font-semibold">
                    <span>Total</span>
                    <span className="text-xl">{plan.price.split('/')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

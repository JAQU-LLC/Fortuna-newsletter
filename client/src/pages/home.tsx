import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Mail, CheckCircle2 } from 'lucide-react';

interface HomeProps {
  onSubscribe: (name: string, email: string) => void;
}

export default function Home({ onSubscribe }: HomeProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({
        title: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    onSubscribe(name, email);
    setIsSubmitted(true);
    toast({
      title: 'Successfully subscribed!',
      description: 'Welcome to Fortuna.ai newsletter.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Insights
              </div>
              <h1 className="font-display text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Stay ahead with{' '}
                <span className="gradient-text">Fortuna.ai</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Get cutting-edge AI insights, industry trends, and exclusive content
                delivered straight to your inbox. Join thousands of forward-thinking
                professionals.
              </p>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Weekly updates
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  No spam
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Unsubscribe anytime
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 gradient-bg rounded-3xl blur-3xl opacity-50" />
              <div className="relative bg-white rounded-2xl border border-border p-8 shadow-xl">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center space-y-2 mb-8">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-7 h-7 text-primary" />
                      </div>
                      <h2 className="font-display text-2xl font-semibold">
                        Subscribe to our newsletter
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Join our community of AI enthusiasts
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 px-4 rounded-xl"
                        data-testid="input-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 px-4 rounded-xl"
                        data-testid="input-email"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl font-semibold text-base"
                      data-testid="button-subscribe"
                    >
                      Subscribe Now
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By subscribing, you agree to our privacy policy.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold">
                      You're subscribed!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for joining Fortuna.ai. Check your inbox for a
                      confirmation email.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Research',
                description:
                  'Deep dives into the latest AI papers and breakthroughs from leading labs.',
              },
              {
                title: 'Industry Trends',
                description:
                  'Analysis of how AI is transforming industries and creating new opportunities.',
              },
              {
                title: 'Practical Guides',
                description:
                  'Hands-on tutorials and guides to implement AI in your projects.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
                data-testid={`card-feature-${index}`}
              >
                <h3 className="font-display text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

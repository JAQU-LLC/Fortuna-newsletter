import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import logoUrl from '@assets/logo.png';

interface AdminLoginProps {
  onLogin: (username: string, password: string) => boolean;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (success) {
      setLocation('/admin/dashboard');
      toast({
        title: 'Welcome back!',
        description: 'You are now logged in as admin.',
      });
    } else {
      toast({
        title: 'Invalid credentials',
        description: 'Please check your username and password.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-xl">
          <div className="text-center space-y-4 mb-8">
            <img src={logoUrl} alt="Fortuna.ai" className="h-8 w-auto mx-auto invert" />
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-secondary" />
            </div>
            <h1 className="font-display text-2xl font-semibold">Admin Login</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 px-4 rounded-xl"
                data-testid="input-username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 px-4 rounded-xl"
                data-testid="input-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-semibold text-base"
              data-testid="button-login"
            >
              Sign In
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          This area is restricted to administrators only.
        </p>
      </div>
    </div>
  );
}

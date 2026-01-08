import { Link, useLocation } from 'wouter';
import logoUrl from '@assets/logo.png';

export function Header() {
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass" data-testid="header">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" data-testid="link-home">
          <img src={logoUrl} alt="Fortuna.ai" className="h-8 w-auto invert" />
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location === '/' ? 'text-primary' : 'text-foreground/70'
            }`}
            data-testid="link-subscribe"
          >
            Subscribe
          </Link>
          <Link
            href="/posts"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location === '/posts' ? 'text-primary' : 'text-foreground/70'
            }`}
            data-testid="link-posts"
          >
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
}

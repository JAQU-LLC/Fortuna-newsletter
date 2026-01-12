import { Link, useLocation } from "wouter";
import logoUrl from "@assets/logo.png";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [location] = useLocation();
  const { t } = useTranslation();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 glass"
      data-testid="header"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" data-testid="link-home">
          <img src={logoUrl} alt="Fortuna.ai" className="h-8 w-auto invert" />
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location === "/" ? "text-primary" : "text-foreground/70"
            }`}
            data-testid="link-subscribe"
          >
            {t("common.nav.subscribe")}
          </Link>
          <Link
            href="/posts"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location === "/posts" ? "text-primary" : "text-foreground/70"
            }`}
            data-testid="link-posts"
          >
            {t("common.nav.posts")}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}

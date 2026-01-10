import { Link } from 'wouter';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/chieh-lin-lee/"
                  className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4" />
                  {t('footer.social.linkedin')}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/justinlee919_/"
                  className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-4 h-4" />
                  {t('footer.social.instagram')}
                </a>
              </li>
              <li>
                <a
                  href="mailto:chiehlinleee@gmail.com"
                  className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="w-4 h-4" />
                  {t('footer.social.creator')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity block"
                >
                  {t('footer.legal.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity block"
                >
                  {t('footer.legal.termsOfUse')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">About</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Gain an edge with fast, accurate US stock insights & alerts, insider trading, congress trading delivered straight to your inbox, daily discord alerts for trading opportunities, and backtested strategies with alpha.
            </p>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8">
          <p className="text-sm text-center opacity-70">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}


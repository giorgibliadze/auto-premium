'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Car, Share2, ExternalLink, Rss, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const contact = useTranslations('contact');
  const locale = useLocale();

  const links = [
    { href: `/${locale}`, label: nav('home') },
    { href: `/${locale}/cars`, label: nav('cars') },
    { href: `/${locale}/rent`, label: nav('rent') },
    { href: `/${locale}/buy-sell`, label: nav('buySell') },
    { href: `/${locale}/about`, label: nav('about') },
    { href: `/${locale}/contact`, label: nav('contact') },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center">
                <Car className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold">
                <span className="gold-gradient">Auto</span>
                <span className="text-white">Premium</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">{t('desc')}</p>
            <div className="flex items-center gap-4">
              {[Share2, ExternalLink, Rss].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-yellow-400 hover:border-yellow-400/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">{t('links')}</h3>
            <div className="flex flex-col gap-2.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">{t('contact')}</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+995555000000" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-yellow-500/70" />
                {contact('phoneValue')}
              </a>
              <a href="mailto:info@autopremium.ge" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-yellow-500/70" />
                {contact('emailValue')}
              </a>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-yellow-500/70 shrink-0" />
                {contact('addressValue')}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} AutoPremium. {t('rights')}.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-xs text-white/30">Georgia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Key, ShoppingCart, TrendingUp, ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';

const icons = [Key, ShoppingCart, TrendingUp];
const hrefs = ['rent', 'buy-sell', 'buy-sell'];

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();

  const services = [
    { key: 'rent', color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/20', text: 'text-blue-400' },
    { key: 'buy', color: 'from-yellow-500/20 to-yellow-600/5', border: 'border-yellow-500/20', text: 'text-yellow-400' },
    { key: 'sell', color: 'from-green-500/20 to-green-600/5', border: 'border-green-500/20', text: 'text-green-400' },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ key, color, border, text }, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative group rounded-2xl p-8 bg-gradient-to-br ${color} border ${border} hover:border-opacity-60 transition-all duration-300 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors" />

                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${text}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{t(`${key}.title`)}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{t(`${key}.desc`)}</p>

                <Link
                  href={`/${locale}/${hrefs[i]}`}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold ${text} group-hover:gap-2.5 transition-all`}
                >
                  გადასვლა <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

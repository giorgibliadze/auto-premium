'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Play, Shield, Star, Clock } from 'lucide-react';

const stats = [
  { value: '500+', key: 'cars' },
  { value: '20+', key: 'brands' },
  { value: '1200+', key: 'clients' },
  { value: '5+', key: 'years' },
];

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0e0b] to-[#0a0a0a]" />

        {/* Cinematic car visual - gradient shapes */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[70vw] h-[70vw] max-w-3xl"
          style={{
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.15) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -left-32 w-[60vw] h-[60vw] max-w-2xl rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Floating car silhouette — SVG */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.08, x: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] pointer-events-none select-none"
      >
        <svg viewBox="0 0 800 350" className="w-full fill-white">
          <path d="M720,200 L700,200 L680,160 C660,120 600,100 520,95 L420,90 C380,88 340,100 300,115 L200,145 C170,155 145,165 130,175 L80,200 L60,200 C50,200 45,205 45,215 L45,230 C45,240 50,245 60,245 L90,245 C90,265 108,280 130,280 C152,280 170,265 170,245 L570,245 C570,265 588,280 610,280 C632,280 650,265 650,245 L720,245 C730,245 735,240 735,230 L735,215 C735,205 730,200 720,200 Z M130,265 C118,265 110,258 110,248 C110,238 118,231 130,231 C142,231 150,238 150,248 C150,258 142,265 130,265 Z M610,265 C598,265 590,258 590,248 C590,238 598,231 610,231 C622,231 630,238 630,248 C630,258 622,265 610,265 Z M440,135 L300,135 C320,118 360,107 400,105 L440,104 L440,135 Z M480,135 L480,103 L510,104 C560,106 610,118 640,145 L640,148 C620,140 560,135 480,135 Z" />
        </svg>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-yellow-500/20 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-sm text-yellow-400 font-medium">{t('badge')}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            {t('title')}{' '}
            <span className="gold-gradient">{t('titleHighlight')}</span>{' '}
            <br className="hidden sm:block" />
            {t('titleEnd')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link
              href={`/${locale}/cars`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold text-base hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105"
            >
              {t('browseCars')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/rent`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-white/10 text-white font-semibold text-base hover:border-yellow-500/30 hover:bg-white/5 transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-current" />
              {t('rentNow')}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                className="text-left"
              >
                <p className="text-2xl sm:text-3xl font-bold gold-gradient">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{t(`stats.${stat.key}`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-8 left-0 right-0"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 flex-wrap">
          {[
            { icon: Shield, text: 'სრული დაზღვევა' },
            { icon: Star, text: 'პრემიუმ სერვისი' },
            { icon: Clock, text: '24/7 მხარდაჭერა' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/30 text-sm">
              <Icon className="w-4 h-4 text-yellow-600/50" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

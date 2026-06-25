'use client';

import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, ChevronDown } from 'lucide-react';

const CarModel = dynamic(
  () => import('@/components/hero/CarModel'),
  { ssr: false, loading: () => null }
);

// ── CSS dot-grid background ───────────────────────────────────────────────────
function DotGridBg() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#060608' }}>
      {/* Strong dark radial fade: keeps center crisp, dark edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(6,6,8,0.3) 0%, rgba(6,6,8,0.6) 45%, rgba(6,6,8,0.9) 85%)',
        }}
      />

      {/* Subtle red/orange scan particles: 1px-2px, very low opacity, center/bottom focused */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,60,30,0.18) 1px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          opacity: 1,
          maskImage:
            'radial-gradient(circle at center, black 20%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, black 20%, transparent 70%)',
        }}
      />

      {/* Secondary: offset red particles for depth, even more subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,80,40,0.12) 1px, transparent 1.4px)',
          backgroundSize: '64px 64px',
          backgroundPosition: '16px 16px',
          maskImage:
            'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, transparent 75%)',
        }}
      />

      {/* Soft red/orange glow: center-bottom only, very subtle */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%', right: '-10%', width: '50%', height: '70%',
          background: 'radial-gradient(ellipse 80% 100% at 60% 70%, rgba(210,55,0,0.08) 0%, rgba(150,30,0,0.02) 50%, transparent 85%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Ultra-subtle rim glow: far edge */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, transparent 50%, rgba(6,6,8,0.95) 100%)',
        }}
      />
    </div>
  );
}

// ── Animated scan line ────────────────────────────────────────────────────────
function ScanLine() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden>
      <div
        className="absolute inset-x-0 h-[1px] opacity-40"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, #ff2200 30%, #ff6600 50%, #ff2200 70%, transparent 100%)',
          animation: 'scanline 6s ease-in-out infinite',
          boxShadow: '0 0 12px 3px rgba(255,40,0,0.4)',
        }}
      />
    </div>
  );
}

// ── Headline reveal: line 1 = first N-1 words (nowrap), line 2 = last word (indented) ──
function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(' ');
  const line1 = words.slice(0, -1);   // e.g. ["PREMIUM", "AUTO"]
  const line2 = words[words.length - 1]; // e.g. "PLATFORM"

  return (
    <span className="flex flex-col items-center text-center">
      {/* Line 1 — all words glued together, no wrap allowed */}
      <span className="inline-flex justify-center whitespace-nowrap">
        {line1.map((word, i) => (
          <motion.span
            key={`line1-${i}`}
            initial={{ opacity: 0, y: 40, skewX: -8 }}
            animate={{ opacity: 1, y: 0, skewX: 0 }}
            transition={{ duration: 0.65, delay: 0.3 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-block ${i < line1.length - 1 ? 'mr-[0.22em]' : ''} ${i === 1 ? 'gold-gradient' : 'text-white'}`}
          >
            {word}
          </motion.span>
        ))}
      </span>

      {/* Line 2 — last word, indented to create a stepped premium look */}
      <motion.span
        initial={{ opacity: 0, y: 40, skewX: -8 }}
        animate={{ opacity: 1, y: 0, skewX: 0 }}
        transition={{ duration: 0.65, delay: 0.3 + line1.length * 0.13, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex justify-center text-white whitespace-nowrap pl-[0.55em] sm:pl-[0.6em]"
      >
        {line2}
      </motion.span>
    </span>
  );
}

// ── Scroll cue ────────────────────────────────────────────────────────────────
function ScrollCue({ label }: { label: string }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.8 }}
      onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer border-none bg-transparent z-[5]"
    >
      <span className="text-[9px] tracking-[0.3em] uppercase text-white/20 group-hover:text-white/45 transition-colors duration-300">
        {label}
      </span>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-[14px] h-[14px] text-white/15 group-hover:text-yellow-500/50 transition-colors duration-300" />
      </motion.div>
    </motion.button>
  );
}

// ── Main hero ─────────────────────────────────────────────────────────────────
export default function HeroFuturistic() {
  const t = useTranslations('heroFuturistic');
  const locale = useLocale();

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#060608]">

      <div className="absolute inset-0 z-0"><DotGridBg /></div>
      <ScanLine />

      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-[63%] bg-gradient-to-r from-[#060608] via-[#060608]/90 to-transparent" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/65 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/75 to-transparent" />
      </div>

      <div className="relative z-[4] mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-12 px-6 pt-[90px] lg:grid-cols-[42%_58%] lg:px-10">
        <div className="max-w-[620px] translate-y-[-20px] lg:translate-y-0 lg:translate-x-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-8 sm:mb-10"
          >
            <div className="w-6 h-[1px] bg-yellow-500/50" />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.28em] uppercase text-yellow-400/65">
              AutoPremium
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
          </motion.div>

          <h1
            className="font-black uppercase mb-0"
            style={{
              fontSize: 'clamp(3.5rem, 7vw, 6rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              textShadow: '0 2px 40px rgba(0,0,0,0.55)',
            }}
          >
            <span className="block whitespace-nowrap">{t('title').split(' ').slice(0, -1).join(' ')}</span>
            <span className="block">{t('title').split(' ').slice(-1)}</span>
          </h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="origin-left mt-7 mb-7 h-[1.5px] w-16 bg-gradient-to-r from-yellow-500/80 via-yellow-400/50 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/40 font-light leading-[1.7] text-[0.95rem] sm:text-[1.05rem] mb-8 sm:mb-10"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-[24px] mb-8 sm:mb-10"
          >
            <Link
              href={`/${locale}/cars`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold text-[0.88rem] tracking-[0.01em] shadow-lg shadow-yellow-600/20 hover:shadow-yellow-500/35 hover:scale-[1.03] active:scale-[0.98] transition-all duration-250"
            >
              {t('button1')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/${locale}/dashboard/add-car`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/[0.12] bg-white/[0.03] text-white/80 font-medium text-[0.88rem] backdrop-blur-sm hover:border-yellow-500/30 hover:bg-white/[0.06] hover:text-white transition-all duration-250"
            >
              <Plus className="w-3.5 h-3.5 text-yellow-400/80" />
              {t('button2')}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="flex items-stretch gap-0"
          >
            {[
              { value: '50+', label: t('statCars'), delay: 1.35 },
              { value: '20+', label: t('statBrands'), delay: 1.45 },
              { value: '500+', label: t('statClients'), delay: 1.55 },
            ].map(({ value, label, delay }, i) => (
              <div key={label} className="flex flex-col gap-1">
                {i > 0 && <div className="w-[1px] bg-white/[0.08] mx-6 self-stretch" />}
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay, duration: 0.45 }}
                  className="text-[1.4rem] sm:text-[1.6rem] font-bold gold-gradient leading-none tracking-tight"
                >
                  {value}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay, duration: 0.45 }}
                  className="text-[9px] sm:text-[10px] text-white/25 uppercase tracking-[0.2em]"
                >
                  {label}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative hidden h-[620px] w-full lg:block">
          <CarModel className="w-full h-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden -mt-16 w-full h-52 sm:h-64"
          aria-hidden
        >
          <CarModel className="w-full h-full" />
        </motion.div>
      </div>

      <ScrollCue label={t('scroll')} />
    </section>
  );
}

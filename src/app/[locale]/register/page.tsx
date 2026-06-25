'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';
import AuthForm from '@/components/AuthForm';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data: { email: string; password: string; name?: string; role?: string }) => {
    setLoading(true);
    setError('');
    try {
      // TODO: Supabase auth
      await new Promise((r) => setTimeout(r, 1200));
      console.log('Register:', data);
    } catch {
      setError('რეგისტრაცია ვერ მოხერხდა');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center">
              <Car className="w-5 h-5 text-black" />
            </div>
            <span className="text-2xl font-bold">
              <span className="gold-gradient">Auto</span>
              <span className="text-white">Premium</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">{t('registerTitle')}</h1>
          <p className="text-white/40 text-sm mt-1">{t('registerSubtitle')}</p>
        </div>

        <div className="glass rounded-2xl p-8 border border-white/8">
          <AuthForm mode="register" onSubmit={handleSubmit} loading={loading} error={error} />

          <div className="mt-4 pt-4 border-t border-white/5 text-center">
            <span className="text-sm text-white/40">{t('hasAccount')} </span>
            <Link href={`/${locale}/login`} className="text-sm text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
              {t('login')}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 transition-colors";

  const contacts = [
    { icon: Phone, label: t('phone'), value: t('phoneValue'), href: 'tel:+995555000000' },
    { icon: Mail, label: t('email'), value: t('emailValue'), href: 'mailto:info@autopremium.ge' },
    { icon: MapPin, label: t('address'), value: t('addressValue'), href: '#' },
  ];

  return (
    <div className="min-h-screen bg-black pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 glass rounded-2xl p-5 border border-white/5 hover:border-yellow-500/10 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">{label}</p>
                  <p className="text-white text-sm font-medium group-hover:text-yellow-300 transition-colors">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 border border-green-500/20 text-center h-full flex flex-col items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
                <p className="text-white font-semibold text-lg">{t('success')}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/5 space-y-4">
                <div>
                  <input type="text" placeholder={t('name')} required className={inputClass} />
                </div>
                <div>
                  <input type="email" placeholder={t('email')} required className={inputClass} />
                </div>
                <div>
                  <textarea rows={6} placeholder={t('message')} required className={inputClass} />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-yellow-500/20 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'იტვირთება...' : t('send')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import { CheckCircle } from 'lucide-react';

export default function AddCarPage() {
  const t = useTranslations('addCar');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 transition-colors";
  const labelClass = "block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <DashboardSidebar />

          <div className="flex-1 min-w-0 max-w-2xl">
            <h1 className="text-2xl font-bold text-white mb-2">{t('title')}</h1>
            <p className="text-white/40 text-sm mb-8">{t('subtitle')}</p>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 border border-green-500/20 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-white font-semibold text-lg">{t('success')}</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:text-white transition-colors"
                >
                  {t('title')}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/5 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t('brand')}</label>
                    <input type="text" placeholder="Mercedes-Benz" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t('model')}</label>
                    <input type="text" placeholder="S-Class" required className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t('year')}</label>
                    <input type="number" placeholder="2023" min="1990" max="2025" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t('mileage')}</label>
                    <input type="number" placeholder="15000" className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t('price')}</label>
                    <input type="number" placeholder="85000" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t('rentalPrice')}</label>
                    <input type="number" placeholder="200" className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t('fuelType')}</label>
                    <select required className={inputClass}>
                      <option value="" className="bg-gray-900">—</option>
                      <option value="petrol" className="bg-gray-900">ბენზინი</option>
                      <option value="diesel" className="bg-gray-900">დიზელი</option>
                      <option value="electric" className="bg-gray-900">ელექტრო</option>
                      <option value="hybrid" className="bg-gray-900">ჰიბრიდი</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{t('transmission')}</label>
                    <select required className={inputClass}>
                      <option value="" className="bg-gray-900">—</option>
                      <option value="automatic" className="bg-gray-900">ავტომატური</option>
                      <option value="manual" className="bg-gray-900">მექანიკური</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t('location')}</label>
                    <input type="text" placeholder="თბილისი" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t('type')}</label>
                    <select required className={inputClass}>
                      <option value="rent" className="bg-gray-900">დაქირავება</option>
                      <option value="sale" className="bg-gray-900">გაყიდვა</option>
                      <option value="both" className="bg-gray-900">ორივე</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{t('description')}</label>
                  <textarea rows={4} className={inputClass} placeholder="ავტომობილის მოკლე აღწერა..." />
                </div>

                <div>
                  <label className={labelClass}>{t('images')}</label>
                  <textarea rows={3} className={inputClass} placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-yellow-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'იტვირთება...' : t('submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

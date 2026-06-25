'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { CarFilters as FiltersType } from '@/types';
import { brands } from '@/lib/mock-data';

interface Props {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
}

export default function CarFilters({ filters, onChange }: Props) {
  const t = useTranslations('cars.filters');
  const [open, setOpen] = useState(false);

  const set = (key: keyof FiltersType, value: string | number | undefined) => {
    onChange({ ...filters, [key]: value || undefined });
  };

  const reset = () => onChange({});

  const hasFilters = Object.values(filters).some((v) => v !== undefined);

  const filterContent = (
    <div className="space-y-5">
      {/* Brand */}
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">{t('brand')}</label>
        <select
          value={filters.brand ?? ''}
          onChange={(e) => set('brand', e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
        >
          <option value="">{t('allBrands')}</option>
          {brands.map((b) => (
            <option key={b} value={b} className="bg-gray-900">{b}</option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">{t('type')}</label>
        <div className="flex gap-2">
          {(['', 'rent', 'sale'] as const).map((v) => (
            <button
              key={v}
              onClick={() => set('type', v || undefined)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                (filters.type ?? '') === v
                  ? 'bg-yellow-500 text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {v === '' ? t('allTypes') : v === 'rent' ? t('rent') : t('sale')}
            </button>
          ))}
        </div>
      </div>

      {/* Fuel */}
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">{t('fuel')}</label>
        <select
          value={filters.fuelType ?? ''}
          onChange={(e) => set('fuelType', e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
        >
          <option value="">{t('allFuels')}</option>
          <option value="petrol" className="bg-gray-900">{t('petrol')}</option>
          <option value="diesel" className="bg-gray-900">{t('diesel')}</option>
          <option value="electric" className="bg-gray-900">{t('electric')}</option>
          <option value="hybrid" className="bg-gray-900">{t('hybrid')}</option>
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">{t('transmission')}</label>
        <select
          value={filters.transmission ?? ''}
          onChange={(e) => set('transmission', e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
        >
          <option value="">{t('allTransmissions')}</option>
          <option value="automatic" className="bg-gray-900">{t('automatic')}</option>
          <option value="manual" className="bg-gray-900">{t('manual')}</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">{t('price')}</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder={t('from')}
            value={filters.minPrice ?? ''}
            onChange={(e) => set('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 transition-colors"
          />
          <input
            type="number"
            placeholder={t('to')}
            value={filters.maxPrice ?? ''}
            onChange={(e) => set('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Year */}
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">{t('year')}</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder={t('from')}
            value={filters.minYear ?? ''}
            onChange={(e) => set('minYear', e.target.value ? Number(e.target.value) : undefined)}
            className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 transition-colors"
          />
          <input
            type="number"
            placeholder={t('to')}
            value={filters.maxYear ?? ''}
            onChange={(e) => set('maxYear', e.target.value ? Number(e.target.value) : undefined)}
            className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 transition-colors"
          />
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={reset}
          className="w-full py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          {t('reset')}
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="glass rounded-2xl p-6 sticky top-28">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-yellow-500" />
              {t('title')}
            </h3>
            {hasFilters && (
              <button onClick={reset} className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                {t('reset')}
              </button>
            )}
          </div>
          {filterContent}
        </div>
      </div>

      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm font-medium text-white border border-white/10"
        >
          <SlidersHorizontal className="w-4 h-4 text-yellow-500" />
          {t('title')}
          {hasFilters && (
            <span className="w-5 h-5 rounded-full bg-yellow-500 text-black text-xs font-bold flex items-center justify-center">
              {Object.values(filters).filter(Boolean).length}
            </span>
          )}
        </button>

        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="relative w-80 max-w-full h-full bg-[#111] overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-yellow-500" />
                  {t('title')}
                </h3>
                <button onClick={() => setOpen(false)}>
                  <X className="w-5 h-5 text-white/60 hover:text-white" />
                </button>
              </div>
              {filterContent}
              <button
                onClick={() => setOpen(false)}
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold text-sm"
              >
                {t('apply')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
}

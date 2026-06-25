'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Fuel, Gauge, Calendar, ArrowRight, Zap } from 'lucide-react';
import { Car } from '@/types';

interface Props {
  car: Car;
  index?: number;
}

const fuelIcons: Record<string, typeof Fuel> = {
  electric: Zap,
  petrol: Fuel,
  diesel: Fuel,
  hybrid: Zap,
};

export default function CarCard({ car, index = 0 }: Props) {
  const locale = useLocale();
  const t = useTranslations('cars');
  const common = useTranslations('common');

  const FuelIcon = fuelIcons[car.fuelType] ?? Fuel;

  const fuelLabel: Record<string, string> = {
    petrol: common('petrol'),
    diesel: common('diesel'),
    electric: common('electric'),
    hybrid: common('hybrid'),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl overflow-hidden glass border border-white/8 hover:border-yellow-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/5"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {(car.type === 'rent' || car.type === 'both') && (
            <span className="px-2.5 py-1 rounded-full bg-blue-500/80 backdrop-blur text-white text-xs font-semibold">
              {t('filters.rent')}
            </span>
          )}
          {(car.type === 'sale' || car.type === 'both') && (
            <span className="px-2.5 py-1 rounded-full bg-yellow-500/80 backdrop-blur text-black text-xs font-semibold">
              {t('filters.sale')}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/80 text-xs">
          <MapPin className="w-3 h-3" />
          <span>{car.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-4">
          <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">{car.brand}</p>
          <h3 className="text-white text-lg font-bold leading-tight">{car.model}</h3>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <Gauge className="w-3.5 h-3.5" />
            <span>{car.mileage.toLocaleString()} {common('km')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <FuelIcon className="w-3.5 h-3.5" />
            <span>{fuelLabel[car.fuelType]}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between">
          <div>
            {car.type !== 'rent' && (
              <p className="text-white font-bold text-xl">
                ${car.price.toLocaleString()}
              </p>
            )}
            {(car.type === 'rent' || car.type === 'both') && (
              <p className={`text-yellow-400 font-semibold ${car.type === 'both' ? 'text-sm' : 'text-xl'}`}>
                ${car.rentalPricePerDay}
                <span className="text-white/40 text-xs font-normal">{t('perDay')}</span>
              </p>
            )}
          </div>

          <Link
            href={`/${locale}/cars/${car.id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black text-xs font-semibold hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 group/btn"
          >
            {t('viewDetails')}
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

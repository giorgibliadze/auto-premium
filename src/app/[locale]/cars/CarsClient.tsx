'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import CarCard from '@/components/CarCard';
import CarFilters from '@/components/CarFilters';
import { Car, CarFilters as FiltersType } from '@/types';
import { Search } from 'lucide-react';

interface Props {
  cars: Car[];
}

export default function CarsClient({ cars }: Props) {
  const t = useTranslations('cars');
  const [filters, setFilters] = useState<FiltersType>({});
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return cars.filter((car) => {
      if (search) {
        const q = search.toLowerCase();
        if (!`${car.brand} ${car.model}`.toLowerCase().includes(q)) return false;
      }
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.type && car.type !== filters.type && !(car.type === 'both')) return false;
      if (filters.minPrice && car.price < filters.minPrice) return false;
      if (filters.maxPrice && car.price > filters.maxPrice) return false;
      if (filters.minYear && car.year < filters.minYear) return false;
      if (filters.maxYear && car.year > filters.maxYear) return false;
      return true;
    });
  }, [cars, filters, search]);

  return (
    <div className="flex gap-8 items-start">
      <CarFilters filters={filters} onChange={setFilters} />

      <div className="flex-1 min-w-0">
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30" />
          <input
            type="text"
            placeholder="Mercedes, BMW..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 transition-colors"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-white/60 font-medium mb-1">{t('noResults')}</p>
            <p className="text-white/30 text-sm">{t('noResultsDesc')}</p>
          </div>
        ) : (
          <>
            <p className="text-white/40 text-sm mb-4">{filtered.length} ავტომობილი</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

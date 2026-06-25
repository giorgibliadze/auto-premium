import { useTranslations } from 'next-intl';
import { mockCars } from '@/lib/mock-data';
import CarCard from '@/components/CarCard';
import SectionTitle from '@/components/SectionTitle';
import { Truck, Clock, Shield } from 'lucide-react';

export default function RentPage() {
  const t = useTranslations('rent');
  const cars = useTranslations('cars');

  const rentCars = mockCars.filter((c) => c.type === 'rent' || c.type === 'both');

  const whyItems = [
    { icon: Truck, title: t('why.free'), desc: t('why.freeDesc') },
    { icon: Clock, title: t('why.support'), desc: t('why.supportDesc') },
    { icon: Shield, title: t('why.insurance'), desc: t('why.insuranceDesc') },
  ];

  return (
    <div className="min-h-screen bg-black pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        {/* Why us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {whyItems.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-6 border border-white/5">
              <div className="w-11 h-11 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-white/50 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <SectionTitle title={cars('title')} subtitle={cars('subtitle')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rentCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

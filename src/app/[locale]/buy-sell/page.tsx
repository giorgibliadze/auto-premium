import { useTranslations } from 'next-intl';
import { mockCars } from '@/lib/mock-data';
import CarCard from '@/components/CarCard';
import SectionTitle from '@/components/SectionTitle';
import { ShoppingCart, TrendingUp, CheckCircle } from 'lucide-react';

export default function BuySellPage() {
  const t = useTranslations('buySell');
  const cars = useTranslations('cars');

  const saleCars = mockCars.filter((c) => c.type === 'sale' || c.type === 'both');

  return (
    <div className="min-h-screen bg-black pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="glass rounded-2xl p-8 border border-yellow-500/10">
            <ShoppingCart className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">{t('buyTitle')}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4">{t('buyDesc')}</p>
            <ul className="space-y-2">
              {['გარანტირებული ხარისხი', 'სრული დოკუმენტაცია', 'ტექნიკური შემოწმება'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="w-4 h-4 text-yellow-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-8 border border-green-500/10">
            <TrendingUp className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">{t('sellTitle')}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4">{t('sellDesc')}</p>
            <ul className="space-y-2">
              {['სწრაფი გაყიდვა', 'პრემიუმ აუდიტორია', 'უფასო განცხადება'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <SectionTitle title={cars('title')} subtitle={cars('subtitle')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {saleCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

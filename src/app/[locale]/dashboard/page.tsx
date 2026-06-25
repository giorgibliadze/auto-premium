import { useTranslations } from 'next-intl';
import DashboardSidebar from '@/components/DashboardSidebar';
import { mockCars } from '@/lib/mock-data';
import Image from 'next/image';
import { Edit2, Trash2, PlusCircle, Car, CheckCircle, Key } from 'lucide-react';

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  const myCars = mockCars.slice(0, 3);
  const stats = [
    { label: t('totalCars'), value: myCars.length, icon: Car, color: 'text-white' },
    { label: t('available'), value: myCars.filter((c) => c.status === 'available').length, icon: CheckCircle, color: 'text-green-400' },
    { label: t('rented'), value: myCars.filter((c) => c.status === 'rented').length, icon: Key, color: 'text-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <DashboardSidebar />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-white">{t('myCars')}</h1>
              <a
                href="./dashboard/add-car"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 text-black text-sm font-semibold hover:shadow-lg hover:shadow-yellow-500/20 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                {t('addCar')}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="glass rounded-2xl p-5 border border-white/5">
                  <Icon className={`w-5 h-5 ${color} mb-3`} />
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Car list */}
            <div className="space-y-4">
              {myCars.map((car) => (
                <div key={car.id} className="glass rounded-2xl p-4 border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors">
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0">
                    <Image src={car.images[0]} alt={car.model} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{car.brand} {car.model}</p>
                    <p className="text-white/40 text-sm">{car.year} · ${car.price.toLocaleString()}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    car.status === 'available' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {car.status === 'available' ? t('available') : t('rented')}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

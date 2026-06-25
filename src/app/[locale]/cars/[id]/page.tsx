import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { mockCars } from '@/lib/mock-data';
import {
  MapPin, Calendar, Gauge, Fuel, Settings2, User, ChevronLeft,
  Phone, MessageCircle, CheckCircle
} from 'lucide-react';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function CarDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const car = mockCars.find((c) => c.id === id);

  if (!car) notFound();

  return <CarDetailClient car={car} locale={locale} />;
}

function CarDetailClient({ car, locale }: { car: (typeof mockCars)[0]; locale: string }) {
  const t = useTranslations('carDetail');
  const common = useTranslations('common');

  const fuelLabel: Record<string, string> = {
    petrol: common('petrol'),
    diesel: common('diesel'),
    electric: common('electric'),
    hybrid: common('hybrid'),
  };

  const specs = [
    { icon: Calendar, label: t('year'), value: car.year },
    { icon: Gauge, label: t('mileage'), value: `${car.mileage.toLocaleString()} ${common('km')}` },
    { icon: Fuel, label: t('fuel'), value: fuelLabel[car.fuelType] },
    { icon: Settings2, label: t('transmission'), value: car.transmission === 'automatic' ? common('automatic') : common('manual') },
    { icon: MapPin, label: t('location'), value: car.location },
    { icon: User, label: t('provider'), value: car.providerName },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href={`/${locale}/cars`}
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          {common('back')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden h-80 lg:h-96">
              <Image
                src={car.images[0]}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover"
                priority
              />
              {/* Status badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                  car.status === 'available'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  <CheckCircle className="w-3 h-3" />
                  {car.status === 'available' ? t('available') : t('rented')}
                </span>
              </div>
            </div>
            {car.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {car.images.slice(1).map((img, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden h-24">
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-yellow-500 text-sm font-semibold uppercase tracking-wider mb-1">{car.brand}</p>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{car.model}</h1>
            <p className="text-white/40 text-sm mb-8">{car.year}</p>

            {/* Pricing */}
            <div className="flex flex-wrap gap-4 mb-8">
              {car.type !== 'rent' && (
                <div className="glass rounded-2xl px-6 py-4">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t('buyPrice')}</p>
                  <p className="text-white text-2xl font-bold">${car.price.toLocaleString()}</p>
                </div>
              )}
              {(car.type === 'rent' || car.type === 'both') && (
                <div className="glass rounded-2xl px-6 py-4 border border-yellow-500/20">
                  <p className="text-yellow-500/70 text-xs uppercase tracking-wider mb-1">{t('rentPrice')}</p>
                  <p className="text-yellow-400 text-2xl font-bold">
                    ${car.rentalPricePerDay}
                    <span className="text-white/30 text-sm font-normal">/{common('day')}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass rounded-xl p-3">
                  <Icon className="w-4 h-4 text-yellow-500/60 mb-1.5" />
                  <p className="text-white/40 text-xs mb-0.5">{label}</p>
                  <p className="text-white text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {(car.type === 'rent' || car.type === 'both') && (
                <button className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-yellow-500/20 transition-all flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t('requestRent')}
                </button>
              )}
              {(car.type === 'sale' || car.type === 'both') && (
                <button className="flex-1 py-3.5 rounded-xl glass border border-white/10 text-white font-semibold text-sm hover:border-yellow-500/30 transition-all flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {t('requestBuy')}
                </button>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">{t('description')}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{car.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return mockCars.map((car) => ({ id: car.id }));
}

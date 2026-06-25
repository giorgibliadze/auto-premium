import { useTranslations } from 'next-intl';
import HeroFuturistic from '@/components/ui/hero-futuristic';
import CarCard from '@/components/CarCard';
import SectionTitle from '@/components/SectionTitle';
import CTA from '@/components/CTA';
import { featuredCars } from '@/lib/mock-data';
import ServicesSection from './ServicesSection';

export default function HomePage() {
  return (
    <div className="bg-black">
      <HeroFuturistic />
      <FeaturedSection />
      <ServicesSection />
      <CTA />
    </div>
  );
}

function FeaturedSection() {
  const t = useTranslations('featured');

  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

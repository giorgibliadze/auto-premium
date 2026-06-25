import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/SectionTitle';
import { mockCars } from '@/lib/mock-data';
import CarsClient from './CarsClient';

export default function CarsPage() {
  const t = useTranslations('cars');

  return (
    <div className="min-h-screen bg-black pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} centered={false} />
        <CarsClient cars={mockCars} />
      </div>
    </div>
  );
}

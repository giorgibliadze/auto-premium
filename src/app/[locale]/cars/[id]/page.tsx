export const dynamic = 'force-static';
export const dynamicParams = false;

import { notFound } from 'next/navigation';
import { mockCars } from '@/lib/mock-data';
import CarDetailClient from '../CarDetailClient';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function CarDetailPage({ params }: Props) {
  const p = await params;
  const id = p?.id ? String(p.id) : '';
  const locale = p?.locale ? String(p.locale) : 'ka';

  if (!id) {
    notFound();
  }

  const car = mockCars.find((item) => String(item.id) === id);

  if (!car) {
    notFound();
  }

  return <CarDetailClient car={car} locale={locale} />;
}

export async function generateStaticParams() {
  const locales = ['ka', 'en', 'ru'];

  return mockCars.flatMap((car) =>
    locales.map((locale) => ({ locale, id: String(car.id) }))
  );
}

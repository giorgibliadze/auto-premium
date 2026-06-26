import { notFound } from 'next/navigation';
import { mockCars } from '@/lib/mock-data';
import CarDetailClient from '../CarDetailClient';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function CarDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const car = mockCars.find((c) => c.id === id);

  if (!car) {
    notFound();
  }

  return <CarDetailClient car={car} locale={locale} />;
}

export async function generateStaticParams() {
  return mockCars.map((car) => ({ id: car.id }));
}

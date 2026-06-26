import Link from 'next/link';

type Props = {
  params: { locale: string };
};

export default function NotFound({ params }: Props) {
  const { locale } = params;

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-yellow-500 uppercase tracking-wider mb-4">404</p>
        <h1 className="text-4xl font-bold text-white mb-4">Car not found</h1>
        <p className="text-white/60 mb-8">The car you are looking for does not exist in our demo inventory. Please go back to the cars list.</p>
        <Link
          href={`/${locale}/cars`}
          className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-black hover:bg-yellow-400 transition"
        >
          View available cars
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AutoPremium | პრემიუმ ავტო პლატფორმა',
  description: 'საქართველოს წამყვანი პლატფორმა პრემიუმ ავტომობილების ყიდვა, გაყიდვა და დაქირავებისთვის',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geistSans.variable} min-h-screen flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}

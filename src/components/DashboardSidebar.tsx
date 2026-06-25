'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Car, PlusCircle, User, Settings, LayoutDashboard } from 'lucide-react';

export default function DashboardSidebar() {
  const t = useTranslations('dashboard');
  const nav = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const links = [
    { href: `/${locale}/dashboard`, label: t('myCars'), icon: LayoutDashboard },
    { href: `/${locale}/dashboard/add-car`, label: t('addCar'), icon: PlusCircle },
    { href: `/${locale}/dashboard/profile`, label: t('profile'), icon: User },
    { href: `/${locale}/dashboard/settings`, label: t('settings'), icon: Settings },
  ];

  return (
    <aside className="w-60 shrink-0">
      <div className="glass rounded-2xl p-4 sticky top-24">
        <div className="flex items-center gap-3 px-3 py-3 mb-4 border-b border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-400 flex items-center justify-center text-black font-bold text-sm">
            P
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Provider</p>
            <p className="text-xs text-white/40">provider@email.com</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

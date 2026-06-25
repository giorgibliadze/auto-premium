import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import { Target, Heart, Award } from 'lucide-react';

const team = [
  { name: 'გიორგი ბლიაძე', role: 'CEO & Founder', initial: 'გ' },
  { name: 'ნინო ქავთარაძე', role: 'Head of Sales', initial: 'ნ' },
  { name: 'დავით მამულაშვილი', role: 'Fleet Manager', initial: 'დ' },
  { name: 'სოფო ჩიქოვანი', role: 'Customer Success', initial: 'ს' },
];

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen bg-black pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        {/* Story & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="glass rounded-2xl p-8 border border-white/5">
            <Target className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">{t('story')}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{t('storyText')}</p>
          </div>
          <div className="glass rounded-2xl p-8 border border-yellow-500/10">
            <Heart className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">{t('mission')}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{t('missionText')}</p>
          </div>
        </div>

        {/* Team */}
        <SectionTitle title={t('team')} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={member.name} className="glass rounded-2xl p-6 border border-white/5 text-center hover:border-yellow-500/10 transition-colors">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-400 flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                {member.initial}
              </div>
              <p className="text-white font-semibold text-sm">{member.name}</p>
              <p className="text-white/40 text-xs mt-1">{member.role}</p>
              <Award className="w-4 h-4 text-yellow-500/40 mx-auto mt-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

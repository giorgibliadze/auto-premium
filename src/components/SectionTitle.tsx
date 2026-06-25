'use client';

import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({ title, subtitle, centered = true, light = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <p className="text-yellow-500 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
          {subtitle}
        </p>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${light ? 'text-gray-900' : 'text-white'}`}>
        {title}
      </h2>
      <div className={`mt-4 h-px w-16 bg-gradient-to-r from-yellow-600 to-yellow-400 ${centered ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}

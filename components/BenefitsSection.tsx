'use client';

import { motion } from 'framer-motion';
import {
  TrendingDown,
  Award,
  Truck,
  Users,
  Leaf,
  Sparkles
} from 'lucide-react';
import benefitsData from '@/data/benefits.json';

const icons = [
  TrendingDown,
  Award,
  Truck,
  Users,
  Leaf,
  Sparkles
];

// Subtle gradient accent per card (alternates green / golden)
const accentColors = [
  'from-emerald-500 to-green-600',
  'from-amber-400 to-yellow-500',
  'from-emerald-500 to-teal-600',
  'from-amber-400 to-orange-400',
  'from-emerald-600 to-emerald-700',
  'from-amber-500 to-amber-600',
];

const iconBgColors = [
  'bg-green-50',
  'bg-amber-50',
  'bg-teal-50',
  'bg-orange-50',
  'bg-emerald-50',
  'bg-yellow-50',
];

const iconColors = [
  'text-green-700',
  'text-amber-600',
  'text-teal-700',
  'text-orange-600',
  'text-emerald-700',
  'text-yellow-600',
];

export function BenefitsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-[#f9f6f0] via-white to-[#f3f8f4]">

      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-green-100/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-50/30 blur-3xl"
      />

      {/* Full-Width Banner */}
      <div className="w-full mb-14 lg:mb-16">
        <img
          src="/images/banners/Snacksbanner.png"
          alt="Why Choose Rasokart Foods"
          className="w-full h-auto object-cover block"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="text-center mb-14 lg:mb-16"
        >
          {/* Eyebrow */}
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-amber-600 mb-3">
            WHY RASOKART?
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
            Why Choose{' '}
            <span className="text-green-700">Rasokart Foods</span>{' '}
            Private Limited?
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Industry-leading quality and service for your business needs
          </p>

          {/* Decorative divider */}
          <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
            <div className="h-px w-12 bg-gray-200 rounded-full" />
            <div className="h-1.5 w-6 rounded-full bg-amber-400" />
            <div className="h-px w-12 bg-gray-200 rounded-full" />
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {benefitsData.benefits.map((benefit, index) => {
            const IconComponent = icons[index];
            const accentGradient = accentColors[index % accentColors.length];
            const iconBg = iconBgColors[index % iconBgColors.length];
            const iconColor = iconColors[index % iconColors.length];

            return (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* Top accent gradient line */}
                <div
                  className={`h-[3px] w-full bg-gradient-to-r ${accentGradient}`}
                  aria-hidden="true"
                />

                <div className="flex flex-col p-7 lg:p-8 flex-1">

                  {/* Icon Container */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-xl ${iconBg} mb-5 transition-transform duration-300 group-hover:scale-105`}
                  >
                    <IconComponent
                      size={28}
                      className={iconColor}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2.5 leading-snug">
                    {benefit.title}
                  </h3>

                  {/* Animated separator */}
                  <div
                    className={`h-[2px] w-8 rounded-full bg-gradient-to-r ${accentGradient} mb-3 transition-all duration-300 group-hover:w-16`}
                    aria-hidden="true"
                  />

                  {/* Description */}
                  <p className="text-sm sm:text-[15px] text-gray-500 leading-relaxed">
                    {benefit.description}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
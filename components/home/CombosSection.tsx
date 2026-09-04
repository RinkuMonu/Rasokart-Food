'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, Sparkles, ArrowRight, ShieldCheck, Flame, Gift } from 'lucide-react';

export function CombosSection() {
  const comboBanners = [
    {
      id: 'family-pack',
      title: 'Family Snack Pack',
      eyebrow: 'BEST VALUE',
      description: 'Handcrafted mix of classic Indian namkeens, potato chips, and savory mixtures curated for whole families.',
      badge: 'Popular Wholesale Bundle',
      gradient: 'from-amber-600 to-orange-700',
      icon: Gift,
      link: '/products',
      tag: 'Multi-Pack Deals',
    },
    {
      id: 'party-combo',
      title: 'Party Snack Combo',
      eyebrow: 'HIGH MARGIN',
      description: 'Crispy nachos, spicy wafers, and crunchy treats packaged in high-volume cartons for events and retail.',
      badge: 'Up to 45% MOQ Margin',
      gradient: 'from-emerald-700 to-teal-800',
      icon: Flame,
      link: '/products',
      tag: 'Event & Retail Special',
    },
    {
      id: 'bulk-saver',
      title: 'Bulk Saver Pack',
      eyebrow: 'MEGA SAVINGS',
      description: 'Wholesale tiered cartons featuring our most demanded snack brands with maximum quantity savings.',
      badge: 'Direct Distributor Pricing',
      gradient: 'from-slate-800 to-gray-900',
      icon: Package,
      link: '/products',
      tag: 'Highest Savings',
    },
  ];

  return (
    <section className="py-8 lg:py-10 bg-gradient-to-b from-gray-50 to-white overflow-hidden border-y border-gray-100">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
            BULK BUNDLE DEALS
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Combos & Value Packs
          </h2>
          <p className="mt-2 text-base text-gray-500 max-w-xl mx-auto">
            More snacks. More savings. Curated wholesale bundles designed for maximum profit and customer delight.
          </p>
        </div>

        {/* 3 Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {comboBanners.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 text-white shadow-lg transition-all duration-300"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} transition-transform duration-500 group-hover:scale-105`}
                />

                {/* Subtle Decorative Pattern */}
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                {/* Content Top */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
                      <Sparkles size={12} className="text-amber-300" />
                      {card.eyebrow}
                    </span>
                    <div className="h-10 w-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white">
                      <IconComponent size={22} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-white/80 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Content Bottom */}
                <div className="relative z-10 mt-8 pt-6 border-t border-white/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-white/70 block">
                        {card.tag}
                      </span>
                      <span className="text-sm font-bold text-amber-300">
                        {card.badge}
                      </span>
                    </div>

                    <Link
                      href={card.link}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-gray-900 shadow transition-all hover:bg-amber-300 hover:text-gray-950"
                    >
                      <span>Shop Now</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CombosSection;

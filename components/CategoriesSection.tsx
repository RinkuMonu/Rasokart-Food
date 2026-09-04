'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import categoriesData from '@/data/categories.json';
import { ArrowRight } from 'lucide-react';

export function CategoriesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35 },
    },
  };

  return (
    <section className="py-8 lg:py-10 bg-gradient-to-b from-white to-gray-50/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
              EXPLORE OUR RANGE
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-500">
              Explore our curated selection of wholesale chips, namkeens, wafers and premium snacks
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-green-700 hover:text-green-800 transition"
          >
            <span>View All Categories</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Category Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
        >
          {categoriesData.map((category) => {
            const slug = category.slug || category.id;
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <Link
                  href={`/products?category=${encodeURIComponent(slug)}`}
                  className="block h-full group"
                >
                  <div className="bg-white border border-gray-200/80 rounded-2xl p-5 text-center transition-all duration-300 hover:border-green-600 hover:shadow-lg h-full flex flex-col items-center justify-between">
                    {/* Category Icon / Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50/50 p-2.5 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:bg-green-50">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>

                    {/* Category Name */}
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-snug">
                        {category.name}
                      </h3>
                      <span className="text-[11px] font-medium text-gray-400 mt-1 inline-block group-hover:text-green-600 transition-colors">
                        Browse Wholesale →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default CategoriesSection;

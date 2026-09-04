'use client';

import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import productsData from '@/data/products.json';
import Link from 'next/link';

export function FeaturedProducts() {
  const featuredProducts = productsData.products.slice(0, 21);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <section className="py-8 lg:py-10 bg-gray-50">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Featured Products
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Premium wholesale snacks, chips, namkeen and food products
            at competitive bulk prices.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
            justify-items-center
          "
        >
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/products">
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                rounded-xl
                border-2
                border-green-600
                px-8
                py-3
                font-semibold
                text-green-600
                transition-all
                hover:bg-green-600
                hover:text-white
              "
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
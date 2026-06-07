'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="text-primary font-semibold text-sm uppercase tracking-wide">
              Premium Wholesale Groceries
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">
              Quality Ingredients for Your Professional Kitchen
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance"
          >
            Source premium fresh produce, meats, seafood, and specialty ingredients at wholesale prices. Trusted by restaurants, catering companies, and food services nationwide.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Browse Products
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors w-full sm:w-auto"
              >
                Get a Quote
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pt-8 text-center"
          >
            <div>
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">1000+</p>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">20%</p>
              <p className="text-sm text-muted-foreground">Avg. Savings</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

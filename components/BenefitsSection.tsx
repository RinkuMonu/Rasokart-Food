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
import { BENEFITS } from '@/lib/constants';

const icons = [
  TrendingDown,
  Award,
  Truck,
  Users,
  Leaf,
  Sparkles
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose Rasokart Foods Private Limited?
          </h2>
          <p className="text-lg text-muted-foreground">
            Industry-leading quality and service for your business needs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {BENEFITS.map((benefit, index) => {
            const IconComponent = icons[index];
            return (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

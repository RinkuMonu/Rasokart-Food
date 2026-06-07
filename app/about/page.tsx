'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      title: 'Quality First',
      description: 'We source only the finest ingredients from trusted suppliers worldwide.'
    },
    {
      title: 'Reliability',
      description: 'Consistent delivery and support your business can depend on.'
    },
    {
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices and responsible sourcing.'
    },
    {
      title: 'Partnership',
      description: 'We see ourselves as partners in your culinary success.'
    }
  ];

  const milestones = [
    { year: '2015', event: 'Rasokart Foods Private Limited Founded' },
    { year: '2017', event: '500+ Restaurant Partnerships' },
    { year: '2019', event: 'Expanded to 3 Distribution Centers' },
    { year: '2021', event: 'Launch of Premium Specialty Line' },
    { year: '2023', event: 'Nationwide Sustainability Initiative' },
    { year: '2024', event: '1000+ Satisfied Clients' }
  ];

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
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                About Rasokart Foods Private Limited
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Serving the hospitality industry with premium wholesale groceries since 2015.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Rasokart Foods Private Limited was founded with a simple mission: to connect professional kitchens with the finest premium ingredients at wholesale prices. We believed that quality shouldn't be expensive when you buy smart.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  What started as a small local operation has grown into a trusted supplier for restaurants, catering companies, and food services across the nation. Our success is built on the success of our clients.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we're proud to serve over 1,000 businesses, providing them with consistent quality, reliable delivery, and outstanding customer service.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-12 flex items-center justify-center h-96"
              >
                <div className="text-center">
                  <p className="text-5xl font-bold text-primary mb-4">1,000+</p>
                  <p className="text-lg text-foreground">Happy Clients Nationwide</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <CheckCircle2 className="text-primary mb-4" size={28} />
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground">
                A timeline of growth and achievements
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {milestones.map((milestone) => (
                <motion.div
                  key={milestone.year}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <p className="text-accent font-bold text-lg mb-2">
                    {milestone.year}
                  </p>
                  <p className="text-foreground font-semibold">
                    {milestone.event}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">
                Ready to Join Our Community?
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Experience the Rasokart Foods Private Limited difference. Browse our products or get in touch for a personalized quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/products" className="px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Browse Products
                </a>
                <a href="/contact" className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Rocket, Users } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { title: 'Quality First', description: 'We source only the finest ingredients from trusted suppliers worldwide.' },
    { title: 'Reliability', description: 'Consistent delivery and support your business can depend on.' },
    { title: 'Sustainability', description: 'Committed to eco-friendly practices and responsible sourcing.' },
    { title: 'Partnership', description: 'We see ourselves as partners in your culinary success.' }
  ];

  const milestones = [
    { year: '2015', event: 'Founded Rasokart Foods' },
    { year: '2017', event: '500+ Restaurant Partnerships' },
    { year: '2019', event: '3 Distribution Centers' },
    { year: '2021', event: 'Premium Product Line Launch' },
    { year: '2023', event: 'Nationwide Expansion' },
    { year: '2024', event: '1000+ Happy Clients' }
  ];

  return (
    <>
      <Navigation />

      <main className="bg-white">

        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center space-y-6">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold"
            >
              About <span className="text-orange-600">Rasokart Foods</span>
            </motion.h1>

            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Premium wholesale grocery supplier helping restaurants grow with quality ingredients since 2015.
            </p>

            <div className="flex justify-center gap-6 pt-6">

              <div className="bg-white shadow rounded-xl px-6 py-4">
                <p className="text-2xl font-bold text-orange-600">1000+</p>
                <p className="text-sm text-gray-500">Clients</p>
              </div>

              <div className="bg-white shadow rounded-xl px-6 py-4">
                <p className="text-2xl font-bold text-orange-600">10K+</p>
                <p className="text-sm text-gray-500">Products Delivered</p>
              </div>

              <div className="bg-white shadow rounded-xl px-6 py-4">
                <p className="text-2xl font-bold text-orange-600">99%</p>
                <p className="text-sm text-gray-500">Satisfaction</p>
              </div>

            </div>
          </div>
        </section>

        {/* STORY */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Our Story</h2>

              <p className="text-gray-600 leading-relaxed">
                Rasokart Foods started with a simple mission — make premium ingredients affordable for every professional kitchen.
              </p>

              <p className="text-gray-600 leading-relaxed">
                From a small local supplier to a nationwide network, we’ve grown by focusing on trust, quality, and consistency.
              </p>

              <div className="flex gap-3 pt-4">
                <Sparkles className="text-orange-600" />
                <span className="text-sm text-gray-600">Premium Quality Focused</span>
              </div>

              <div className="flex gap-3">
                <Rocket className="text-orange-600" />
                <span className="text-sm text-gray-600">Fast Growing Network</span>
              </div>

              <div className="flex gap-3">
                <Users className="text-orange-600" />
                <span className="text-sm text-gray-600">Trusted by 1000+ Businesses</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-10 text-center shadow">
              <h3 className="text-5xl font-bold text-orange-600">10+</h3>
              <p className="text-gray-600 mt-2">Years of Experience</p>
            </div>

          </div>
        </section>

        {/* VALUES */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center mb-10">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="text-gray-600">What drives us every day</p>
          </div>

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6">

            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <CheckCircle2 className="text-orange-600 mb-3" />
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.description}</p>
              </div>
            ))}

          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 text-center mb-10">
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <p className="text-gray-600">Milestones that define us</p>
          </div>

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">

            {milestones.map((m) => (
              <div
                key={m.year}
                className="border rounded-xl p-6 bg-white hover:shadow-md transition"
              >
                <p className="text-orange-600 font-bold text-lg">{m.year}</p>
                <p className="text-gray-700 mt-2">{m.event}</p>
              </div>
            ))}

          </div>
        </section>

        {/* CTA */}
        <section className="bg-orange-600 text-white py-16 text-center">

          <h2 className="text-3xl font-bold">
            Let’s Grow Together
          </h2>

          <p className="mt-3 opacity-90">
            Join hundreds of businesses already working with us
          </p>

          <div className="mt-6 flex justify-center gap-4">

            <a
              href="/products"
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold"
            >
              Browse Products
            </a>

            <a
              href="/contact"
              className="border border-white px-6 py-3 rounded-lg"
            >
              Contact Us
            </a>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
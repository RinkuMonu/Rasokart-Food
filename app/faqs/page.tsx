'use client';

import { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ShoppingBag,
  CreditCard,
  Truck,
  RefreshCcw,
} from 'lucide-react';

const faqSections = [
  {
    title: 'Orders & Products',
    icon: ShoppingBag,
    faqs: [
      {
        q: 'What is the minimum order quantity (MOQ)?',
        a: 'MOQ varies by product category and is displayed on the product page. Wholesale pricing may change based on order quantity.',
      },
      {
        q: 'Can I place bulk orders?',
        a: 'Yes. Our platform is designed specifically for bulk and wholesale purchases.',
      },
      {
        q: 'How do I know if a product is in stock?',
        a: 'Stock availability is displayed on product pages and updated regularly.',
      },
      {
        q: 'Can I modify my order after placing it?',
        a: 'Order modifications are possible before processing begins. Please contact support immediately.',
      },
    ],
  },
  {
    title: 'Payments & Billing',
    icon: CreditCard,
    faqs: [
      {
        q: 'Which payment methods are accepted?',
        a: 'We accept UPI, Net Banking, Credit Cards, Debit Cards and approved business payment methods.',
      },
      {
        q: 'Do you provide GST invoices?',
        a: 'Yes. GST invoices are provided for all eligible business purchases.',
      },
      {
        q: 'Are wholesale discounts available?',
        a: 'Yes. Additional discounts may apply depending on order volume and product category.',
      },
      {
        q: 'Can businesses receive credit terms?',
        a: 'Approved business customers may be eligible for credit facilities subject to verification.',
      },
    ],
  },
  {
    title: 'Shipping & Delivery',
    icon: Truck,
    faqs: [
      {
        q: 'How long does delivery take?',
        a: 'Most orders are delivered within 2-7 business days depending on location.',
      },
      {
        q: 'Do you deliver across India?',
        a: 'Yes. We serve customers across multiple regions in India.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes. Tracking details are shared once your order is dispatched.',
      },
      {
        q: 'What happens if delivery fails?',
        a: 'Our logistics team will contact you to arrange re-delivery if possible.',
      },
    ],
  },
  {
    title: 'Returns & Support',
    icon: RefreshCcw,
    faqs: [
      {
        q: 'What if I receive damaged products?',
        a: 'Please report damaged items within 48 hours of delivery with supporting images.',
      },
      {
        q: 'Can I request a replacement?',
        a: 'Eligible products may qualify for replacement after verification.',
      },
      {
        q: 'How do I contact support?',
        a: 'You can reach our support team through phone, email or the contact page.',
      },
      {
        q: 'How long do refunds take?',
        a: 'Refund timelines depend on the payment method and banking partner.',
      },
    ],
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  let counter = 0;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24">

          <div className="max-w-4xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
              <HelpCircle size={18} />
              Help Center
            </div>

            <h1 className="mb-6 text-5xl font-bold">
              Frequently Asked Questions
            </h1>

            <p className="text-lg leading-8 text-orange-100">
              Find answers to common questions about wholesale
              ordering, payments, shipping, returns and account
              management at Rasokart Foods Private Limited.
            </p>

          </div>

        </div>
      </section>

      {/* Search Box */}
      <section className="-mt-10 relative z-10">
        <div className="mx-auto max-w-4xl px-4">

          <div className="rounded-3xl bg-white p-4 shadow-xl">

            <div className="flex items-center gap-3">
              <Search className="text-gray-400" />

              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full border-0 outline-none"
              />
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Content */}
      <section className="mx-auto max-w-6xl px-4 py-16">

        {faqSections.map((section) => {
          const Icon = section.icon;

          return (
            <div key={section.title} className="mb-10">

              <div className="mb-6 flex items-center gap-3">

                <div className="rounded-2xl bg-orange-100 p-3">
                  <Icon
                    size={24}
                    className="text-orange-600"
                  />
                </div>

                <h2 className="text-3xl font-bold">
                  {section.title}
                </h2>

              </div>

              <div className="space-y-4">

                {section.faqs.map((faq) => {
                  const currentIndex = counter++;

                  return (
                    <div
                      key={faq.q}
                      className="overflow-hidden rounded-3xl bg-white shadow-sm"
                    >
                      <button
                        onClick={() =>
                          setOpen(
                            open === currentIndex
                              ? null
                              : currentIndex
                          )
                        }
                        className="flex w-full items-center justify-between p-6 text-left"
                      >
                        <span className="font-semibold text-gray-900">
                          {faq.q}
                        </span>

                        <ChevronDown
                          className={`transition ${
                            open === currentIndex
                              ? 'rotate-180'
                              : ''
                          }`}
                        />
                      </button>

                      {open === currentIndex && (
                        <div className="border-t px-6 py-5 text-gray-600 leading-7">
                          {faq.a}
                        </div>
                      )}

                    </div>
                  );
                })}

              </div>

            </div>
          );
        })}

      </section>

      {/* Contact CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4">

          <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-10 text-center text-white">

            <h3 className="mb-4 text-3xl font-bold">
              Still Need Help?
            </h3>

            <p className="mb-6 text-orange-100">
              Our team is here to assist with wholesale orders,
              product inquiries and business partnerships.
            </p>

            <a
              href="/contact"
              className="inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-orange-600"
            >
              Contact Support
            </a>

          </div>

        </div>
      </section>

    </div>
  );
}
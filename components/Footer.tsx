'use client';

import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="mb-8 grid gap-8 md:grid-cols-5">

          {/* Brand */}
          <div>
            <h3 className="mb-4 text-lg font-bold">
              Rasokart Foods Private Limited
            </h3>

            <p className="text-sm opacity-90">
              Premium wholesale groceries for
              restaurants, catering businesses,
              hotels, cafes and professional kitchens
              across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">
              Quick Links
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition hover:opacity-80"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="transition hover:opacity-80"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:opacity-80"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:opacity-80"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold">
              Legal
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="transition hover:opacity-80"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition hover:opacity-80"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/faqs"
                  className="transition hover:opacity-80"
                >
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  href="/security"
                  className="transition hover:opacity-80"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          {/* <div>
            <h4 className="mb-4 font-semibold">
              Categories
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=produce"
                  className="transition hover:opacity-80"
                >
                  Produce
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=meat"
                  className="transition hover:opacity-80"
                >
                  Meat & Poultry
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=seafood"
                  className="transition hover:opacity-80"
                >
                  Seafood
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=dairy"
                  className="transition hover:opacity-80"
                >
                  Dairy & Cheese
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold">
              Contact Us
            </h4>

            <div className="space-y-3 text-sm">

              <div className="flex items-center gap-2">
                <Phone size={16} />

                <a
                  href="tel:+919352002046"
                  className="transition hover:opacity-80"
                >
                  +91 93520 02046
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />

                <a
                  href="mailto:rasocartfood@gmail.com"
                  className="transition hover:opacity-80"
                >
                  rasocartfood@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2">
                <MapPin
                  size={16}
                  className="mt-1 shrink-0"
                />

                <p>
                  74, Udyog Vihar,
                  <br />
                  Near Kailash Misthan Bhandar,
                  <br />
                  Vishwakarma Industrial Area,
                  <br />
                  Jaipur - 302013,
                  Rajasthan, India
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6">

          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">

            <p>
              © 2025 Rasokart Foods Private Limited.
              All rights reserved.
            </p>

            <div className="flex items-center gap-5">

              <Link
                href="/privacy"
                className="transition hover:opacity-80"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="transition hover:opacity-80"
              >
                Terms
              </Link>

              <Link
                href="/faqs"
                className="transition hover:opacity-80"
              >
                FAQs
              </Link>

              <Link
                href="/security"
                className="transition hover:opacity-80"
              >
                Security
              </Link>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}
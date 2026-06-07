import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">Rasokart Foods Private Limited</h3>
            <p className="text-sm opacity-90">
              Premium wholesale groceries for professional kitchens and catering businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:opacity-80 transition">Home</Link></li>
              <li><Link href="/products" className="hover:opacity-80 transition">Products</Link></li>
              <li><Link href="/about" className="hover:opacity-80 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:opacity-80 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=produce" className="hover:opacity-80 transition">Produce</Link></li>
              <li><Link href="/products?category=meat" className="hover:opacity-80 transition">Meat & Poultry</Link></li>
              <li><Link href="/products?category=seafood" className="hover:opacity-80 transition">Seafood</Link></li>
              <li><Link href="/products?category=dairy" className="hover:opacity-80 transition">Dairy & Cheese</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+91 93520 02046" className="hover:opacity-80 transition">
                  +91 93520 02046
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:rasocartfood@gmail.com" className="hover:opacity-80 transition">
                 rasocartfood@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <p>74, Udhyog Vihar, Near Kailash Misthan Bhandar , Vishwakarma , Industrial Area , Jaipur 302013, Rajasthan<br /></p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm">
          <p>&copy; 2024 Rasokart Foods Private Limited Wholesale. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

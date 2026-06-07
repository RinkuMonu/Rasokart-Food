'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart-context';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
           <img src="/mainlogo.png" alt="Rasokart Foods Private Limited Logo" className="h-16 w-auto" />
            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/cart" className="relative">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ShoppingCart size={20} className="text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/cart" className="block" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-muted text-foreground px-6 py-2 rounded-lg hover:bg-muted/80 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Cart ({cartCount})
              </button>
            </Link>
            <button className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Get Quote
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import categoriesData from '@/data/categories.json';

// Static nav items that sit before and after the dynamic categories
const STATIC_START = [
  { label: 'Home', href: '/' },
  { label: 'All Snacks', href: '/products' },
];

const STATIC_END = [
  { label: 'Best Sellers', href: '/products' },
  { label: 'Deals', href: '/products' },
];

// Build the dynamic category links with exact category slugs
const CATEGORY_LINKS = categoriesData.map((cat) => ({
  label: cat.name,            // "Chips & Crisps" — exact, never altered
  slug: cat.slug ?? cat.id,   // e.g. "chips-crisps"
  href: `/products?category=${encodeURIComponent(cat.slug ?? cat.id)}`,
}));

/** Inner component — must live inside Suspense because useSearchParams is used */
function CategoryNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams?.get('category') ?? null;

  const isActive = (href: string, slug?: string): boolean => {
    if (href === '/') return pathname === '/';
    if (pathname !== '/products') return false;
    if (!slug && !activeCategory) return href === '/products' && !activeCategory;
    if (slug) return activeCategory === slug;
    return false;
  };

  return (
    <nav
      aria-label="Product categories"
      className="relative w-full bg-white border-t border-gray-100"
    >
      {/* subtle bottom separator + soft shadow */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Scrollable row — no page-level overflow */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <ul
          className="flex items-center gap-0 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Home */}
          {STATIC_START.map((item) => {
            const active = item.href === '/'
              ? pathname === '/'
              : pathname === '/products' && !activeCategory;
            return (
              <li key={item.label} className="flex-shrink-0">
                <Link
                  href={item.href}
                  className={`
                    relative inline-flex items-center px-4 py-3.5 text-sm font-medium
                    whitespace-nowrap transition-colors duration-150
                    ${active
                      ? 'text-green-700'
                      : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  {item.label}
                  {/* Golden underline indicator */}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-amber-400" />
                  )}
                </Link>
              </li>
            );
          })}

          {/* Divider pip */}
          <li aria-hidden="true" className="flex-shrink-0 w-px h-4 bg-gray-200 mx-1" />

          {/* Dynamic Category Links */}
          {CATEGORY_LINKS.map((item) => {
            const active = pathname === '/products' && activeCategory === item.slug;
            return (
              <li key={item.slug} className="flex-shrink-0">
                <Link
                  href={item.href}
                  className={`
                    relative inline-flex items-center px-4 py-3.5 text-sm font-medium
                    whitespace-nowrap transition-colors duration-150
                    ${active
                      ? 'text-green-700 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-amber-400" />
                  )}
                </Link>
              </li>
            );
          })}

          {/* Divider pip */}
          <li aria-hidden="true" className="flex-shrink-0 w-px h-4 bg-gray-200 mx-1" />

          {/* Static end items */}
          {STATIC_END.map((item) => (
            <li key={item.label} className="flex-shrink-0">
              <Link
                href={item.href}
                className="relative inline-flex items-center px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-600 hover:text-gray-900 transition-colors duration-150"
              >
                {item.label === 'Deals' ? (
                  <>
                    <span className="mr-1.5 inline-flex items-center rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white leading-none">
                      HOT
                    </span>
                    {item.label}
                  </>
                ) : (
                  item.label
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/** Public export — wrapped in Suspense to allow useSearchParams */
export function CategoryNavBar() {
  return (
    <Suspense fallback={<div className="h-[45px] bg-white border-t border-gray-100" />}>
      <CategoryNavInner />
    </Suspense>
  );
}

export default CategoryNavBar;

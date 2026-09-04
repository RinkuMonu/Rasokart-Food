'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

interface ProductSectionCarouselProps {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  products: any[];
  viewAllHref?: string;
  viewAllText?: string;
  bgClassName?: string;
}

export function ProductSectionCarousel({
  eyebrow,
  heading,
  subtitle,
  products,
  viewAllHref = '/products',
  viewAllText = 'View All',
  bgClassName = 'bg-white',
}: ProductSectionCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className={`py-8 lg:py-10 overflow-hidden ${bgClassName}`}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            {eyebrow && (
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
                {eyebrow}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              {heading}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm sm:text-base text-gray-500">
                {subtitle}
              </p>
            )}
          </div>

          {/* Controls & View All Button */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Carousel Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                  canScrollLeft
                    ? 'border-gray-300 bg-white text-gray-800 shadow-sm hover:border-green-600 hover:bg-green-50 hover:text-green-700'
                    : 'border-gray-200 bg-gray-100/70 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                  canScrollRight
                    ? 'border-gray-300 bg-white text-gray-800 shadow-sm hover:border-green-600 hover:bg-green-50 hover:text-green-700'
                    : 'border-gray-200 bg-gray-100/70 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* View All Button */}
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-600 hover:bg-green-600 hover:text-white"
              >
                <span>{viewAllText}</span>
                <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="flex-shrink-0 snap-start w-[240px] sm:w-[260px] md:w-[270px] lg:w-[calc(25%-18px)]"
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSectionCarousel;

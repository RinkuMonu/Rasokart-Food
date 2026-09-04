'use client';

import { useState, useMemo, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const products = productsData.products;

  // Generate unique categories dynamically from actual product data
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        products
          .map((p) => p.category?.trim())
          .filter((cat): cat is string => Boolean(cat))
      )
    ).sort();
    return unique;
  }, [products]);

  // Sync category from URL query parameters (slugs) if present or when history changes
  useEffect(() => {
    const syncFromUrl = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('category');
        if (catParam) {
          const catInfo = categoriesData.find(
            (c) =>
              c.id === catParam ||
              c.slug === catParam ||
              c.name.toLowerCase() === catParam.toLowerCase()
          );
          const matched =
            catInfo?.name ||
            categories.find(
              (c) =>
                c.toLowerCase() === catParam.toLowerCase() ||
                c.toLowerCase().replace(/[^a-z0-9]+/g, '-') === catParam.toLowerCase()
            );
          if (matched) {
            setSelectedCategory(matched);
          } else {
            setSelectedCategory(catParam);
          }
        } else {
          setSelectedCategory('');
        }
      }
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [categories]);

  // Update selected category and update URL slug in browser address bar
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (categoryName) {
        const catInfo = categoriesData.find(
          (c) => c.name.trim().toLowerCase() === categoryName.trim().toLowerCase()
        );
        const slug =
          catInfo?.slug ||
          catInfo?.id ||
          categoryName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        url.searchParams.set('category', slug);
      } else {
        url.searchParams.delete('category');
      }
      window.history.pushState(null, '', url.toString());
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    handleCategorySelect('');
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.productName?.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.subCategory?.toLowerCase().includes(query)
      );
    }

    // Filter by category (safely handling whitespace and capitalization)
    if (selectedCategory.trim()) {
      const targetCategory = selectedCategory.trim().toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.category?.trim().toLowerCase() === targetCategory
      );
    }

    // Sort
    const sorted = [...filtered];
    if (sortBy === 'price-low') {
      sorted.sort(
        (a, b) =>
          (a.bulkPricing?.[0]?.pricePerUnit ?? a.sellingPrice) -
          (b.bulkPricing?.[0]?.pricePerUnit ?? b.sellingPrice)
      );
    } else if (sortBy === 'price-high') {
      sorted.sort(
        (a, b) =>
          (b.bulkPricing?.[0]?.pricePerUnit ?? b.sellingPrice) -
          (a.bulkPricing?.[0]?.pricePerUnit ?? a.sellingPrice)
      );
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    return sorted;
  }, [searchQuery, selectedCategory, sortBy, products]);

  return (
    <>
      <Navigation />
      <main>
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                Our Products
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Browse our complete selection of premium wholesale groceries. All products available for bulk order with competitive pricing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-1 space-y-6"
              >
                {/* Search */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Search Products
                  </label>
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-3 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Category
                  </label>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => handleCategorySelect('')}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                        selectedCategory === ''
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <img
                        src="/images/categories/all-products.svg"
                        alt="All Products"
                        className="w-7 h-7 rounded-md object-contain bg-muted/40 p-0.5 flex-shrink-0"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                      <span className="truncate">All Products</span>
                    </button>
                    {categories.map((category) => {
                      const catInfo = categoriesData.find(
                        (c) => c.name.trim().toLowerCase() === category.trim().toLowerCase()
                      );
                      const imageSrc =
                        catInfo?.image ||
                        `/images/categories/${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.svg`;

                      const isSelected =
                        selectedCategory.trim().toLowerCase() === category.trim().toLowerCase();

                      return (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-foreground hover:bg-muted'
                          }`}
                        >
                          <img
                            src={imageSrc}
                            alt={category}
                            className="w-7 h-7 rounded-md object-contain bg-muted/40 p-0.5 flex-shrink-0"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                          <span className="truncate">{category}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sort */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </motion.div>

              {/* Products Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-3"
              >
                {/* Results Count */}
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Showing {filteredAndSortedProducts.length} products
                  </p>
                </div>

                {/* Products */}
                {filteredAndSortedProducts.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredAndSortedProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <p className="text-lg text-muted-foreground">
                      No products found matching your search.
                    </p>
                    <button
                      onClick={handleClearFilters}
                      className="mt-4 px-6 py-2 text-primary hover:underline"
                    >
                      Clear filters
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import productsData from '@/data/products.json';
import { CATEGORIES } from '@/lib/constants';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const products = productsData.products;

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort
    const sorted = [...filtered];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.bulkPrice - b.bulkPrice);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.bulkPrice - a.bulkPrice);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
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
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === ''
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      All Products
                    </button>
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded transition ${
                          selectedCategory === category.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
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
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('');
                      }}
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

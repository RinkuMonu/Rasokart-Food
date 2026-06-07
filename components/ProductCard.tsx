'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    bulkPrice: number;
    image: string;
    rating: number;
    inStock: boolean;
    unit: string;
  };
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const savings = Math.round(
    ((product.price - product.bulkPrice) / product.price) * 100
  );
console.log(product.image);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">

          {/* Product Image */}
          <div className="relative h-48 overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = '/products/placeholder.jpg';
              }}
            />

            {/* Stock Badge */}
            {!product.inStock && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                Out of Stock
              </div>
            )}

            {/* Savings Badge */}
            {savings > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold"
              >
                Save {savings}%
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition mb-2">
              {product.name}
            </h3>

            <p className="text-xs text-muted-foreground mb-3">
              {product.unit}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>

              <span className="text-xs text-muted-foreground">
                ({product.rating})
              </span>
            </div>

            {/* Pricing */}
            <div className="space-y-1 mb-4">
              <p className="text-xs text-muted-foreground line-through">
                ₹{product.price.toLocaleString()}
              </p>

              <p className="text-lg font-bold text-primary">
                ₹{product.bulkPrice.toLocaleString()}
              </p>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!product.inStock}
              className="w-full mt-auto bg-primary text-primary-foreground py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              View Details
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
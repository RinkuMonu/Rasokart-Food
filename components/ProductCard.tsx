'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/hooks/useWishlist';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: any;
  index?: number;
}

export function ProductCard({
  product,
  index = 0,
}: ProductCardProps) {
  const image =
    product.images?.[0] ||
    '/products/placeholder.jpg';

  const bulkQty =
    product.bulkPricing?.[0]?.minQty || 1;

  const unitPrice =
    product.bulkPricing?.[0]?.pricePerUnit ||
    product.sellingPrice;

  const totalPrice = bulkQty * unitPrice;
  const totalMrp = product.mrp * bulkQty;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.productName,
      price: product.mrp,
      bulkPrice: unitPrice,
      quantity: bulkQty,
      unit: product.unit || "packet",
      category: product.category || "",
      image: image,
    });

    toast.success(
      `${product.productName} added to cart`,
      {
        icon: "🛒",
      }
    );
  };

  const handleToggleWishlist = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const rating = product.rating || 4.5;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.04, 0.3),
      }}
      className="h-full w-full max-w-[280px]"
    >
      <Link
        href={`/products/${product.slug}`}
        className="block h-full group"
      >
        <div className="relative mx-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-200">

          {/* Top Badges & Product Image */}
          <div className="relative bg-gradient-to-b from-gray-50/80 to-white p-4 pb-2 flex items-center justify-center">

            {/* Discount Badge */}
            {product.discountPercentage > 0 && (
              <div className="absolute left-3 top-3 z-10 rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
                {product.discountPercentage}% OFF
              </div>
            )}

            {/* Wishlist Heart Button */}
            <button
              type="button"
              onClick={handleToggleWishlist}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur-sm transition-all hover:scale-110 hover:bg-white border border-gray-100"
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={16}
                className={`transition-colors ${
                  inWishlist
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            </button>

            <img
              src={image}
              alt={product.productName}
              className="h-40 w-40 object-contain transition-transform duration-300 group-hover:scale-[1.04]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>

          {/* Content Area */}
          <div className="flex flex-1 flex-col p-4 pt-2">

            {/* Brand & Category */}
            <div className="flex items-center justify-between gap-1 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              <span className="truncate">{product.brand || 'Rasokart'}</span>
              <span className="text-gray-300">•</span>
              <span className="truncate text-green-700 font-semibold">{product.category || 'Snacks'}</span>
            </div>

            {/* Product Name */}
            <h3 className="mt-1 line-clamp-2 min-h-[44px] text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
              {product.productName}
            </h3>

            {/* Weight & Rating */}
            <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
              <span>{product.weight}</span>
              <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-amber-700 font-semibold text-[11px]">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
            </div>

            {/* MOQ Tag */}
            <div className="mt-2.5">
              <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-100">
                MOQ: {bulkQty.toLocaleString('en-IN')} {product.unit || 'packet'}
                {bulkQty > 1 ? 's' : ''}
              </span>
            </div>

            {/* Pricing Box */}
            <div className="mt-3 rounded-xl bg-gray-50/90 p-3 border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  Wholesale Rate
                </span>
                <span className="text-xs font-bold text-green-700">
                  ₹{unitPrice}/{product.unit || 'unit'}
                </span>
              </div>

              <div className="mt-1.5 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">Total Order</span>
                  <span className="text-lg font-extrabold text-gray-900 leading-none">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                {totalMrp > totalPrice && (
                  <div className="text-right">
                    <span className="text-xs text-gray-400 line-through block">
                      ₹{totalMrp.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1 rounded">
                      Save ₹{(totalMrp - totalPrice).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow"
            >
              <ShoppingCart size={15} />
              <span>Add MOQ Order</span>
            </button>

          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;
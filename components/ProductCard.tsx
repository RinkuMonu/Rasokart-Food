'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import toast from "react-hot-toast";

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
    `${product.productName} added successfully`,
    {
      icon: "🛒",
    }
  );
};
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
        delay: index * 0.03,
      }}
      className="h-full"
    >
     <Link
  href={`/products/${product.slug}`}
  className="block h-full"
>
  <div className="group mx-auto flex h-full w-full max-w-[260px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    {/* Product Image */}
    <div className="relative bg-gradient-to-b from-gray-50 to-white p-5">

      {product.discountPercentage > 0 && (
        <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold text-white shadow">
          {product.discountPercentage}% OFF
        </div>
      )}

      <img
        src={image}
        alt={product.productName}
        className="mx-auto h-36 w-36 object-contain transition duration-300 group-hover:scale-105"
      />
    </div>

    {/* Content */}
    <div className="flex flex-1 flex-col p-4">

      {/* Brand */}
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {product.brand}
      </p>

      {/* Product Name */}
      <h3 className="mt-1 line-clamp-2 min-h-[48px] text-base font-semibold text-gray-900">
        {product.productName}
      </h3>

      {/* Weight */}
      <p className="mt-1 text-sm text-gray-500">
        {product.weight}
      </p>

      {/* MOQ */}
      <div className="mt-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          MOQ: {bulkQty.toLocaleString('en-IN')} {product.unit}
          {bulkQty > 1 ? 's' : ''}
        </span>
      </div>

      {/* Pricing */}
      <div className="mt-4 rounded-xl bg-gray-50 p-3">

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Wholesale Price
          </span>

          <span className="text-sm font-bold text-green-600">
            ₹{unitPrice}/{product.unit}
          </span>
        </div>

        <div className="mt-3">
          <p className="text-xs text-gray-500">
            Total Order Value
          </p>

          <p className="text-2xl font-extrabold text-gray-900">
            ₹{totalPrice.toLocaleString('en-IN')}
          </p>
        </div>

        {totalMrp > totalPrice && (
          <div className="mt-2 flex flex-wrap items-center gap-2">

            <span className="text-sm text-gray-400 line-through">
              ₹{totalMrp.toLocaleString('en-IN')}
            </span>

            <span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-600">
              Save ₹
              {(totalMrp - totalPrice).toLocaleString(
                'en-IN'
              )}
            </span>

          </div>
        )}

      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Button */}
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
      >
        Add MOQ Order
      </button>

    </div>
  </div>
</Link>
    </motion.div>
  );
}
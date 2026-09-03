"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import productsData from "@/data/products.json";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/hooks/useWishlist";
import { Star, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const found = productsData.products.find((p) => p.slug === id);

    setProduct(found || null);
  }, [id]);

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Product not found
      </div>
    );
  }

  const bulkQty = product.bulkPricing?.[0]?.minQty || 1;

  const unitPrice =
    product.bulkPricing?.[0]?.pricePerUnit || product.sellingPrice;

  const totalPrice = bulkQty * unitPrice;
  const totalMrp = product.mrp * bulkQty;

  const related = productsData.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.productName,

      image: product.images?.[0] || "/products/placeholder.jpg",

      // Original MRP Per Unit
      price: product.mrp,

      // Wholesale Per Unit Price
      bulkPrice: unitPrice,

      // MOQ Qty
      quantity: bulkQty,

      unit: product.unit || "packet",

      category: product.category || "",
    });

    toast.success(`${product.productName} added successfully`, {
      icon: "🛒",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP BAR */}
      <div className="bg-white p-4 shadow">
        <Link href="/products" className="text-blue-600 font-medium">
          ← Back to Products
        </Link>
      </div>

      {/* MAIN SECTION */}
      <div className="mx-auto grid max-w-6xl gap-10 p-6 md:grid-cols-2">
        {/* PRODUCT IMAGE */}
        <div className="flex items-center justify-center rounded-xl bg-white p-6 shadow">
          <img
            src={product.images?.[0]}
            alt={product.productName}
            className="h-80 object-contain"
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="space-y-5">
          <p className="text-sm text-gray-500">{product.brand}</p>

          <h1 className="text-3xl font-bold">{product.productName}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}

            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600">{product.description}</p>

          {/* WHOLESALE PRICE BOX */}
          <div className="space-y-4 rounded-xl bg-white p-5 shadow">
            <div>
              <p className="text-sm text-gray-500">Minimum Order Quantity</p>

              <p className="text-xl font-bold text-blue-600">
                {bulkQty.toLocaleString("en-IN")} {product.unit}
                {bulkQty > 1 ? "s" : ""}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Wholesale Price</p>

              <p className="text-2xl font-bold text-green-600">
                ₹{unitPrice} / {product.unit}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Order Value</p>

              <p className="text-4xl font-bold text-gray-900">
                ₹{totalPrice.toLocaleString("en-IN")}
              </p>
            </div>

            {totalMrp > totalPrice && (
              <>
                <p className="text-lg text-gray-400 line-through">
                  ₹{totalMrp.toLocaleString("en-IN")}
                </p>

                <p className="font-medium text-red-500">
                  Save ₹{(totalMrp - totalPrice).toLocaleString("en-IN")}
                </p>
              </>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-white transition hover:bg-green-700"
            >
              <ShoppingCart size={18} />
              Add MOQ To Cart
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="flex items-center justify-center rounded-lg border px-4 transition hover:bg-gray-50"
              aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={22}
                className={`transition-colors ${
                  isInWishlist(product.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500 hover:text-red-500"
                }`}
              />
            </button>
          </div>

          {/* HIGHLIGHTS */}
          <div className="rounded-xl bg-white p-4 shadow">
            <h3 className="mb-3 font-bold">Highlights</h3>

            <ul className="ml-5 list-disc space-y-1 text-sm text-gray-600">
              {product.highlights?.map((highlight: string, index: number) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          {/* SPECIFICATIONS */}
          <div className="rounded-xl bg-white p-4 shadow">
            <h3 className="mb-3 font-bold">Specifications</h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {Object.entries(product.specifications || {}).map(
                ([key, value]) => (
                  <div key={key}>
                    <p className="capitalize text-gray-500">{key}</p>

                    <p className="font-medium">{String(value)}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mx-auto mt-10 max-w-6xl px-6 pb-12">
        <h2 className="mb-6 text-2xl font-bold">Related Products</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {related.map((p) => {
            const relatedBulkQty = p.bulkPricing?.[0]?.minQty || 1;

            const relatedUnitPrice =
              p.bulkPricing?.[0]?.pricePerUnit || p.sellingPrice;

            const relatedTotalPrice = relatedBulkQty * relatedUnitPrice;

            return (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="rounded-xl bg-white p-4 shadow transition hover:shadow-lg"
              >
                <img
                  src={p.images?.[0]}
                  alt={p.productName}
                  className="mx-auto h-32 object-contain"
                />

                <h3 className="mt-3 line-clamp-2 text-sm font-semibold">
                  {p.productName}
                </h3>

                <p className="mt-1 text-xs text-blue-600">
                  MOQ: {relatedBulkQty.toLocaleString("en-IN")}
                </p>

                <p className="mt-2 font-bold text-green-600">
                  ₹{relatedTotalPrice.toLocaleString("en-IN")}
                </p>

                <p className="text-xs text-gray-500">
                  ₹{relatedUnitPrice} / unit
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

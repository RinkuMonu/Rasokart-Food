"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { Trash2, ShoppingCart as CartIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, removeFromCart, cartTotal, clearCart } = useCart();

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Shopping Quote
            </h1>
            <p className="text-muted-foreground">
              Review your wholesale order before requesting a quote
            </p>
          </motion.div>

          {items.length === 0 ? (
            // Empty Cart
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <CartIcon size={64} className="mx-auto text-muted mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Your quote is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Start adding products to build your wholesale order
              </p>
              <Link href="/products">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Continue Shopping
                </button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6 flex items-start justify-between"
                  >
                    {/* Product Info */}
                    <div className="flex gap-4">
                      <img
                        src={item.image || "/products/placeholder.jpg"}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-contain border"
                      />

                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground">
                          {item.name}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-2">
                          {item.category}
                        </p>

                        <div className="mb-4">
                          <p className="text-lg font-bold text-green-600">
                            ₹{item.bulkPrice.toLocaleString("en-IN")} /{" "}
                            {item.unit}
                          </p>

                          <p className="text-sm text-gray-400 line-through">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                          MOQ: {item.quantity.toLocaleString("en-IN")}{" "}
                          {item.unit}
                        </span>
                      </div>
                    </div>

                    {/* Total and Remove */}
                    <div className="text-right ml-6">
                      <p className="text-xl font-bold text-foreground mb-4">
                        ₹
                        {(item.bulkPrice * item.quantity).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-destructive/10 rounded text-destructive transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-6">
                  <h2 className="text-xl font-bold text-foreground">
                    Order Summary
                  </h2>

                  {/* Order Details */}
                  <div className="space-y-3 border-b border-border pb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-semibold text-foreground">
                        ₹{cartTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Items:</span>
                      <span className="font-semibold text-foreground">
                        {items.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="font-semibold text-foreground">
                        {items
                          .reduce((sum, item) => sum + item.quantity, 0)
                          .toLocaleString("en-IN")}{" "}
                        units units
                      </span>
                    </div>
                  </div>

                  {/* Savings */}
                  <div className="bg-accent/10 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Estimated Savings
                    </p>
                    <p className="text-2xl font-bold text-accent">
                      ₹
                      {items
                        .reduce((sum, item) => {
                          const savings =
                            (item.price - item.bulkPrice) * item.quantity;

                          return sum + savings;
                        }, 0)
                        .toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Buttons */}
                  <Link href="/checkout">
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                      Process To Pay
                    </button>
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full mt-3 border border-red-500 text-red-500 py-3 rounded-lg font-semibold hover:bg-red-50"
                  >
                    Clear Cart
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

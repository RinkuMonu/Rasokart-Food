'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import productsData from '@/data/products.json';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params: paramsPromise }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<typeof productsData.products[0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    paramsPromise.then((params) => {
      const productId = parseInt(params.id);
      const foundProduct = productsData.products.find((p) => p.id === productId);
      setProduct(foundProduct || null);
    });
  }, [paramsPromise]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        bulkPrice: product.bulkPrice,
        quantity,
        unit: product.unit,
        category: product.category,
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (!product) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link href="/products" className="text-primary hover:underline">
              Back to products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedProducts = productsData.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const savings = Math.round(((product.price - product.bulkPrice) / product.price) * 100);

  return (
    <>
      <Navigation />
      <main>
        {/* Breadcrumb */}
        <section className="py-4 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-primary">Products</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-muted rounded-lg overflow-hidden flex items-center justify-center h-96"
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-8xl">
                  {product.name.charAt(0)}
                </div>
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <p className="text-primary text-sm font-semibold uppercase mb-2">
                    {product.category}
                  </p>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    {product.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-4">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} • {Math.floor(Math.random() * 500) + 50} reviews
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-muted rounded-lg p-6 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Standard Price</p>
                    <p className="text-lg line-through text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Bulk Price</p>
                    <p className="text-3xl font-bold text-primary">
                      ${product.bulkPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-accent">
                      Save {savings}% when you buy in bulk
                    </p>
                  </div>
                </div>

                {/* Units */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Available Quantities</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-border rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground">Standard</p>
                      <p className="font-semibold text-foreground">{product.unit}</p>
                      <p className="text-sm text-primary">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="border border-primary bg-primary/5 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground">Bulk Discount</p>
                      <p className="font-semibold text-foreground">{product.bulkQuantity}</p>
                      <p className="text-sm text-primary font-bold">${product.bulkPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Quantity</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 border border-border rounded hover:bg-muted transition"
                    >
                      −
                    </button>
                    <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 border border-border rounded hover:bg-muted transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!product.inStock}
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    {addedToCart ? 'Added to Quote!' : (product.inStock ? 'Add to Quote' : 'Out of Stock')}
                  </motion.button>
                  <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition">
                    <Heart size={20} />
                  </button>
                </div>

                {/* Benefits */}
                <div className="space-y-3 border-t border-border pt-6">
                  <div className="flex items-start gap-3">
                    <Truck className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Free Delivery</p>
                      <p className="text-xs text-muted-foreground">On orders over $500</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Quality Guaranteed</p>
                      <p className="text-xs text-muted-foreground">100% satisfaction or your money back</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Easy Returns</p>
                      <p className="text-xs text-muted-foreground">30-day return policy</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-16 space-y-8"
              >
                <h2 className="text-3xl font-bold text-foreground">Related Products</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedProducts.map((relProduct) => (
                    <ProductCard key={relProduct.id} product={relProduct} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

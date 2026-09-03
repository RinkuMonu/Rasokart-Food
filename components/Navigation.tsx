'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  LogOut,
} from 'lucide-react';

import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/hooks/useWishlist';
import productsData from '@/data/products.json';

export function Navigation() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const [user, setUser] = useState<{ name?: string } | null>(null);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const loggedUser =
      localStorage.getItem('loggedInUser');

    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');

    setUser(null);

    window.location.reload();
  };

  const filteredProducts =
    productsData.products
      .filter((product) => {
        const search = query.toLowerCase();

        return (
          product.productName
            ?.toLowerCase()
            .includes(search) ||
          product.brand
            ?.toLowerCase()
            .includes(search) ||
          product.category
            ?.toLowerCase()
            .includes(search)
        );
      })
      .slice(0, 8);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto">

        <div className="h-20 flex items-center gap-4 px-4">

          {/* Logo */}
          <Link href="/">
            <img
              src="/mainlogo.png"
              alt="logo"
              className="h-14 object-contain"
            />
          </Link>

          {/* Search */}
          <div className="flex-1 relative">

            <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden border-2 border-transparent focus-within:border-green-500">

              <Search
                size={20}
                className="ml-4 text-gray-500"
              />

              <input
                type="text"
                placeholder="Search chips, kurkure, cold drinks..."
                className="w-full bg-transparent px-3 py-4 outline-none"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() =>
                  setShowSuggestions(true)
                }
              />
            </div>

            {/* Search Results */}
            {showSuggestions && query.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border rounded-xl shadow-xl overflow-hidden z-50 max-h-[450px] overflow-y-auto">

                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => {
                        setQuery('');
                        setShowSuggestions(false);
                      }}
                    >
                      <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b">

                        <img
                          src={
                            product.images?.[0] ||
                            '/products/placeholder.jpg'
                          }
                          alt={product.productName}
                          className="h-12 w-12 object-contain"
                        />

                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">
                            {product.productName}
                          </p>

                          <p className="text-xs text-gray-500">
                            {product.brand}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-bold text-green-600">
                            ₹
                            {(
                              product.bulkPricing?.[0]
                                ?.pricePerUnit ||
                              product.sellingPrice
                            ).toLocaleString('en-IN')}
                          </p>
                        </div>

                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-gray-500">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative p-3 rounded-xl hover:bg-gray-100 transition"
            aria-label="Wishlist"
          >
            <Heart
              size={22}
              className={wishlistCount > 0 ? "text-red-500 fill-red-500" : "text-gray-700"}
            />

            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-3 rounded-xl hover:bg-gray-100 transition"
          >
            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Section */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">

              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">
                  Welcome,
                </p>

                <p className="text-sm font-bold text-green-600">
                  {user.name}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
          ) : (
            <Link href="/login">
              <button className="hidden md:flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition">
                <User size={18} />
                Login
              </button>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}
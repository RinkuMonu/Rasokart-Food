'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  LogOut,
  LayoutGrid,
  ChevronDown
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/hooks/useWishlist';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

// We map the JSON data so it includes subCategories safely (defaulting to empty array if missing)
const horizontalNavCategories = categoriesData.map(cat => ({
  name: cat.name,
  slug: cat.slug,
  href: `/products?category=${cat.slug}`,
  subCategories: cat.subCategories || []
}));

const allNavCategories = horizontalNavCategories;

export function Navigation() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const [user, setUser] = useState<{ name?: string } | null>(null);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const pathname = usePathname();

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

      {/* NEW CATEGORY / NAVIGATION BAR */}
      <div className="bg-white border-t border-gray-100 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-between w-full h-[46px] md:min-w-0 min-w-max">
            
            {/* All Categories Dropdown */}
            <div className="relative group h-full flex items-center pr-4 border-r border-gray-100">
              <Link 
                href="/products"
                className={`flex items-center gap-2 text-[15px] font-bold transition relative h-full ${
                  pathname === '/products' ? 'text-green-700' : 'text-gray-800 hover:text-green-600'
                }`}
              >
                <LayoutGrid size={18} className={pathname === '/products' ? 'text-green-600' : 'text-green-600 group-hover:text-green-700 transition'} />
                <span>All Categories</span>
                <ChevronDown size={16} className="text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
                <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-green-500 rounded-t-md transition-transform duration-300 origin-left ${
                  pathname === '/products' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
              
              {/* Massive All Categories Dropdown */}
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 rounded-b-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden transform origin-top scale-95 group-hover:scale-100">
                <div className="py-2">
                  {allNavCategories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={cat.href}
                      className="flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      {cat.name}
                      {cat.subCategories.length > 0 && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{cat.subCategories.length}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic & Static Categories with Subcategory Dropdowns */}
            {horizontalNavCategories.map((cat) => {
              // Extract the category param from URL if we were using a real router hook, 
              // but since this is just UI styling based on pathname, it's ok.
              const isActive = false; // We can improve active state checking if needed
              
              return (
                <div key={cat.name} className="relative group h-full">
                  <Link
                    href={cat.href}
                    className={`flex items-center gap-1 text-[14px] font-medium transition relative h-full px-2 ${
                      isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    {cat.name}
                    {cat.subCategories.length > 0 && (
                      <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                    <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-green-500 rounded-t-md transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100`} />
                  </Link>

                  {/* Subcategory Dropdown (Enlarged) */}
                  {cat.subCategories.length > 0 && (
                    <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform origin-top scale-95 group-hover:scale-100 mt-2">
                      <div className="py-2">
                        {cat.subCategories.map((sub: any, idx: number) => (
                          <Link
                            key={idx}
                            href={`${cat.href}&sub=${sub.slug}`}
                            className="block px-5 py-3 text-[15px] font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors border-b border-gray-50 last:border-0"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          </nav>
        </div>
      </div>
    </header>
  );
}
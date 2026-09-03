import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { CategoriesSection } from '@/components/CategoriesSection';
import { ProductSectionCarousel } from '@/components/home/ProductSectionCarousel';
import { CombosSection } from '@/components/home/CombosSection';
import { TopPicksSection } from '@/components/home/TopPicksSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { CTASection } from '@/components/CTASection';
import productsData from '@/data/products.json';

// Helper to deduplicate products by slug / name / ID
const dedupeProducts = (list: any[]) => {
  const seen = new Set();
  return list.filter((p) => {
    const key = p.slug || p.productName || p.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export default function Page() {
  const activeProducts = productsData.products.filter((p) => p.status === 'active');

  // 1. Our Best Sellers (featured === true, higher rating first, deduplicated)
  const bestSellers = dedupeProducts(
    [...activeProducts]
      .filter((p) => p.featured)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
  ).slice(0, 8);

  // 2. New & Trending (sorted by rating / recent catalog order)
  const newAndTrending = dedupeProducts(
    [...activeProducts]
      .filter((p) => !bestSellers.some((b) => b.id === p.id))
      .sort((a, b) => (b.rating || 0) - (a.rating || 0) || b.id - a.id)
  ).slice(0, 8);

  // 3. Most Loved Snacks (rating DESC, discountPercentage DESC)
  const mostLovedSnacks = dedupeProducts(
    [...activeProducts]
      .sort(
        (a, b) =>
          (b.rating || 0) - (a.rating || 0) ||
          (b.discountPercentage || 0) - (a.discountPercentage || 0)
      )
  ).slice(0, 8);

  // 4. Best Deals on Snacks (discountPercentage DESC)
  const bestDeals = dedupeProducts(
    [...activeProducts]
      .filter((p) => (p.discountPercentage || 0) > 0)
      .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
  ).slice(0, 8);

  return (
    <>
      {/* 1. Navbar */}
      <Navigation />

      <main className="min-h-screen bg-white">
        {/* 2. Hero Banner */}
        <HeroSection />

        {/* 3. Shop By Category */}
        <CategoriesSection />

        {/* 4. Our Best Sellers */}
        <ProductSectionCarousel
          eyebrow="SNACKS EVERYONE LOVES"
          heading="Our Best Sellers"
          subtitle="The snacks everyone is loving right now"
          products={bestSellers}
          viewAllHref="/products"
          viewAllText="View All"
          bgClassName="bg-white"
        />

        {/* 5. New & Trending */}
        <ProductSectionCarousel
          eyebrow="FRESH SNACK PICKS"
          heading="New & Trending"
          subtitle="Fresh snack picks worth trying"
          products={newAndTrending}
          viewAllHref="/products"
          viewAllText="View All"
          bgClassName="bg-gray-50/70"
        />

        {/* 6. Most Loved Snacks */}
        <ProductSectionCarousel
          eyebrow="CUSTOMER FAVOURITES"
          heading="Most Loved Snacks"
          subtitle="Customer favourites, picked just for you"
          products={mostLovedSnacks}
          viewAllHref="/products"
          viewAllText="View All"
          bgClassName="bg-white"
        />

        {/* 7. Best Deals on Snacks */}
        <ProductSectionCarousel
          eyebrow="BIG SAVINGS ON EVERY BITE"
          heading="Best Deals on Snacks"
          subtitle="Big flavours. Better prices."
          products={bestDeals}
          viewAllHref="/products"
          viewAllText="View All"
          bgClassName="bg-amber-50/30"
        />

        {/* 8. Combos & Value Packs */}
        <CombosSection />

        {/* 9. Top Picks */}
        <TopPicksSection />

        {/* 10. Why Choose Rasokart */}
        <BenefitsSection />

        {/* 11. Customer Reviews */}
        <TestimonialsCarousel />

        {/* 12. CTA Banner */}
        <CTASection />
      </main>

      {/* 13. Footer */}
      <Footer />
    </>
  );
}

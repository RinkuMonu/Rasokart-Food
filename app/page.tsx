import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { CategoriesSection } from '@/components/CategoriesSection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { BenefitsSection } from '@/components/BenefitsSection';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { CTASection } from '@/components/CTASection';

export default function Page() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <BenefitsSection />
        <TestimonialsCarousel />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

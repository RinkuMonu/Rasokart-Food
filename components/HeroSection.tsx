'use client';

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1741520150134-0d60d82dfac9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
    title: "Wholesale Chips Starting ₹8",
    subtitle: "Buy More, Save More",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584474345633-cfd33a207dc8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBvcGNvcm58ZW58MHx8MHx8fDA%3D",
    title: "Popcorn Bulk Deals",
    subtitle: "Best Prices For Retailers",
  },
  {
    image:
      "https://images.unsplash.com/photo-1746635732206-c54a55367307?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDYyfHx8ZW58MHx8fHx8",
    title: "Snacks & Namkeen Collection",
    subtitle: "Wholesale Rates Available",
  },
];

export function HeroSection() {
  const [selected, setSelected] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000 })]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-full h-[500px] md:h-[600px]"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <div className="max-w-2xl text-white">

                    <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      Bulk Purchase Offer
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      {slide.title}
                    </h1>

                    <p className="text-xl text-gray-200 mb-8">
                      {slide.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/products"
                        className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-semibold"
                      >
                        Shop Now
                      </Link>

                      <Link
                        href="/contact"
                        className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold"
                      >
                        Get Wholesale Price
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition ${
              selected === index
                ? "bg-white"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
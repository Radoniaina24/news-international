"use client";
import BannerCarousel from "@/components/Banner/BannerCarousel";
import CategoriesSection from "@/components/Home/CategoriesSection";
import HeroSection from "@/components/Home/HeroSection";

import NewsletterSignup from "@/components/Newsletter/NewsletterSignup";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <main>
        <BannerCarousel />
        <HeroSection />
        <CategoriesSection />
        <NewsletterSignup />
      </main>
    </div>
  );
}

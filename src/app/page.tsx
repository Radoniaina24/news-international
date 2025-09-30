"use client";

import CategoriesSection from "@/components/Home/CategoriesSection";
import CultureSection from "@/components/Home/CultureSection";
import EconomieSection from "@/components/Home/EconomieSection";
import HeroSection from "@/components/Home/HeroSection";
import PolitqueSection from "@/components/Home/PolitiqueSection";
import AfricaMap from "@/components/Map/AfricaMap";
import NewsletterSignup from "@/components/Newsletter/NewsletterSignup";
import TeamComponent from "@/components/Team/TeamComponent";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50  transition-colors">
      <main>
        <HeroSection />
        <AfricaMap />
        <CategoriesSection />
        <PolitqueSection />
        <EconomieSection />
        <CultureSection />

        <TeamComponent />
        <NewsletterSignup />
      </main>
    </div>
  );
}

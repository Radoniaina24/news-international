"use client";
import BannerCarousel from "@/components/Banner/BannerCarousel";
import CategoriesSection from "@/components/Home/CategoriesSection";
import HeroSection from "@/components/Home/HeroSection";
import TechnologySection from "@/components/Home/TechnologySection";

import NewsletterSignup from "@/components/Newsletter/NewsletterSignup";

export default function Home() {
  const ads = [
    {
      id: 1,
      title: "Promotion Exceptionnelle",
      description:
        "Profitez de nos offres spéciales avec des réductions allant jusqu'à 50%",
      imageUrl: "/images/ad1.jpg",
      ctaText: "Découvrir",
      ctaLink: "/promotions",
    },
    {
      id: 2,
      title: "Nouveaux Produits",
      description: "Découvrez notre nouvelle collection de produits exclusifs",
      imageUrl: "/images/ad2.jpg",
      ctaText: "Voir la collection",
      ctaLink: "/nouveautes",
    },
    {
      id: 3,
      title: "Livraison Gratuite",
      description:
        "Commandez maintenant et bénéficiez de la livraison gratuite",
      imageUrl: "/images/ad3.jpg",
      ctaText: "Commander",
      ctaLink: "/shop",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <main>
        <BannerCarousel />
        <HeroSection />
        <CategoriesSection />
        <TechnologySection />
        <NewsletterSignup />
        {/* <HtmlContent html={content} /> */}
      </main>
    </div>
  );
}

"use client";
import BannerCarousel from "@/components/Banner/BannerCarousel";

import CategoriesSection from "@/components/Home/CategoriesSection";
import EconomieSection from "@/components/Home/EconomieSection";
import HeroSection from "@/components/Home/HeroSection";
import PolitqueSection from "@/components/Home/PolitiqueSection";
import SportSection from "@/components/Home/SportSection";

import NewsletterSignup from "@/components/Newsletter/NewsletterSignup";
import TeamComponent from "@/components/Team/TeamComponent";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50  transition-colors">
      <main>
        <BannerCarousel />
        <HeroSection />
        <CategoriesSection />

        <PolitqueSection />
        <EconomieSection />
        <SportSection />
        {/* <AnimatedTestimonials
          data={[
            {
              description:
                "ScrollX-UI has completely transformed how I build interfaces. The animations are silky smooth, and the components are modular and responsive.",
              image:
                "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Isabelle Carlos",
              handle: "@isabellecarlos",
            },
            {
              description:
                "I love how ScrollX-UI makes my projects look professional with minimal effort. The documentation is clear and the community is super helpful.",
              image:
                "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Lana Akash",
              handle: "@lanaakash",
            },
            {
              description:
                "The smooth scrolling animations and intuitive components in ScrollX-UI save me hours of development time!",
              image:
                "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Liam O’Connor",
              handle: "@liamoc",
            },
          ]}
        /> */}
        <TeamComponent />
        <NewsletterSignup />
      </main>
    </div>
  );
}

import CategoriesSection from "@/components/Home/CategoriesSection";
import HeroSection from "@/components/Home/HeroSection";
import TechnologySection from "@/components/Home/TechnologySection";
import NewsletterSignup from "@/components/Newsletter/NewsletterSignup";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <main>
        <HeroSection />
        <CategoriesSection />
        <TechnologySection />
        <NewsletterSignup />
      </main>
    </div>
  );
}

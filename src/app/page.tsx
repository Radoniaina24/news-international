"use client";
import CategoriesSection from "@/components/Home/CategoriesSection";
import HeroSection from "@/components/Home/HeroSection";
import TechnologySection from "@/components/Home/TechnologySection";

import NewsletterSignup from "@/components/Newsletter/NewsletterSignup";

export default function Home() {
  // const content =
  //   '\n<p><strong>Antananarivo – 17 août 2025.</strong><br>La capitale malagasy a vécu ce week-end au rythme d’un rendez-vous qui dépasse de loin le protocole : le 45ᵉ Sommet des Chefs d’État et de Gouvernement de la SADC. Dans les couloirs de l’événement, entre débats animés et sourires diplomatiques, une idée revenait sans cesse : l’Afrique australe veut avancer ensemble, malgré les tempêtes.</p>\n\n\n\n<p>Durant plusieurs jours, les dirigeants n’ont pas seulement enchaîné les discours. Ils ont cherché à poser des actes. La signature d’accords commerciaux, bien que technique, incarne cette volonté : transformer les promesses de coopération en réalités économiques palpables. Pas à pas, malgré les vents contraires, l’intégration régionale trouve son chemin.</p>\n\n\n\n<p>Mais l’image qui restera dans les mémoires est sans doute celle d’<strong>Elias Magosi</strong>, jurant fidélité à ses responsabilités devant la Haute Cour constitutionnelle malgache. Ce geste, rare dans une organisation régionale, a marqué les esprits : un haut responsable africain acceptant d’ancrer son mandat dans la transparence et la légitimité. Une symbolique forte pour une SADC qui veut prouver qu’elle n’est pas qu’une organisation de papier, mais un espace de gouvernance réelle.</p>\n\n\n\n<p>En marge des grandes salles de conférence, Antananarivo a vibré. Entre les habitants impressionnés par le déploiement sécuritaire et l’effervescence des délégations, la ville s’est retrouvée au cœur de l’histoire régionale. Pour beaucoup, ce sommet est plus qu’une réunion politique : il est un rappel que <strong>les réponses aux défis sécuritaires, économiques et sociaux de l’Afrique australe ne viendront que de l’unité et de la solidarité</strong>.</p>\n\n\n\n<p> <strong>Aina A. – Gate of Africa Magazine</strong></p>\n\n\n\n<p>Participez au débat sur notre page : <a href="https://www.facebook.com/GateOfAfricaMagazine" target="_blank" rel="noreferrer noopener">facebook.com/GateOfAfricaMagazine</a></p>\n\n\n\n<p>#SADC2025 #Madagascar #UnitéAfricaine #Développement #LeadershipAfricain</p>\n';
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <main>
        <HeroSection />
        <CategoriesSection />
        <TechnologySection />
        <NewsletterSignup />
        {/* <HtmlContent html={content} /> */}
      </main>
    </div>
  );
}

import React from "react";
import { Smartphone, ArrowRight } from "lucide-react";
import { mockArticles } from "../../data/mockData";
import { categories } from "../../data/categories";
import ArticleCard from "../Articles/ArticleCard";
import Image from "next/image";

const TechnologySection: React.FC = () => {
  const techCategory = categories.find((cat) => cat.slug === "technologie");
  const techArticles = mockArticles.filter(
    (article) => article.category.slug === "technologie"
  );
  const latestTechArticle = techArticles[0];
  const otherTechArticles = techArticles.slice(1);

  if (!techCategory || techArticles.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
            style={{ backgroundColor: `${techCategory.color}15` }}
          >
            <Smartphone
              className="w-6 h-6"
              style={{ color: techCategory.color }}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Technologie
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Innovation, startups et nouvelles technologies
            </p>
          </div>
        </div>
        <a
          href="/category/technologie"
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
        >
          Voir tout
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Article principal */}
        {latestTechArticle && (
          <div className="lg:col-span-2">
            <div className="relative group cursor-pointer">
              <div className="relative h-80 lg:h-96 overflow-hidden rounded-xl">
                <Image
                  width={400}
                  height={400}
                  src={latestTechArticle.imageUrl}
                  alt={latestTechArticle.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center mb-3">
                    <span className="bg-purple-600 text-white px-3 py-1 text-sm font-medium rounded-full mr-3">
                      Dernière actualité
                    </span>
                    {latestTechArticle.trending && (
                      <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-full">
                        Tendance
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight group-hover:text-blue-300 transition-colors">
                    {latestTechArticle.title}
                  </h3>
                  <p className="text-gray-200 mb-4 text-lg leading-relaxed line-clamp-2">
                    {latestTechArticle.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Image
                        width={400}
                        height={400}
                        src={latestTechArticle.author.avatar}
                        alt={latestTechArticle.author.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      {latestTechArticle.author.name}
                    </div>
                    <span>•</span>
                    <span>{latestTechArticle.readTime} min de lecture</span>
                    <span>•</span>
                    <span>
                      {new Intl.DateTimeFormat("fr-FR", {
                        day: "numeric",
                        month: "long",
                      }).format(latestTechArticle.publishedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles secondaires */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Autres actualités tech
          </h3>
          {otherTechArticles.length > 0 ? (
            otherTechArticles
              .slice(0, 4)
              .map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="compact"
                />
              ))
          ) : (
            <div className="text-center py-8">
              <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Plus d&apos;articles technologie bientôt disponibles
              </p>
            </div>
          )}

          {/* Tech Trends */}
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl mt-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tendances Tech
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Intelligence Artificielle",
                "Blockchain",
                "IoT",
                "Cybersécurité",
                "5G",
                "Cloud Computing",
              ].map((trend) => (
                <span
                  key={trend}
                  className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-800 cursor-pointer transition-colors"
                >
                  #{trend}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;

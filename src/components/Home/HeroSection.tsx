import React from 'react';
import { mockArticles } from '../../data/mockData';
import ArticleCard from '../Articles/ArticleCard';

const HeroSection: React.FC = () => {
  const featuredArticles = mockArticles.filter(article => article.featured);
  const mainArticle = featuredArticles[0];
  const sideArticles = featuredArticles.slice(1, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          <ArticleCard article={mainArticle} variant="featured" />
        </div>
        
        {/* Side Articles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            À la Une
          </h2>
          {sideArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="compact" />
          ))}
          
          {/* Trending Topics */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sujets Tendance
            </h3>
            <div className="flex flex-wrap gap-2">
              {['COP28', 'Intelligence Artificielle', 'BCE', 'Football', 'Innovation'].map((tag) => (
                <span
                  key={tag}
                  className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
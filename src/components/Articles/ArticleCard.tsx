import React from "react";
import { Clock, Eye, Heart, User } from "lucide-react";
import { Article } from "../../types";
import Image from "next/image";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = "default",
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  if (variant === "featured") {
    return (
      <article className="relative group cursor-pointer">
        <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-xl">
          <Image
            width={400}
            height={400}
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
            <div className="flex items-center mb-3">
              <span
                className="inline-block px-3 py-1 text-sm font-medium rounded-full mr-3"
                style={{ backgroundColor: article.category.color }}
              >
                {article.category.name}
              </span>
              {article.trending && (
                <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-full">
                  Tendance
                </span>
              )}
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight group-hover:text-blue-300 transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-200 mb-4 text-lg leading-relaxed">
              {article.excerpt}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {article.author.name}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime} min
              </div>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="flex space-x-4 group cursor-pointer">
        <div className="w-24 h-24 flex-shrink-0">
          <Image
            width={400}
            height={400}
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105 duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-2">
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: article.category.color }}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {article.category.name}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDate(article.publishedAt)}</span>
            <span className="mx-1">•</span>
            <span>{article.readTime} min</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
      <div className="relative overflow-hidden rounded-t-xl">
        <Image
          width={400}
          height={400}
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <span
            className="px-3 py-1 text-sm font-medium text-white rounded-full"
            style={{ backgroundColor: article.category.color }}
          >
            {article.category.name}
          </span>
          {article.trending && (
            <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-full">
              Tendance
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              width={400}
              height={400}
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {article.author.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {article.readTime}
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {article.views.toLocaleString()}
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {article.likes}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;

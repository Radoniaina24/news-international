"use client";
/* eslint-disable */
import React from "react";
import {
  Clock,
  Heart,
  Calendar,
  Share2,
  BookOpen,
  Tag,
  ArrowLeft,
  MessageCircle,
  ThumbsUp,
  Bookmark,
} from "lucide-react";
import Image from "next/image";
import { WPBlogPost } from "@/types/Blog";
import { timeAgo } from "@/lib/utils/timeAgo";
import { useRouter } from "next/navigation";

interface BlogViewProps {
  article: WPBlogPost;
}

const BlogView: React.FC<BlogViewProps> = ({ article }) => {
  const navigation = useRouter();

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const formatDateShort = (date: string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  // ✅ Récupérer image avec le typage WPFeaturedMediaSize
  const imageUrl =
    article.blog_post_layout_featured_media_urls.full?.[0] ||
    "/placeholder.jpg";

  // ✅ Auteur
  const author = article._embedded?.author?.[0];

  // ✅ Catégories
  const categories = article.categories
    .map((id) => article.categories_names?.[id])
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // ✅ Extrait texte brut
  const excerpt = article.excerpt.rendered.replace(/<[^>]+>/g, "");

  // ✅ Temps de lecture estimé
  const readingTime = (content: string) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]+>/g, "");
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const estimatedReadTime = readingTime(article.content?.rendered || "");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header avec bouton retour */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigation.back()}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Retour aux articles</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Image de couverture */}
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <Image
              width={1200}
              height={600}
              src={imageUrl}
              alt={article.title.rendered}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Catégories sur l'image */}
            <div className="absolute top-6 left-6">
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat.link}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contenu de l'article */}
          <div className="p-8 lg:p-12">
            {/* Titre */}
            <header className="mb-8">
              <h1
                className="text-3xl  font-bold text-gray-900 dark:text-white leading-tight mb-6"
                dangerouslySetInnerHTML={{ __html: article.title.rendered }}
              />

              {/* Métadonnées */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                {/* Informations auteur */}
                {author && (
                  <div className="flex items-center space-x-4">
                    <Image
                      width={48}
                      height={48}
                      src={(author as any).avatar_urls?.["96"] || "/avatar.png"}
                      alt={author.name}
                      className="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-600"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {author.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Publié le {formatDateShort(article.date)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Statistiques */}
                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{estimatedReadTime} min de lecture</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>il y a {timeAgo(article.date)}</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Extrait/Résumé */}

            {/* Contenu principal */}
            <div className="prose prose-lg dark:prose-invert max-w-none facebook">
              <div
                className="text-gray-800 dark:text-gray-200 "
                dangerouslySetInnerHTML={{
                  __html: article.content?.rendered || "",
                }}
              />
            </div>

            {/* Tags et métadonnées supplémentaires */}
            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              {/* Tags */}
              {categories.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Catégories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat.link}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                      >
                        #{cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </footer>
          </div>
        </article>

        {/* Section recommandations ou articles similaires */}
        {/* <div className="mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Articles recommandés
            </h2>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>D'autres articles intéressants arrivent bientôt...</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BlogView;

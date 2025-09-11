"use client";
/* eslint-disable */
import React from "react";
import { Clock, User } from "lucide-react";
import Image from "next/image";
import { WPBlogPost } from "@/types/Blog";
import { timeAgo } from "@/lib/utils/timeAgo";
import { usePathname, useRouter } from "next/navigation";

interface BlogCardProps {
  article: WPBlogPost;
  variant?: "default" | "featured" | "compact";
  category?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  article,
  variant = "default",
}) => {
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const navigation = useRouter();
  const pathname = usePathname();

  const handleNavigation = () => {
    if (pathname === "/") {
      navigation.push(`blog/${article.slug}`);
    } else {
      navigation.push(`${pathname}/${article.slug}`);
    }
  };
  // const imageUrl =
  //   article.blog_post_layout_featured_media_urls.full?.[0] ||
  //   article.blog_post_layout_featured_media_urls.thumbnail?.[0] ||
  //   "/placeholder.jpg";

  const imageUrl =
    article.blog_post_layout_featured_media_urls.full?.[0] ||
    "/placeholder.jpg";

  // ✅ Auteur
  const author = article._embedded?.author?.[0];

  // ✅ Catégorie (d'après ton WPBlogPost : categories_names)
  const categories = article.categories
    .map((id) => article.categories_names?.[id])
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // ✅ Extrait texte brut
  const excerpt = article.excerpt.rendered.replace(/<[^>]+>/g, "");

  // const readingTime = (content: string) => {
  //   const wordsPerMinute = 200; // moyenne lecture
  //   const text = content.replace(/<[^>]+>/g, ""); // enlever le HTML
  //   const words = text.trim().split(/\s+/).length;
  //   const minutes = Math.ceil(words / wordsPerMinute);
  //   return `${minutes} min`;
  // };
  if (variant === "featured") {
    return (
      <article
        className="relative group cursor-pointer"
        onClick={handleNavigation}
      >
        <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-xl">
          <Image
            width={800}
            height={500}
            src={imageUrl}
            alt={article.title.rendered}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
            <div className="flex lowercase flex-wrap items-center gap-2 mb-3">
              {categories.map((cat) => (
                <span
                  key={cat.link}
                  className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-600 text-white"
                >
                  {cat.name}
                </span>
              ))}

              {"sticky" in article && (article as any).sticky && (
                <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-full">
                  Tendance
                </span>
              )}
            </div>
            <h2
              className="text-2xl lg:text-3xl font-bold mb-3 leading-tight group-hover:text-blue-300 transition-colors"
              dangerouslySetInnerHTML={{ __html: article.title.rendered }}
            />
            <p className="text-gray-200 mb-4 text-lg leading-relaxed line-clamp-3">
              {excerpt}
            </p>
            <div className="flex items-center space-x-4 text- text-gray-300">
              {author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {author.name}
                </div>
              )}
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />

                <span>il y a {timeAgo(article.date)}</span>
                <span className="mx-1">•</span>
              </div>
              <span>{formatDate(article.date)}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article
        className="flex space-x-4 group cursor-pointer"
        onClick={handleNavigation}
      >
        <div className="w-24 h-24 flex-shrink-0">
          <Image
            width={100}
            height={100}
            src={imageUrl}
            alt={article.title.rendered}
            className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105 duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1">
            {categories.length > 0 && (
              <div className="flex lowercase flex-wrap items-center gap-2 mb-2">
                {categories.map((cat) => (
                  <span
                    key={cat.link}
                    className="text-sm text-white dark:text-white bg-green-500 dark:bg-gray-700 px-2 py-0.5 rounded"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title.rendered}
          </h3>
          <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDate(article.date)}</span>
            <span className="mx-1">•</span>
            <span>il y a {timeAgo(article.date)}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
      onClick={handleNavigation}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <Image
          width={400}
          height={200}
          src={imageUrl}
          alt={article.title.rendered}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="flex items-center mb-1">
            {categories.length > 0 && (
              <div className="flex lowercase flex-wrap items-center gap-2 mb-2">
                {categories.map((cat) => (
                  <span
                    key={cat.link}
                    className="text-sm text-white dark:text-white bg-green-500 dark:bg-gray-700 px-2 py-0.5 rounded"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3
          className="text-md font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          dangerouslySetInnerHTML={{ __html: article.title.rendered }}
        />
        <p className="text-gray-600 text-sm dark:text-gray-300 mb-4 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center justify-between">
          {author && (
            <div className="flex items-center space-x-3">
              <Image
                width={40}
                height={40}
                src={(author as any).avatar_urls?.["48"] || "/avatar.png"}
                alt={author.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-xs font-medium text-gray-900 dark:text-white">
                  {author.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(article.date)}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />{" "}
              <span>il y a {timeAgo(article.date)}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;

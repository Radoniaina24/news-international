"use client";
/* eslint-disable */
import React, { useState } from "react";
import { ArrowRight, Clock, Tag, User } from "lucide-react";
import Image from "next/image";
import { WPBlogPost } from "@/types/Blog";
import { timeAgo } from "@/lib/utils/timeAgo";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils/classNames";

interface BlogCardProps {
  article: WPBlogPost;
  variant?: "default" | "featured" | "compact";
  category?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  article,
  variant = "default",
  category,
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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technologie: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      Culture: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      Économie: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",

      Sport: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
      Politique: "bg-gradient-to-r from-indigo-600 to-blue-600 text-white",
      Tourisme:
        "bg-gradient-to-r from-teal-500 via-sky-400 to-emerald-500 text-white",
    };
    return (
      colors[category] ||
      "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    );
  };

  // const imageUrl =
  //   article.blog_post_layout_featured_media_urls.full?.[0] ||
  //   article.blog_post_layout_featured_media_urls.thumbnail?.[0] ||
  //   "/placeholder.jpg";

  const imageUrl =
    article.blog_post_layout_featured_media_urls.full?.[0] ||
    "https://via.assets.so/img.jpg?w=800&h=500&bg=e5e7eb&text=image&fontSize=0&fontColor=6b7280&f=png";
  // console.log(imageUrl);
  // Auteur
  const author = article._embedded?.author?.[0];

  // Catégorie (d'après ton WPBlogPost : categories_names)
  const categories = article.categories
    .map((id) => article.categories_names?.[id])
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // Extrait texte brut
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
          {/* <Image
            width={800}
            height={500}
            src={imgSrc}
            alt={article.title.rendered}
            className="w-full h-full object-cover"
            unoptimized
          /> */}
          <Image
            src={imageUrl}
            alt={article.title.rendered}
            width={800}
            height={500}
            className="w-full h-full object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
            <div className="flex items-center mb-1">
              {category ? (
                <div className="flex items-center ">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      getCategoryColor(category)
                    )}
                  >
                    {category}
                  </span>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat.link}
                      className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-600 text-white"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
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
            width={400}
            height={400}
            src={imageUrl}
            alt={article.title.rendered}
            className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105 duration-300"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1">
            {category ? (
              <div className="flex items-center ">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    getCategoryColor(category)
                  )}
                >
                  {category}
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat.link}
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-600 text-white"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <h3 className="font-semibold text-gray-900  line-clamp-2 group-hover:text-blue-600  transition-colors">
            {article.title.rendered}
          </h3>
          <div className="flex items-center mt-2 text-xs text-gray-500 ">
            <span>il y a {timeAgo(article.date)}</span>
            <div className="flex items-center ml-5  text-xs text-gray-500 ">
              <button
                className="text-blue-600 text-xs  hover:text-blue-800  font-medium flex items-center transition-colors group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation();
                }}
              >
                Lire la suite
                {/* <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" /> */}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="bg-white  rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
      onClick={handleNavigation}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <Image
          width={400}
          height={200}
          src={imageUrl}
          alt={article.title.rendered}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300"
          unoptimized
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <div className="flex items-center mb-1">
            {category ? (
              <div className="flex items-center ">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    getCategoryColor(category)
                  )}
                >
                  {category}
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat.link}
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-600 text-white"
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
          className="text-md font-semibold text-gray-900  mb-2 line-clamp-2 group-hover:text-blue-600  transition-colors"
          dangerouslySetInnerHTML={{ __html: article.title.rendered }}
        />
        <p className="text-gray-600 text-sm  mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center justify-between">
          {author && (
            <div className="flex items-center space-x-3">
              {/* <Image
                width={40}
                height={40}
                src={(author as any).avatar_urls?.["48"] || "/avatar.png"}
                alt={author.name}
                className="w-8 h-8 rounded-full"
              /> */}
              <div>
                {/* <p className="text-xs font-medium text-gray-900 ">
                  {author.name}
                </p> */}
                {/* <p className="text-xs text-gray-500 ">
                  {formatDate(article.date)}
                </p> */}
                <div className="flex items-center space-x-4 text-xs text-gray-500 ">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />{" "}
                    <span>il y a {timeAgo(article.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center  text-xs text-gray-500 ">
            <button
              className="text-blue-600 text-xs  hover:text-blue-800  font-medium flex items-center transition-colors group/btn"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation();
              }}
            >
              Lire la suite
              {/* <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" /> */}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;

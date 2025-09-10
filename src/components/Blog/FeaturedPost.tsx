"use client";

import Image from "next/image";
import { TrendingUp, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/* eslint-disable */
// export interface FeaturedPostProps {
//   data: {
//     posts: {
//       title?: { rendered?: string };
//       blog_post_layout_featured_media_urls?: {
//         full?: string[];
//       };
//     }[];
//   };
// }

export function FeaturedPost({ data, category = "Politique" }: any) {
  if (!data) {
    return null;
  }
  const post = data[0];
  const navigation = useRouter();

  const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, "");

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technologie: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      Culture: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      Economie: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",

      Sport: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
      Politique: "bg-gradient-to-r from-indigo-600 to-blue-600 text-white",
    };
    return (
      colors[category] ||
      "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    );
  };

  return (
    <div className="mb-12 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3">
        <div className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          <span className="font-bold">À LA UNE</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Texte côté gauche */}
          <div>
            <div className="flex items-center mb-4">
              <Tag className="w-4 h-4 text-indigo-600 mr-2" />
              <span
                className={`${getCategoryColor(
                  category
                )} px-3 py-1 rounded-full text-xs font-medium`}
              >
                {category}
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title?.rendered || "Titre de l'article à la une"}
            </h2>

            <p className=" text-md text-gray-600 mb-6 line-clamp-3">
              {excerpt}
            </p>

            <Button
              onClick={() =>
                navigation.push(
                  `/category/${category.toLowerCase()}/${post.slug}`
                )
              }
              className="bg-gradient-to-r text-xs from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl shadow-lg"
            >
              Lire l'article complet
            </Button>
          </div>

          {/* Image côté droit */}
          <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center overflow-hidden">
            <Image
              alt="image à la une"
              src={
                post.blog_post_layout_featured_media_urls?.full?.[0] ??
                "/placeholder.jpg"
              }
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

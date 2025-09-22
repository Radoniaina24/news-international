import React from "react";
/* eslint-disable */

import * as Icons from "lucide-react";
import { useGetAllPostQuery } from "@/redux/api/postApi";
import BlogCardSkeleton from "../Blog/BlogCardSkeleton";
import BlogCard from "../Blog/BlogCard";
import { WPBlogPost } from "@/types/Blog";
import Link from "next/link";
import { useCategoriesSpecifique } from "@/hooks/useCategories";

const CategoriesSection: React.FC = () => {
  const { data, isLoading, error } = useGetAllPostQuery({
    per_page: 4,
    _embed: true,
  });
  const { categories: cat, isLoading: load } = useCategoriesSpecifique();
  // console.log(cat);
  const isLoadingState = isLoading
    ? Array.from({ length: 4 }).map((_, i) => (
        <BlogCardSkeleton key={`skeleton-${i}`} />
      ))
    : data?.map((post: WPBlogPost) => (
        <BlogCard key={post.id} article={post} />
      ));

  // console.log(categories);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Navigation */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-900  mb-6">Catégories</h2>
          <nav className="space-y-2">
            {cat.map((category: any) => {
              const IconComponent = Icons[
                category.icon as keyof typeof Icons
              ] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50  transition-colors group"
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <IconComponent
                        className="w-5 h-5"
                        style={{ color: category.color }}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900  group-hover:text-blue-600  transition-colors">
                        {category.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {category.count} article{category.count > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Recent Articles */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 ">
              Articles Récents
            </h2>
            <Link
              href="/blog"
              className="text-blue-600  hover:text-blue-700  font-medium transition-colors"
            >
              Voir tout
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoadingState}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

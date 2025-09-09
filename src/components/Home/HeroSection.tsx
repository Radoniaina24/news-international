import React from "react";
import { useGetAllPostQuery } from "@/redux/api/postApi";
import { WPBlogPost } from "@/types/Blog";
import BlogCard from "../Blog/BlogCard";
import BlogCardSkeleton from "../Blog/BlogCardSkeleton";

const HeroSection: React.FC = () => {
  const { data, isLoading } = useGetAllPostQuery({
    sticky: true,
    _embed: true,
  });
  const { data: recent, isLoading: loading } = useGetAllPostQuery({
    per_page: 1,
    orderby: "date",
    order: "desc",
    _embed: true,
  });
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Article */}
        {isLoading ? (
          <div className="lg:col-span-2">
            <BlogCardSkeleton variant="featured" />
          </div>
        ) : (
          data?.map((post: WPBlogPost) => (
            <div className="lg:col-span-2" key={post.id}>
              <BlogCard article={post} variant="featured" />
            </div>
          ))
        )}
        {/* Side Articles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            À la Une
          </h2>

          {loading ? (
            <div className="lg:col-span-2">
              <BlogCardSkeleton variant="compact" />
            </div>
          ) : (
            recent?.map((post: WPBlogPost) => (
              <div className="lg:col-span-2" key={post.id}>
                <BlogCard article={post} variant="compact" />
              </div>
            ))
          )}

          {/* Trending Topics */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sujets Tendance
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "COP28",
                "Intelligence Artificielle",
                "BCE",
                "Football",
                "Innovation",
              ].map((tag) => (
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

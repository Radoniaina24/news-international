import React from "react";
import { useGetAllPostQuery } from "@/redux/api/postApi";
import { WPBlogPost } from "@/types/Blog";
import BlogCard from "../Blog/BlogCard";
import BlogCardSkeleton from "../Blog/BlogCardSkeleton";

const HeroSection: React.FC = () => {
  const { data, isLoading } = useGetAllPostQuery({
    per_page: 1,
    orderby: "date",
    order: "desc",
    _embed: true,
  });
  const { data: recent, isLoading: loading } = useGetAllPostQuery({
    per_page: 4,
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
          <h2 className="text-2xl font-bold text-gray-900 ">À la Une</h2>

          {loading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="lg:col-span-2">
                  <BlogCardSkeleton variant="compact" />
                </div>
              ))}
            </>
          ) : (
            recent?.slice(1, 4).map((post: WPBlogPost) => (
              <div className="lg:col-span-2" key={post.id}>
                <BlogCard article={post} variant="compact" />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

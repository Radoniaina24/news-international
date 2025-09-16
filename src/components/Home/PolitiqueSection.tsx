import {
  useGetAllPostQuery,
  useGetAllPostWithTransformationResponseQuery,
} from "@/redux/api/postApi";
import { ArrowRight, TrendingUp, Shield, Globe } from "lucide-react";
import Link from "next/link";
import BlogCardSkeleton from "../Blog/BlogCardSkeleton";
import { WPBlogPost } from "@/types/Blog";
import BlogCard from "../Blog/BlogCard";

const PolitqueSection: React.FC = () => {
  const { data, isLoading } = useGetAllPostWithTransformationResponseQuery({
    per_page: 1,
    orderby: "date",
    categories: [4, 14],
    _embed: true,
  });
  const { data: recent, isLoading: loading } = useGetAllPostQuery({
    per_page: 4,
    orderby: "date",
    order: "desc",
    categories: [4, 14],
    _embed: true,
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* En-tête avec éléments visuels attractifs */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="flex items-center space-x-4">
          <div className="border-l-8 pl-3 border-blue-500">
            <h2 className="text-3xl md:text-3xl font-bold text-gray-700 dark:text-white mt-2">
              Politique
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-lg">
              Gouvernance, diplomatie et stratégies institutionnelles qui
              façonnent notre monde
            </p>
          </div>
        </div>

        <Link
          href="/category/politique"
          className="hidden md:flex items-center text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg font-medium transition-all duration-300 group shadow-md hover:shadow-lg"
        >
          Voir tout
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Section mobile "Voir tout" */}
      <div className="md:hidden flex justify-end mb-6">
        <Link
          href="/category/politique"
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
        >
          Voir tout
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Contenu principal avec design amélioré */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Article vedette principal */}
        {isLoading ? (
          <div className="lg:col-span-2">
            <BlogCardSkeleton variant="featured" />
          </div>
        ) : (
          data?.posts?.map((post: WPBlogPost) => (
            <div className="lg:col-span-2 group" key={post.id}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                <BlogCard article={post} variant="featured" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            </div>
          ))
        )}

        {/* Articles secondaires avec design amélioré */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Actualités récentes
            </h2>
          </div>

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
              <div
                className="lg:col-span-2 border-b-2 py-2 border-gray-200"
                key={post.id}
              >
                <BlogCard article={post} variant="compact" />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PolitqueSection;

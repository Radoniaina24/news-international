import {
  useGetAllPostQuery,
  useGetAllPostWithTransformationResponseQuery,
} from "@/redux/api/postApi";
import { ArrowRight, LineChart } from "lucide-react";
import Link from "next/link";
import BlogCardSkeleton from "../Blog/BlogCardSkeleton";
import { WPBlogPost } from "@/types/Blog";
import BlogCard from "../Blog/BlogCard";

const EconomieSection: React.FC = () => {
  const { data, isLoading } = useGetAllPostWithTransformationResponseQuery({
    per_page: 1,
    orderby: "date",
    categories: 9,
    _embed: true,
  });
  const { data: recent, isLoading: loading } = useGetAllPostQuery({
    per_page: 4,
    orderby: "date",
    order: "desc",
    categories: 9,
    _embed: true,
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
      {/* En-tête avec identité visuelle économique */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="flex items-center space-x-4">
          <div className="border-l-8 pl-3 border-emerald-500">
            <h2 className="text-3xl md:text-3xl font-bold text-gray-700 dark:text-white mt-2">
              Économie
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-lg">
              Analyses financières, marchés internationaux et perspectives de
              croissance qui façonnent notre avenir économique
            </p>
          </div>
        </div>

        <Link
          href="/category/economie"
          className="hidden md:flex items-center text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 group shadow-md hover:shadow-lg"
        >
          Toute l&apos;économie
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Section mobile "Voir tout" */}
      <div className="md:hidden flex justify-end mb-6">
        <Link
          href="/category/economie"
          className="flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors group"
        >
          Toute l&apos;économie
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Contenu principal avec design économique */}
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
                <BlogCard
                  category="Économie"
                  article={post}
                  variant="featured"
                />
              </div>
            </div>
          ))
        )}

        {/* Articles secondaires */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <LineChart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Autres actualités économiques
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
                <BlogCard
                  article={post}
                  variant="compact"
                  category="Économie"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default EconomieSection;

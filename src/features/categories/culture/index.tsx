"use client";

/* eslint-disable */
import Select from "react-select";
import { SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Filter,
  Globe,
  Newspaper,
  Palette,
  Search,
  TrendingUp,
  X,
} from "lucide-react";
import { useCategoriesOptions } from "@/hooks/useCategories";
import {
  useGetAllPostWithTransformationResponseQuery,
  useGetOneRecentPostQuery,
} from "@/redux/api/postApi";
import BlogCardSkeleton from "@/components/Blog/BlogCardSkeleton";
import { WPBlogPost } from "@/types/Blog";
import BlogCard from "@/components/Blog/BlogCard";
import Pagination from "@/components/Pagination";

import { FeaturedPostSkeleton } from "@/components/Blog/FeaturedPostSkeleton";
import { FeaturedPost } from "@/components/Blog/FeaturedPost";
import { usePostsByPeriod } from "@/hooks/usePostsByPeriod";
import { getDateRangeForStrictPeriod } from "@/lib/utils/getDateRangeForPeriod";
import { Input } from "@/components/ui/input";
import { StatCardSkeleton } from "@/components/Blog/StatCardSkeleton";
import { StatCard } from "@/components/Blog/StatCard";

interface valueSelectInput {
  label: string;
  value: string | number;
}

export default function ArticlesPolitique() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technologie: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      Design: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      Business: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      Marketing: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
      Sécurité: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
      Politique: "bg-gradient-to-r from-indigo-600 to-blue-600 text-white",
      Géopolitique: "bg-gradient-to-r from-red-600 to-orange-600 text-white",
    };
    return (
      colors[category] ||
      "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    );
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { options, isLoading: categoriesLoading } = useCategoriesOptions();

  const [category, setCategories] = useState<valueSelectInput | null>();
  const sortOptions = [
    { value: "desc", label: "Plus récent" },
    { value: "asc", label: "Plus ancien" },
  ];
  const [sortDate, setSortDate] = useState<valueSelectInput | null>({
    value: "desc",
    label: "Plus récent",
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategories(null);
    setSortDate({ value: "desc", label: "Plus récent" });
    setCurrentPage(1);
    handlePeriodChange("year");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [sortDate, category]);
  const { selectedPeriod, handlePeriodChange, periods } = usePostsByPeriod();
  const [search, setSearch] = useState<string>("");
  const dateRange = getDateRangeForStrictPeriod(selectedPeriod);
  const { data, isLoading } = useGetAllPostWithTransformationResponseQuery({
    per_page: 12,
    page: currentPage,
    orderby: "date",
    order: sortDate?.value,
    categories: 33,
    after: dateRange.after,
    before: dateRange.before,
    search: searchTerm || undefined,
    _embed: true,
  });

  const { data: posts, isLoading: loading } = useGetOneRecentPostQuery({
    per_page: 1,
    orderby: "date",
    order: "desc",
    categories: 33,
    _embed: true,
  });
  // console.log(posts);
  const isLoadingState = isLoading
    ? Array.from({ length: 12 }).map((_, i) => (
        <BlogCardSkeleton key={`skeleton-${i}`} />
      ))
    : data?.posts.map((post: WPBlogPost) => (
        <BlogCard key={post.id} article={post} />
      ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section Enrichi */}
      <header className="relative bg-amber-50 shadow-lg border-b border-amber-200 overflow-hidden">
        {/* Background Pattern culturel */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-rose-500/5 to-violet-600/5"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23b45309' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
              <Palette className="w-4 h-4 mr-2" />
              Arts & Culture
            </div>

            <h1 className="text-xl font-serif font-bold text-amber-900 mb-4 leading-tight">
              <span className="bg-gradient-to-r from-amber-600 to-rose-700 bg-clip-text text-transparent">
                L'Actualité
              </span>
              <br />
              <span className="text-amber-900">Culturelle & Artistique</span>
            </h1>

            <p className="text-md text-amber-800/90 max-w-4xl mx-auto leading-relaxed mb-8 font-serif">
              Découvrez les expositions, critiques littéraires, spectacles
              vivants et tendances artistiques. Plongez dans l'univers de la
              création contemporaine et du patrimoine culturel.
            </p>
          </div>

          {/* Élément décoratif culturel */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <div className="w-2 h-2 rounded-full bg-rose-400"></div>
            <div className="w-2 h-2 rounded-full bg-violet-400"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar avec informations */}
          <div className="xl:order-2 xl:col-span-1 space-y-6">
            {/* Filtres avancés */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-36">
              <div className="flex items-center mb-6">
                <Filter className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Filtres</h3>
              </div>
              <div className="space-y-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Rechercher des articles..."
                    value={searchTerm}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-10 py-2.5 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trier par
                  </label>
                  <Select
                    options={sortOptions}
                    isLoading={categoriesLoading}
                    placeholder="Choisir un tri"
                    value={sortDate}
                    onChange={(val) => setSortDate(val)}
                    isClearable
                    className="text-sm"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "12px",
                        borderColor: "#e5e7eb",
                        "&:hover": { borderColor: "#6366f1" },
                      }),
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Période
                  </label>
                  <div className="space-y-2">
                    {periods.map((period) => (
                      <label key={period.value} className="flex items-center">
                        <input
                          type="radio"
                          name="period"
                          value={period.value}
                          checked={selectedPeriod === period.value}
                          onChange={(e) => handlePeriodChange(e.target.value)}
                          className="text-indigo-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {period.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="xl:order-1 xl:col-span-3">
            {/* Compteur de résultats enrichi */}
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                {isLoading ? (
                  <StatCardSkeleton />
                ) : (
                  <StatCard
                    count={data?.total as number}
                    singular={"article culturel"}
                    plural={"articles culturels"}
                  />
                )}
              </div>
            </div>

            {loading ? (
              <FeaturedPostSkeleton />
            ) : (
              <FeaturedPost category="Culture" data={posts} />
            )}

            {/* Grille d'articles */}
            {isLoading || (data?.total && data.total > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {isLoadingState}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="text-8xl mb-6">📰</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Aucun article trouvé
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                  Aucun article ne correspond à vos critères de recherche
                  actuels.
                </p>
                <Button
                  onClick={handleClearFilters}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg rounded-xl text-lg px-8 py-3"
                >
                  Renitialiser le filtre
                </Button>
              </div>
            )}

            {/* Pagination */}
            {data?.totalPages && data.totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  totalPages={data.totalPages}
                  currentPage={currentPage}
                  onPageChange={goToPage}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

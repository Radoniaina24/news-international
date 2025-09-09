"use client";
import Select from "react-select";
import { useState, useEffect, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

import { useCategoriesOptions } from "@/hooks/useCategories";
import { useGetAllPostWithTransformationResponseQuery } from "@/redux/api/postApi";
import BlogCardSkeleton from "@/components/Blog/BlogCardSkeleton";
import { WPBlogPost } from "@/types/Blog";
import BlogCard from "@/components/Blog/BlogCard";
import Pagination from "@/components/Pagination";

import { Search, X, Filter, Grid, List, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface valueSelectInput {
  label: string;
  value: string | number;
}

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technologie: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      Design: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      Business: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      Marketing: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
      Sécurité: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
    };
    return (
      colors[category] ||
      "bg-gradient-to-r from-slate-500 to-slate-600 text-white"
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

  const { data, isLoading } = useGetAllPostWithTransformationResponseQuery({
    per_page: 12,
    page: currentPage,
    orderby: "date",
    order: sortDate?.value,
    categories: category?.value,
    _embed: true,
    search: searchTerm || undefined,
  });

  const isLoadingState = isLoading
    ? Array.from({ length: 12 }).map((_, i) => (
        <BlogCardSkeleton key={`skeleton-${i}`} />
      ))
    : data?.posts.map((post: WPBlogPost) => (
        <BlogCard key={post.id} article={post} />
      ));

  // Réinitialiser la pagination quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, sortDate]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategories(null);
    setSortDate({ value: "desc", label: "Plus récent" });
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm || category || (sortDate && sortDate.value !== "desc");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header professionnel avec design moderne */}
      <header className="bg-white border-b border-gray-200 sticky -top-0   sm:-top-10 md:-top-14 z-40">
        <div className="max-w-7xl mx-auto">
          {/* Section titre */}
          <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full"></div>
                <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                  Blog & Actualités
                </h1>
              </div>
              <p className=" text-md text-gray-600 leading-relaxed max-w-2xl">
                Découvrez nos conseils exclusifs et analyses d&apos;experts pour
                booster votre business et rester en tête de votre secteur.
              </p>
            </div>
          </div>

          {/* Barre de recherche et filtres compacts */}
          <div className="px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Barre de recherche */}
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

              {/* Boutons filtres et vue */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  variant={isFilterOpen ? "default" : "outline"}
                  size="sm"
                  className="lg:hidden whitespace-nowrap"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                  {hasActiveFilters && (
                    <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </Button>

                {/* Sélecteurs de vue pour desktop */}
                <div className="hidden sm:flex border border-gray-300 rounded-lg p-1 bg-gray-50">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded ${
                      viewMode === "grid"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    } transition-all`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded ${
                      viewMode === "list"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    } transition-all`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar des filtres - Version desktop */}
          <aside className={`hidden lg:block w-72 shrink-0`}>
            <div className="sticky top-60 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-sm"
                  >
                    Réinitialiser
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Filtre par catégorie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Catégories
                  </label>
                  <Select
                    options={options}
                    isLoading={categoriesLoading}
                    placeholder="Toutes les catégories"
                    value={category}
                    onChange={(val) => setCategories(val)}
                    isClearable
                    className="text-sm"
                    classNamePrefix="select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderRadius: "0.5rem",
                        padding: "0.125rem",
                        borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                        boxShadow: state.isFocused
                          ? "0 0 0 1px #3b82f6"
                          : "none",
                        "&:hover": {
                          borderColor: "#3b82f6",
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? "#3b82f6"
                          : state.isFocused
                          ? "#eff6ff"
                          : "white",
                        color: state.isSelected ? "white" : "#374151",
                      }),
                    }}
                  />
                </div>

                {/* Filtre par date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Trier par date
                  </label>
                  <Select
                    options={sortOptions}
                    placeholder="Date"
                    value={sortDate}
                    onChange={(val) => setSortDate(val)}
                    className="text-sm"
                    classNamePrefix="select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderRadius: "0.5rem",
                        padding: "0.125rem",
                        borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                        boxShadow: state.isFocused
                          ? "0 0 0 1px #3b82f6"
                          : "none",
                        "&:hover": {
                          borderColor: "#3b82f6",
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? "#3b82f6"
                          : state.isFocused
                          ? "#eff6ff"
                          : "white",
                        color: state.isSelected ? "white" : "#374151",
                      }),
                    }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Panneau de filtres mobile */}
          {isFilterOpen && (
            <div className="lg:hidden mb-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégories
                  </label>
                  <Select
                    options={options}
                    isLoading={categoriesLoading}
                    placeholder="Toutes les catégories"
                    value={category}
                    onChange={(val) => setCategories(val)}
                    isClearable
                    className="text-sm"
                    classNamePrefix="select"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trier par date
                  </label>
                  <Select
                    options={sortOptions}
                    placeholder="Date"
                    value={sortDate}
                    onChange={(val) => setSortDate(val)}
                    className="text-sm"
                    classNamePrefix="select"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleClearFilters}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Réinitialiser
                  </Button>
                  <Button
                    onClick={() => setIsFilterOpen(false)}
                    size="sm"
                    className="flex-1"
                  >
                    Appliquer
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Contenu principal */}
          <div className="flex-1 min-w-0">
            {/* Barre de résultats */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="font-medium text-gray-900">
                    {data?.total || 0}
                  </span>
                  <span>
                    article{data?.total && data?.total > 1 ? "s" : ""} trouvé
                    {data?.total && data?.total > 1 ? "s" : ""}
                  </span>
                  {searchTerm && (
                    <>
                      <span>pour</span>
                      <span className="font-medium text-gray-900 px-2 py-1 bg-gray-100 rounded">
                        {searchTerm}
                      </span>
                    </>
                  )}
                </div>

                {/* Tags des filtres actifs */}
                <div className="flex flex-wrap gap-2">
                  {category && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {category.label}
                      <button
                        onClick={() => setCategories(null)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {sortDate && sortDate.value !== "desc" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      <ArrowUpDown className="w-3 h-3" />
                      {sortDate.label}
                      <button
                        onClick={() =>
                          setSortDate({ value: "desc", label: "Plus récent" })
                        }
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
              {/* Sélecteurs de vue mobile */}
              <div className="flex sm:hidden border border-gray-300 rounded-lg p-1 bg-gray-50">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500"
                  } transition-all`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500"
                  } transition-all`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grille/Liste d'articles */}
            {isLoading || (data?.total && data.total > 0) ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 mb-8"
                    : "space-y-4 mb-8"
                }
              >
                {isLoadingState}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun article trouvé
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
                  Essayez de modifier vos critères de recherche ou explorez nos
                  catégories populaires.
                </p>
                <Button
                  onClick={handleClearFilters}
                  className="bg-blue-600 hover:bg-blue-700 shadow-sm"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="mt-8">
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

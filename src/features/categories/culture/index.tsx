"use client";
import Select from "react-select";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils/classNames";
import { useCategoriesOptions } from "@/hooks/useCategories";
import { useGetAllPostWithTransformationResponseQuery } from "@/redux/api/postApi";
import BlogCardSkeleton from "@/components/Blog/BlogCardSkeleton";
import { WPBlogPost } from "@/types/Blog";
import BlogCard from "@/components/Blog/BlogCard";
import Pagination from "@/components/Pagination";

interface valueSelectInput {
  label: string;
  value: string | number;
}

export default function ArticlesCulture() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
      "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    );
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationButton = (page: number, label?: string) => (
    <Button
      key={page}
      variant={currentPage === page ? "default" : "outline"}
      size="sm"
      onClick={() => goToPage(page)}
      className={cn(
        "min-w-10 transition-all duration-200",
        currentPage === page &&
          "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
      )}
    >
      {label || page}
    </Button>
  );
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
  // console.log(sortDate?.value);
  const { data, isLoading } = useGetAllPostWithTransformationResponseQuery({
    per_page: 12,
    page: currentPage,
    orderby: "date",
    order: sortDate?.value,
    categories: 33,
    _embed: true,
  });

  const isLoadingState = isLoading
    ? Array.from({ length: 12 }).map((_, i) => (
        <BlogCardSkeleton key={`skeleton-${i}`} />
      ))
    : data?.posts.map((post: WPBlogPost) => (
        <BlogCard key={post.id} article={post} />
      ));

  // console.log(category?.value);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header avec design amélioré */}
      <header className="bg-white shadow-xl border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="text-center">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Arts, cinéma, musique, littérature : découvrez les tendances et
              les talents d&apos;aujourd&apos;hui
            </p>
          </div>

          {/* Barre de recherche améliorée */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative group">
              {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div> */}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contenu principal */}
          <div className="flex-1">
            {/* Filtres améliorés */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              {/* Categories */}

              {/* Sort Dropdown */}
              <div className="w-full">
                <Select
                  options={sortOptions}
                  isLoading={categoriesLoading}
                  placeholder={"Date"}
                  value={sortDate}
                  onChange={(val) => setSortDate(val)}
                  isClearable
                  className="basic-single text-sm  text-black selectJob"
                  classNamePrefix="select"
                />
              </div>
            </div>

            {/* Compteur de résultats */}
            <div className="mb-6">
              <p className="text-gray-600 font-medium">
                <span className="text-blue-600 font-bold">
                  {data?.total || 0}
                </span>{" "}
                article{data?.total && data?.total > 1 ? "s" : ""} trouvé
                {data?.total && data?.total > 1 ? "s" : ""}
                {searchTerm && (
                  <span className="ml-1">
                    pour
                    <span className="font-bold text-gray-900">
                      {searchTerm}
                    </span>
                  </span>
                )}
              </p>
            </div>

            {/* Grille d'articles améliorée */}
            {isLoading || (data?.total && data.total > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {isLoadingState}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Aucun article trouvé
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Essayez de modifier vos critères de recherche ou explorez nos
                  catégories populaires.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setCategories(null);
                    setCurrentPage(1);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {/* Pagination améliorée */}
            <Pagination
              totalPages={data?.totalPages as number}
              currentPage={currentPage}
              onPageChange={goToPage}
            />
          </div>

          {/* Sidebar avec articles recommandés */}
          {/* <div className="lg:w-80 space-y-6"> */}
          {/* Articles en vedette */}
          {/* <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Articles Premium
                </h3>
              </CardHeader>
              <CardContent className="p-0">
                {featuredArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className={cn(
                      "p-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 group",
                      index !== featuredArticles.length - 1 &&
                        "border-b border-gray-100"
                    )}
                  >
                    <div className="flex gap-3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                          {article.views && (
                            <>
                              <Eye className="h-3 w-3 ml-1" />
                              {article.views.toLocaleString()}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card> */}

          {/* Articles tendance */}
          {/* <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-red-500 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tendances
                </h3>
              </CardHeader>
              <CardContent className="p-0">
                {trendingArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className={cn(
                      "p-4 hover:bg-pink-50 cursor-pointer transition-colors duration-200 group",
                      index !== trendingArticles.length - 1 &&
                        "border-b border-gray-100"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors">
                          {article.title}
                        </h4>
                        <Badge
                          className={cn(
                            "mt-2 text-xs",
                            getCategoryColor(article.category)
                          )}
                        >
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card> */}

          {/* Articles populaires */}
          {/* <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Plus Populaires
                </h3>
              </CardHeader>
              <CardContent className="p-0">
                {popularArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className={cn(
                      "p-4 hover:bg-green-50 cursor-pointer transition-colors duration-200 group",
                      index !== popularArticles.length - 1 &&
                        "border-b border-gray-100"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{article.author}</span>
                          <span>•</span>
                          <span>{article.views?.toLocaleString()} vues</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card> */}

          {/* Call to Action */}
          {/* <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-lg font-bold mb-2">Accès Premium</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Débloquez tous nos contenus exclusifs et boostez votre
                  expertise
                </p>
                <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg">
                  Découvrir Premium
                </Button>
              </CardContent>
            </Card> */}
          {/* </div> */}
        </div>
      </main>
    </div>
  );
}

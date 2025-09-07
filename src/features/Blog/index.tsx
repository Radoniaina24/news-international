"use client";

import { useState, useMemo, SetStateAction } from "react";
import {
  Search,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  Eye,
  Star,
  ArrowRight,
  Bookmark,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/classNames";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  views?: number;
  featured?: boolean;
  trending?: boolean;
}
const categories = [
  "Tous",
  "Technologie",
  "Design",
  "Business",
  "Marketing",
  "Sécurité",
];
const mockArticles: Article[] = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  const category = categories[(i % (categories.length - 1)) + 1]; // évite "Tous"
  const authors = [
    "Marie Dubois",
    "Pierre Martin",
    "Sophie Laurent",
    "Thomas Bernard",
    "Julie Moreau",
    "Alexandre Petit",
    "Camille Rousseau",
    "Nicolas Garnier",
    "Émilie Durand",
    "Raphaël Vincent",
  ];
  const author = authors[i % authors.length];

  return {
    id,
    title: `Article ${id} sur ${category}`,
    excerpt: `Résumé de l'article ${id} concernant ${category}.`,
    category,
    date: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String(
      (i % 28) + 1
    ).padStart(2, "0")}`,
    author,
    readTime: `${(i % 12) + 3} min`,
    image: `https://picsum.photos/seed/${id}/500/300`,
    views: Math.floor(Math.random() * 5000) + 500,
    featured: i % 10 === 0, // tous les 10 articles sont "featured"
    trending: i % 15 === 0, // tous les 15 articles sont "trending"
  };
});

const sortOptions = [
  { label: "Plus récent", value: "date-desc" },
  { label: "Plus ancien", value: "date-asc" },
  { label: "Plus populaire", value: "views-desc" },
];

const ITEMS_PER_PAGE = 6;

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedArticles = useMemo(() => {
    const filtered = mockArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tous" || article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Trier les articles
    filtered.sort((a, b) => {
      if (sortBy === "date-desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "views-desc") {
        return (b.views || 0) - (a.views || 0);
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const totalPages = Math.ceil(
    filteredAndSortedArticles.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredAndSortedArticles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Articles pour la sidebar
  const featuredArticles = mockArticles
    .filter((article) => article.featured)
    .slice(0, 4);
  const trendingArticles = mockArticles
    .filter((article) => article.trending)
    .slice(0, 3);
  const popularArticles = [...mockArticles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header avec design amélioré */}
      <header className="bg-white shadow-xl border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Ressources Premium
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos contenus exclusifs et insights d&apos;experts pour
              propulser votre business vers le succès
            </p>
          </div>

          {/* Barre de recherche améliorée */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
              {/* <Input
                type="text"
                placeholder="Rechercher des articles premium..."
                value={searchTerm}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setSearchTerm(e.target.value)
                }
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-2xl shadow-lg transition-all duration-200"
              /> */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
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
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    className={cn(
                      "cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md",
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-gray-300 hover:border-blue-300"
                    )}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 min-w-48 border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Calendar className="h-4 w-4" />
                    {
                      sortOptions.find((option) => option.value === sortBy)
                        ?.label
                    }
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 border-2 shadow-xl"
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={cn(
                        "cursor-pointer transition-colors",
                        sortBy === option.value &&
                          "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-medium"
                      )}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Compteur de résultats */}
            <div className="mb-6">
              <p className="text-gray-600 font-medium">
                <span className="text-blue-600 font-bold">
                  {filteredAndSortedArticles.length}
                </span>{" "}
                article{filteredAndSortedArticles.length > 1 ? "s" : ""} premium
                trouvé{filteredAndSortedArticles.length > 1 ? "s" : ""}
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
            {paginatedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {paginatedArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden rounded-2xl relative"
                  >
                    {/* Badges de statut */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      {article.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                          <Star className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      {article.trending && (
                        <Badge className="bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Tendance
                        </Badge>
                      )}
                    </div>

                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          className={cn(
                            "shadow-md",
                            getCategoryColor(article.category)
                          )}
                        >
                          {article.category}
                        </Badge>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </div>
                          {article.views && (
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {article.views.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-tight">
                        {article.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {article.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {article.author}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(article.date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-blue-50"
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-blue-50"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                    setSelectedCategory("Tous");
                    setCurrentPage(1);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {/* Pagination améliorée */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 bg-white p-6 rounded-2xl shadow-lg">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="gap-1 border-2 hover:border-blue-300 hover:bg-blue-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>

                <div className="flex gap-1">
                  {currentPage > 3 && (
                    <>
                      {renderPaginationButton(1)}
                      {currentPage > 4 && (
                        <span className="px-2 py-1 text-gray-400">...</span>
                      )}
                    </>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => Math.abs(page - currentPage) <= 1)
                    .map((page) => renderPaginationButton(page))}

                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && (
                        <span className="px-2 py-1 text-gray-400">...</span>
                      )}
                      {renderPaginationButton(totalPages)}
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    goToPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="gap-1 border-2 hover:border-blue-300 hover:bg-blue-50"
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar avec articles recommandés */}
          <div className="lg:w-80 space-y-6">
            {/* Articles en vedette */}
            <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
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
            </Card>

            {/* Articles tendance */}
            <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
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
            </Card>

            {/* Articles populaires */}
            <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
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
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl border-0 rounded-2xl overflow-hidden">
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
            </Card>
          </div>
        </div>
      </main>

      {/* Footer amélioré */}
      <footer className="bg-white border-t mt-20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              Excellence & Innovation
            </div>
            <p className="text-gray-600 font-medium">
              &copy; 2024 Centre de Ressources Premium. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Votre partenaire de confiance pour l&apos;excellence digitale
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

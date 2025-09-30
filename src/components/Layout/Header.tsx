"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { categories } from "../../data/categories";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Effet de scroll pour le header sticky
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Vérifier si un lien est actif
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Gérer la recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Bar - Informations additionnelles */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-gray-300">
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          scrolled
            ? "shadow-lg border-b border-gray-200 bg-white/95 backdrop-blur-sm"
            : "shadow-sm border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Logo et Navigation Principale */}
          <div className="flex items-center justify-between py-4">
            {/* Logo et Menu Mobile */}
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              <Link href="/" className="flex items-center">
                <Image
                  src="https://res.cloudinary.com/dbpoyo4gw/image/upload/v1758020979/logo_m4cvpv.png"
                  alt="Logo du site"
                  width={120}
                  height={40}
                  className="h-10 w-auto hover:opacity-80 transition-opacity"
                  priority
                />
              </Link>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-md ${
                  isActiveLink("/")
                    ? "text-red-600 bg-red-50"
                    : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                }`}
              >
                Accueil
                {isActiveLink("/") && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-red-600 rounded-full"></span>
                )}
              </Link>

              {categories.slice(0, 3).map((category) => {
                const categoryPath = `/category/${category.slug}`;
                const isActive = isActiveLink(categoryPath);

                return (
                  <Link
                    key={category.id}
                    href={categoryPath}
                    className={`relative px-4 py-2 transition-all duration-300 rounded-md ${
                      isActive
                        ? "text-red-600 bg-red-50 font-medium"
                        : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                    }`}
                  >
                    {category.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-red-600 rounded-full"></span>
                    )}
                  </Link>
                );
              })}

              {/* Dropdown pour plus de catégories */}
              <div className="relative group">
                <button className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md transition-all duration-300">
                  Plus
                  <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {categories.slice(3).map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    href="/blog"
                    className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 border-t border-gray-100 font-medium rounded-b-lg transition-colors"
                  >
                    Tous les articles
                  </Link>
                </div>
              </div>
            </nav>

            {/* Actions de droite */}
            <div className="flex items-center space-x-3">
              {/* Bouton de recherche */}
              {/* <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isSearchOpen
                    ? "bg-red-100 text-red-600"
                    : "text-gray-600 hover:text-red-600 hover:bg-gray-100"
                }`}
              >
                <Search className="w-5 h-5" />
              </button> */}

              {/* Bouton Contact */}
              <button
                onClick={() => router.push("/contact")}
                className="hidden sm:flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Barre de recherche étendue */}
          {isSearchOpen && (
            <div className="py-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
              <form
                onSubmit={handleSearch}
                className="relative max-w-2xl mx-auto"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher des articles, auteurs, sujets..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-500"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Rechercher
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
              <nav className="space-y-1">
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActiveLink("/")
                      ? "text-red-600 bg-red-50 font-medium border-l-4 border-red-600"
                      : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                  }`}
                >
                  Accueil
                </Link>

                {categories.map((category) => {
                  const categoryPath = `/category/${category.slug}`;
                  const isActive = isActiveLink(categoryPath);

                  return (
                    <Link
                      key={category.id}
                      onClick={() => setIsMenuOpen(false)}
                      href={categoryPath}
                      className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-red-600 bg-red-50 font-medium border-l-4 border-red-600"
                          : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                      }`}
                    >
                      {category.name}
                    </Link>
                  );
                })}

                <Link
                  href="/blog"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActiveLink("/blog")
                      ? "text-red-600 bg-red-50 font-medium border-l-4 border-red-600"
                      : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                  }`}
                >
                  Tous les articles
                </Link>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      router.push("/contact");
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* <SponsorBanner /> */}
    </>
  );
};

export default Header;

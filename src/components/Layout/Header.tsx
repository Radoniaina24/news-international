"use client";
import { Pacifico } from "next/font/google";
import React, { useState } from "react";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { categories } from "../../data/categories";
import SponsorBanner from "./SponsorBanner";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const pathname = usePathname();

  // Fonction pour vérifier si un lien est actif
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100 dark:border-gray-800">
            <div className="hidden md:flex items-center space-x-4 text-gray-600 dark:text-gray-400">
              <p className="text- text-slate-500 font-medium">
                {currentTime
                  .toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                  .replace(/\b\p{L}/gu, (char) => char.toUpperCase())}{" "}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors">
                S&apos;abonner
              </button>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden text-gray-600 dark:text-gray-400"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <Image
                src={
                  "https://res.cloudinary.com/dnfdr35vf/image/upload/v1757224070/log_einw4d.png"
                }
                alt="logo"
                width={100}
                height={100}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className={`relative font-medium transition-colors duration-300 pb-1 ${
                  isActiveLink("/")
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400"
                }`}
              >
                Accueil
                {isActiveLink("/") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 rounded-full"></span>
                )}
              </Link>
              {categories.slice(0, 5).map((category) => {
                const categoryPath = `/category/${category.slug}`;
                const isActive = isActiveLink(categoryPath);

                return (
                  <Link
                    key={category.id}
                    href={categoryPath}
                    className={`relative transition-colors duration-300 pb-1 ${
                      isActive
                        ? "text-red-600 dark:text-red-400 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                    }`}
                  >
                    {category.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher des articles, auteurs, sujets..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <nav className="space-y-2">
                <Link
                  href="/"
                  className={`block py-2 transition-colors duration-300 ${
                    isActiveLink("/")
                      ? "text-red-600 dark:text-red-400 font-medium border-l-4 border-red-600 dark:border-red-400 pl-3"
                      : "text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400"
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
                      href={categoryPath}
                      className={`block py-2 transition-colors duration-300 ${
                        isActive
                          ? "text-red-600 dark:text-red-400 font-medium border-l-4 border-red-600 dark:border-red-400 pl-3"
                          : "text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                      }`}
                    >
                      {category.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>
      <SponsorBanner />
    </>
  );
};

export default Header;

"use client";
/* eslint-disable */
import React from "react";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

const BlogSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header avec bouton retour */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-400 animate-pulse">
              <ArrowLeft className="w-5 h-5" />
              <span className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-pulse">
          {/* Image de couverture */}
          <div className="relative h-64 sm:h-80 lg:h-[500px] bg-gray-200 dark:bg-gray-700" />

          {/* Contenu de l'article */}
          <div className="p-8 lg:p-12">
            {/* Titre */}
            <header className="mb-8">
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-6" />

              {/* Métadonnées */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                {/* Auteur */}
                {/* <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div> */}

                {/* Statistiques */}
                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
            </header>

            {/* Contenu principal */}
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            {/* Tags */}
            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 w-20 h-6"
                    >
                      <Tag className="w-3 h-3 text-gray-400 mr-1" />
                    </span>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogSkeleton;

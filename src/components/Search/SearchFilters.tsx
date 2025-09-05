import React from 'react';
import { Search, Filter, Calendar, Globe, SortAsc } from 'lucide-react';
import { categories } from '../../data/categories';
import { SearchFilters } from '../../types';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const countries = ['International', 'France', 'USA', 'Europe', 'Asie', 'Afrique'];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6">
        <Filter className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filtres de recherche
        </h3>
      </div>

      <div className="space-y-6">
        {/* Search Query */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rechercher
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => onFiltersChange({ ...filters, query: e.target.value })}
              placeholder="Mots-clés, sujets, auteurs..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Catégorie
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value || undefined })}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Globe className="w-4 h-4 inline mr-1" />
            Pays/Région
          </label>
          <select
            value={filters.country || ''}
            onChange={(e) => onFiltersChange({ ...filters, country: e.target.value || undefined })}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Tous les pays</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Période
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={filters.dateRange?.from.toISOString().split('T')[0] || ''}
              onChange={(e) => {
                const from = new Date(e.target.value);
                onFiltersChange({
                  ...filters,
                  dateRange: {
                    from,
                    to: filters.dateRange?.to || new Date()
                  }
                });
              }}
              className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
            />
            <input
              type="date"
              value={filters.dateRange?.to.toISOString().split('T')[0] || ''}
              onChange={(e) => {
                const to = new Date(e.target.value);
                onFiltersChange({
                  ...filters,
                  dateRange: {
                    from: filters.dateRange?.from || new Date(),
                    to
                  }
                });
              }}
              className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
            />
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <SortAsc className="w-4 h-4 inline mr-1" />
            Trier par
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as 'date' | 'popularity' | 'relevance' })}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="date">Date de publication</option>
            <option value="popularity">Popularité</option>
            <option value="relevance">Pertinence</option>
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => onFiltersChange({
            query: '',
            sortBy: 'date'
          })}
          className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
};

export default SearchFiltersComponent;
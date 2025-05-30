import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  selectProductCategories,
  setSelectedCategory,
  selectSelectedCategory,
  clearFilters,
  setSortOrder,
  selectSortOrder
} from '../../features/products/productsSlice';
import { capitalizeText } from '../../utils/formatters';
import { Filter, X, ArrowUp, ArrowDown, Check, ChevronsUpDown } from 'lucide-react';

const sortOptions = [
  { value: '', label: 'Featured', icon: null },
  { value: 'asc', label: 'Price: Low to High', icon: <ArrowUp size={16} /> },
  { value: 'desc', label: 'Price: High to Low', icon: <ArrowDown size={16} /> },
];

const ProductFilters = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectProductCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  const currentSortOrder = useSelector(selectSortOrder);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category === selectedCategory ? '' : category));
  };

  const handleSortChange = (value) => {
    dispatch(setSortOrder(value === currentSortOrder ? '' : value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const selectedSortOption = sortOptions.find(opt => opt.value === currentSortOrder) || sortOptions[0];
  const hasActiveFilters = selectedCategory || currentSortOrder;

  return (
    <div className="my-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-yellow-400 text-sm font-medium rounded-md text-yellow-400 bg-transparent hover:bg-yellow-400/10 md:hidden"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex items-center justify-between w-full rounded-md border border-yellow-400 shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-yellow-400 hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400"
                id="sort-menu"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => document.getElementById('sort-options').classList.toggle('hidden')}
              >
                <div className="flex items-center">
                  <ChevronsUpDown className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>Sort: {selectedSortOption.label}</span>
                </div>
              </button>
            </div>

            <div
              id="sort-options"
              className="absolute ml-10 left-3 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-900 shadow-lg ring-1 ring-yellow-400 ring-opacity-50 focus:outline-none hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="sort-menu"
            >
              <div className="py-1" role="none">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                      currentSortOrder === option.value
                        ? 'bg-yellow-400 text-gray-900 font-medium'
                        : 'text-yellow-100 hover:bg-yellow-400/20'
                    }`}
                    onClick={() => {
                      handleSortChange(option.value);
                      document.getElementById('sort-options').classList.add('hidden');
                    }}
                  >
                    <div className="flex items-center">
                      {option.icon && <span className="mr-2">{option.icon}</span>}
                      {option.label}
                    </div>
                    {currentSortOrder === option.value && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {selectedCategory && (
            <span className="inline-flex items-center rounded-full bg-yellow-400/10 px-3 py-1 text-sm font-medium text-yellow-400 border border-yellow-400/30">
              {capitalizeText(selectedCategory)}
              <button
                type="button"
                className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-yellow-400 hover:bg-yellow-400/20"
                onClick={() => handleCategoryChange('')}
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          )}
          
          {hasActiveFilters && (
            <button
              type="button"
              className="text-sm font-medium text-yellow-400 hover:text-yellow-300"
              onClick={handleClearFilters}
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <div className={`md:hidden ${isFiltersOpen ? 'block' : 'hidden'}`}>
        <div className="py-4 border-t border-yellow-400/20">
          <h3 className="text-lg font-medium text-yellow-400 mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  selectedCategory === category
                    ? 'bg-yellow-400 text-gray-900'
                    : 'text-yellow-100 hover:bg-yellow-400/10'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {selectedCategory === category && (
                  <Check className="h-4 w-4 mr-2 text-yellow-400" />
                )}
                <span className={selectedCategory === category ? 'ml-6' : 'ml-6'}>
                  {capitalizeText(category)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-yellow-400 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    selectedCategory === category
                      ? 'bg-yellow-400 text-gray-900 font-medium'
                      : 'text-yellow-100 hover:bg-yellow-400/10 hover:text-yellow-300'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {selectedCategory === category && (
                    <Check className="h-4 w-4 mr-2 text-yellow-400" />
                  )}
                  <span className={selectedCategory === category ? 'ml-2' : 'ml-6'}>
                    {capitalizeText(category)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;

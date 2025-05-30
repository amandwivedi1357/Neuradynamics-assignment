import React from 'react';
import {
  selectProductCategories,
  setSelectedCategory,
  selectSelectedCategory,
  clearFilters,
} from '../../features/products/productsSlice';
import { capitalizeText } from '../../utils/formatters';
import { useDispatch, useSelector } from 'react-redux';

const FilterOptions = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectProductCategories);
  const selectedCategory = useSelector(selectSelectedCategory);

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            id="all-categories"
            type="radio"
            name="category"
            value=""
            checked={selectedCategory === ''}
            onChange={handleCategoryChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="all-categories" className="ml-2 text-gray-700">
            All Categories
          </label>
        </div>
        
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <input
              id={`category-${category}`}
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={handleCategoryChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">
              {capitalizeText(category)}
            </label>
          </div>
        ))}
      </div>
      
      {(selectedCategory) && (
        <button
          onClick={handleClearFilters}
          className="mt-4 text-sm text-primary-600 hover:text-primary-800 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterOptions;
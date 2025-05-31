import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, X } from 'lucide-react';
import {
  fetchProducts,
  fetchCategories,
  selectFilteredProducts,
  selectProductsStatus,
  selectProductsError,
  selectSearchTerm,
  selectSelectedCategory,
} from '../features/products/productsSlice';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';

const HomePage = () => {
  const dispatch = useDispatch();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const products = useSelector(selectFilteredProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const searchTerm = useSelector(selectSearchTerm);
  const selectedCategory = useSelector(selectSelectedCategory);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const isLoading = status === 'loading';
  const errorMessage = error || null;
  
  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed left-4 rounded-md top-28 z-30 bg-black/95 backdrop-blur-sm ring ring-yellow-400 ring-opacity-20">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full py-3 px-4 flex items-center justify-center text-yellow-400 font-medium text-sm"
        >
          <Filter className="w-4 h-4 mr-2" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile Filter Panel */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/80" onClick={() => setShowMobileFilters(false)}>
              <div 
                className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-gray-900 shadow-2xl overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-yellow-400">Filters</h2>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-400 hover:text-yellow-400"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-4">
                  <ProductFilters />
                </div>
              </div>
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <ProductFilters />
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
           
            <ProductGrid 
              products={products} 
              isLoading={isLoading} 
              error={errorMessage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
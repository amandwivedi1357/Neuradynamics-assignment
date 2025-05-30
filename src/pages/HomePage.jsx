import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    <div className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters />
          </div>
          <div className="flex-1">
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